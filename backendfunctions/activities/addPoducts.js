const pool = require('../../config');

const addProducts = async (req, res) => {
    try {
        
        let {
            productName,
            productCost,
            productImage,
            productDescription
        } = req.body;

        if(!productName) return res.status(409).json({
            error: `Product name is required`
        });

        if(!productCost) return res.status(409).json({
            error: `Product cost is required`
        });

        if(!productImage) return res.status(409).json({
            error: `Product image is required`
        });

        if(!productDescription) productDescription = null;

        const addToDatabase = pool.query(`INSERT INTO products (productname, productcost, productdescription, productimage) VALUES ($1, $2, $3, $4)`, [
            productName, productCost, productDescription, productImage
        ]);

        const isAddedProduct = await addToDatabase;
        res.status(201).json({
            message: `Product added successfully`,
        });

    } catch(e) {
        console.log(e)
        res.status(400).json({
            message: `An error occured`,
            e
        });
    }
}

module.exports = addProducts;