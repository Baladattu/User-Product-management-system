const Product = require('../models/product.model');


const getProduct = async (req, res) => {
    try {
        await Product.find({}, (err, products) => {
            if (err) {
                res.status(500).json({ message: 'Error Fetching Products' });
                console.error(err);
                return;
            }
            res.json(products);
        });
    }catch(err){
        res.status(500).json({message:'Error Fetching Products'});
        console.error(err);
    }
}

module.exports = { getProduct };
