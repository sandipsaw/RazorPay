const express = require('express');
const { createProduct, getProduct } = require('../controller/product.controller');

const router = express.Router();

router.post('/create-product',createProduct)
router.get('/get-product',getProduct)

module.exports = router