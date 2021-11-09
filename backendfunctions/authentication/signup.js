const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

const pool = require('../../config');

const signupUser = async (req, res) => {
    try {
        const {
            name, 
            email,
            password
        } = req.body;

        if(!name) return res.status(409).json({
            error: `Name is required`
        });

        if(!email) return res.status(409).json({
            error: `Email is required`
        });

        if(!password) return res.status(409).json({
            error: `Password is required`
        });

        const checkUser = pool.query(`SELECT * FROM users WHERE email = $1`, [email]);

        const checkUserRes = await  checkUser;

        if(checkUserRes.rows.length > 0) return res.status(409).json({
            error: `This email already exists`
        });

        const hashed = bcrypt.hashSync(password, 12);

        const addUser = pool.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`, [name, email, hashed]);

        const isAdded = await addUser;

        const token  = jwt.sign({
            email
        }, process.env.secret_token);

        res.status(201).json({
            success: `Added account successfully`,
            token
        });
    } catch(e) {
        res.status(400).json({
            message: `An error occurred`,
            error
        })
    }
}

module.exports = signupUser;