const Product = require('../models/product.model');
const jwt = require('jsonwebtoken');


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

const createProduct = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        const token = req.header('Authorization').replace('Bearer ', '');
        if(!token){
            return res.status(401).json({ error: 'Please authenticate' });
        }
        if (!name || !description || !price) {
            return res.status(400).json({ error: 'Please fill all the details' });
        }
        const product = await Product.create({ name, description, price });
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}


module.exports = { getProduct, createProduct };
