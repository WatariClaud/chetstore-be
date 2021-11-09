const pool = require('../../config');

const authAccount = require('../authentication/authenticateToken');

const viewProducts = async (req, res) => {
    try {

        const viewFromDatabase = pool.query(`SELECT * FROM products ORDER BY productid DESC`);

        const areProducts = await viewFromDatabase;

        if(areProducts.rows.length < 1) return res.status(404).json({
            error: `No products found`
        })
        
        res.status(201).json({
            message: `Products data`,
            products: areProducts.rows
        });

    } catch(e) {
        console.log(e);
        res.status(400).json({
            message: `An error occured`,
            e
        });
    }
}

module.exports = viewProducts;