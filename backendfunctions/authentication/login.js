const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

const pool = require('../../config');

const loginUser = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;
        if(!email) return res.status(409).json({
            error: `Email is required`
        });

        if(!password) return res.status(409).json({
            error: `Password is required`
        });

        const checkUser = pool.query(`SELECT * FROM users WHERE email = $1`, [email]);

        const checkUserRes = await  checkUser;

        if(checkUserRes.rows.length < 1) return res.status(409).json({
            error: `Email does not exist`
        });

        const passwordMatch = await bcrypt.compare(password, checkUserRes.rows[0].password);

        if(!passwordMatch) return res.status(409).json({
            msg: `Incorrect password`,
            success: false
        });

        const token  = jwt.sign({
            email
        }, process.env.secret_token);

        res.status(201).json({
            success: `Logged in successfully`,
            token
        });
    } catch(e) {
        res.status(400).json({
            message: `An error occurred`,
            error
        })
    }
}

module.exports = loginUser;