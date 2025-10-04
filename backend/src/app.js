const express = require('express')
const productRoute = require('../src/routes/product.route')
const PaymentRoute = require('../src/routes/payment.routes')
const cors = require('cors')


const app = express();

app.use(cors({
    origin: "http://localhost:5173", // yaha * mat do, exact origin do
    credentials: true // cookies / tokens allow karne ke liye
}))
app.use(express.json());

app.use('/api/product',productRoute)
app.use('/api/payment',PaymentRoute)

module.exports = app;