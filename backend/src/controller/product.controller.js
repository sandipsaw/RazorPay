const productModel = require("../model/product.model")


const createProduct = async (req, res) => {
    const { image, tittle, discription, price: { amount, currency } } = req.body
    try {
        const product = await productModel.create({
            image,tittle,discription,price: { amount, currency }
        })

        res.status(201).json({
            message: "Product Created Sucessfully",
            product
        })
    } catch (error) {
        return res.status(500).json({
            message:"something went wrong",
            error:error.message
        })
    }
}

const getProduct = async(req,res) =>{
   try{
     const product = await productModel.findOne()
    res.status(200).json({
        message:"Product Fetch successfully",
        product
    })
   }catch (error) {
        return res.status(500).json({
            message:"something went wrong",
            error:error.message
        })
    }
}
module.exports = {createProduct,getProduct}