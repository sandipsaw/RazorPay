const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    image:String,
    tittle:String,
    discription:String,
    price:{
        amount:{
            type:Number,
            min:0
        },
        currency:{
            type:String,
            default:'INR',
            enum:['INR','USD']
        }
    }
})
const productModel = mongoose.model("product",productSchema);

module.exports = productModel