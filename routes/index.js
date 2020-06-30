const express = require('express');

const router = express.Router()
const Phone = require('../models/Phone')



// @route  Post   admin/phones
//@desc   Create a Product
// @access  Private



router.post('/phones' , async(req,res)=> {


try {
    const {name , price ,image , ram ,storage  , processor} = req.body

    if (!name || !price ||  !image , !ram , !storage , !processor) {
        res.status(400).send('you need Please enter all the fields')
    }
else {
    newProduct = new Phone({
  name,
  price,  
  image,
  ram,
  storage,
  processor,
    })


    const product = await newProduct.save()
   res.json(product)
}
 
    
} catch (err) {
   console.error(err.message);
  res.status(500).send('Server is out')  
}
})


// @route  Get   admin/phones
//@desc   Get all products
// @access  Public

router.get('/phones' ,async(req,res)=> {

    try {
    const product = await Phone.find()
    
    res.json(product)
    
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server is out ...')
        
    }
 
    })


// @route  get   /admin/phone/:id_phone
//@desc   Get a specific  phone
// @access  Private

router.get('/phones/:id_phone' , async(req,res) => {
try {
const phone = await Phone.findById(req.params.id_phone)


if (!phone) {
    res.status(404)
    
}

else {
    res.json(phone)
}




    
} catch (err) {
    if (err.kind === "ObjectId") {
        res.status(404).json({message : "posts is Not Found"})
    }
    console.error(err.message);
    res.status(500).send('Server is out ... ')
    
}


})



// @route  delete   /admin/phones/:id_phone
//@desc   delete a phone
// @access  Private

router.delete('/phones/:id_phone' , async(req,res)=> {
try {


    const phone = await Phone.findById(req.params.id_phone)

    phone.remove()
 res.json({message : "Phone removed"})

    
} catch (err) {
    console.log(err.message)
    res.status(500).send('Server is out')
}
})





router.put('/phones/:id_phone', async(req,res)=>{


    try {
      let modifiedProduct = req.body

let foundPhone = await Phone.findById(req.params.id_phone)


await foundPhone.updateOne(modifiedProduct)
res.json({message : "document updated"})

      







        







    } catch (err) {
        console.error(err.message);
        res.status(500).send('server is out ....')
        
    }

})




module.exports = router 