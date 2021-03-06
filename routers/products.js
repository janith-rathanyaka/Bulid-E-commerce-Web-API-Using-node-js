const {Product} = require('../models/product');
const express = require('express');
const { Category } = require('../models/category');
const router = express.Router();


router.get(`/`,async (req,res)=>{
    const productList = await Product.find().populate('Category');

    if(!productList){
        res.status(500).json({success:false})
    }
    res.send(productList);
 

})
//populate - 
router.get(`/:id`,async (req,res)=>{
    const product = await Product.findById(req.params.id).populate('Category');

    if(!product){
        res.status(500).json({success:false})
    }
    res.send(product);
 

})

router.post(`/`, async (req,res)=>{
   
    const category =await Category.findById(req.body.category);
    if(!category) return res.status(400).send('Invalid Category')
     
   
  let product = new Product({
      name:req.body.name,
      description:req.body.description,
      richDescription:req.body.richDescription,
      image:req.body.image,
      brand:req.body.brand,
      price:req.body.price,
      category:req.body.category,
      countInStock:req.body.countInStock,
      rating:req.body.rating,
      numReviews:req.body.numReviews,
      isFeatured:req.body.isFeatured,
  })
       product = await product.save();

       if(!product)
          return res.status(500).send('THE product cannot be created')

       res.send(product);
})

router.put(`/:id`,async (req,res)=>{

    const category =await Category.findById(req.body.category);
    if(!category) return res.status(400).send('Invalid Category')
     

     const product = Product.findByIdAndUpdate(
         req.params.id,
         {
            name:req.body.name,
            description:req.body.description,
            richDescription:req.body.richDescription,
            image:req.body.image,
            brand:req.body.brand,
            price:req.body.price,
            category:req.body.category,
            countInStock:req.body.countInStock,
            rating:req.body.rating,
            numReviews:req.body.numReviews,
            isFeatured:req.body.isFeatured,
         },
         {new:true}
     )

     if(!product)
     return res.status(500).send('the product cannot be created')

     res.send(product);
})


module.exports= router;