const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const { extend } = require("lodash")
const { Cart } = require("../model/cart.model.js") 


router.route("/")
.get(async (req,res) => {
  const cartProduct = await Cart.find({})
  res.json({cartProduct})
})
.post(async(req,res) => {
  try{
    const cartProduct = req.body
  const NewcartProduct = new Cart(cartProduct)
  const savecartProduct = await NewcartProduct.save()
 res.json({success:true , savecartProduct: cartProduct})
 }catch(err){
   res.status(500).json({message: "error" , error : err})
 }
})

router.param("cartProductId",async(req,res,next,cartProductId) =>{
try{ 
  const cartProduct = await Cart.findById(cartProductId);
  if(!cartProduct){
    return res.status(404).json({success:false,message:"cannot find data"})
  }
  req.cartProduct = cartProduct;
  next()
  }
  catch{
    cartProduct.status(404).json({success:false,meassage:"cannot retrive data"})
  }
})

router.route("/:cartProductId")
.get((req,res) => {
  let { cartProduct } = req
  cartProduct.__v = undefined
  res.json({ cartProduct })
})
.post(async(req,res) => {
  const cartProductUpdates = req.body;
  let { cartProduct } = req
  cartProduct = extend(cartProduct,cartProductUpdates)
  cartProduct = await cartProduct.save()
  res.json({success:true,cartProduct})
})

.delete(async (req,res) => {
  let { cartProduct }=req
  await cartProduct.remove()
  res.json({ success : true,cartProduct })
})


module.exports = router