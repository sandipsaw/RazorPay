const express = require('express');
const {createOrder, verifyPayment} = require('../controller/payment.controller')

const router = express.Router();

router.post('/create-order',createOrder)
router.post('/verify',verifyPayment)

module.exports = router