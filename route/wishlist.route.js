const express = require("express");
const router = express.Router()
const mongoose = require("mongoose")
const { extend } = require("lodash")
const { Wishlist } = require("../model/wishlist.model.js")

router.route("/")
.get(async (req,res) => {
  const wishlistProduct = await Wishlist.find({})
  res.json({wishlistProduct})
})
.post(async(req,res) => {
  try{
    const wishlistProduct = req.body
  const NewwishlistProduct = new Wishlist(wishlistProduct)
  const savewishlistProduct = await NewwishlistProduct.save()
 res.json({success:true , savewishlistProduct: wishlistProduct})
 }catch(err){
   res.status(404).json({success:false,message: "Something went wrong"})
 }
})

router.param("wishlistProductId",async(req,res,next,wishlistProductId) =>{
try{ 
  const wishlistProduct = await Wishlist.findById(wishlistProductId);
  if(!wishlistProduct){
    return res.status(404).json({success:false,message:"cannot find data"})
  }
  req.wishlistProduct = wishlistProduct;
  next()
  }
  catch{
    wishlistProduct.status(404).json({success:false,meassage:"cannot retrive data"})
  }
})

router.route("/:wishlistProductId")
.get((req,res) => {
  let { wishlistProduct } = req
  wishlistProduct.__v = undefined
  res.json({ wishlistProduct })
})
.post(async(req,res) => {
  const wishlistProductUpdates = req.body;
  let { wishlistProduct } = req
  wishlistProduct = extend(wishlistProduct,wishlistProductUpdates)
  wishlistProduct = await wishlistProduct.save()
  res.json({success:true,wishlistProduct})
})

.delete(async (req,res) => {
  let { wishlistProduct }=req
  await wishlistProduct.remove()
  res.json({ success : true,wishlistProduct })
})


module.exports = router