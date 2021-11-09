const pool = require('../../config');

const authAccount = require('../authentication/authenticateToken');

const addToCart = async (req, res) => {
    try {

        const userId = authAccount;
    
        const {
            productId
        } = req.body;

        const findUserQ = pool.query(`SELECT * FROM users WHERE email = $1`, [userId.user.email]);

        const isUser = await findUserQ;
    
        const findProduct = pool.query(`SELECT * FROM products WHERE productid = $1`, [productId]);
    
        const productExists = await findProduct;
    
        if(productExists.rows.length < 1) return res.status(400).json({
            error: `Invalid prroduct id`
        });

        console.log(isUser.rows);
    
        const addToCartQ = pool.query(`INSERT INTO carts (byuser, productid) VALUES ($1, $2)`, [isUser.rows[0].userid, productId]);

        res.status(201).json({
            success: `Added product to cart successfully`
        })
    } catch (e) {
        console.log(e);
        res.status(400).json({
            message: `An error occured`,
            e
        });
    }
}

module.exports = addToCart;