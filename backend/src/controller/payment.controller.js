const productModel = require('../model/product.model')
const Razorpay = require('razorpay');
const paymentModel = require('../model/payment.model');


const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createOrder = async (req,res) => {
    const product = await productModel.findOne()

    const option = {
        amount: product.price.amount,
        currency: product.price.currency
    }

    try {
        const order = await razorpay.orders.create(option);
        res.status(201).json(order);

        const newPayment = await paymentModel.create({
            orderId: order.id,
            price:{
                amount: order.amount,
                currency: order.currency,
            },
            status: 'pending',
        });

    } catch (error) {
        res.status(500).send('Error creating order');
    }
}

const verifyPayment = async(req,res)=>{
    const {razorpayOrderId,razorpayPaymentId,signature} =req.body;
    const secret = process.env.RAZORPAY_KEY_SECRET

  try {
    const { validatePaymentVerification } = require('../../node_modules/razorpay/dist/utils/razorpay-utils.js')

    const result = validatePaymentVerification({ "order_id": razorpayOrderId, "payment_id": razorpayPaymentId }, signature, secret);
    if (result) {
      const payment = await paymentModel.findOne({ orderId: razorpayOrderId });
      payment.paymentId = razorpayPaymentId;
      payment.signature = signature;
      payment.status = 'completed';
      await payment.save();
      res.json({ status: 'success' });
    } else {
      res.status(400).send('Invalid signature');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Error verifying payment');
  }
}
module.exports = {createOrder,verifyPayment}