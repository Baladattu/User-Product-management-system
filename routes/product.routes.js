const express = require('express');
const { getProduct, createProduct } = require('../controllers/product.controller');

const productRouter = express.Router();

productRouter.get('/', getProduct);
productRouter.post('/add', createProduct);

module.exports = productRouter;