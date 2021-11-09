const express = require("express");
const router = express.Router()
const mongoose = require("mongoose")
const {Product} = require("../model/product.model.js")
const {extend} = require("lodash")

router.route("/")
.get(async (req,res) => {
  const product = await Product.find({})
  res.json({product})
})
.post(async(req,res) => {
  try{
    const product = req.body
  const NewProduct = new Product(product)
  const saveProduct = await NewProduct.save()
 res.json({success:true , saveProduct: product})
 }catch(err){
   res.status(404).json({success:false,message: "Something went wrong"})
 }
})

// router.param("productId",async(req,res,next,productId) =>{
// try{ 
//   const product = await Product.findById(productId);
//   if(!product){
//     return res.status(404).json({success:false,message:"cannot find data"})
//   }
//   req.product = product;
//   next()
//   }
//   catch{
//     product.status(404).json({success:false,message:"cannot retrive data"})
//   }
// })

// router.route("/:productId")
// .get((req,res) => {
//   let { product } = req
//   product.__v = undefined
//   res.json({product})
// })
// .post(async(req,res) => {
//   const productUpdates = req.body;
//   let { product } = req
//   product = extend(product,productUpdates)
//   product = await product.save()
//   res.json({success:true,product})
// })

// .delete(async (req,res) => {
//   let {product}=req
//   await prouct.remove()
//   res.json({product})
// })


module.exports = router