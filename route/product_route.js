
const express=require('express')
const router=express.Router();

const User=require('../models/product_models')
const {check,validationResult}=require('express-validator')
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')
const auth=require('../middleware/auth');
const upload=require('../middleware/upload')

// router.post('/insert/product',auth.verifuser,upload.single('prdimage'),function(req,res){
//     if(req.file==undefined){
//         return res.status(400).json({
//             message:"invalid image format!!"
//         })
//     }
//     const name=req.body.name;
//     const price=req.body.price;
//     const qty=req.body.qty;
//     const specification=req.body.specification;
//     const prdimage=req.file.path;


//         const me=new User({name:name, price:price, qty:qty,specification:specification,prdimage:prdimage})
//         me.save().then(function(result){

//                 res.status(201).json({message:"product has been added"})
//             })
//                 .catch(function(err){res.status(500).json({message:err,status:false})})
//             });
        




router.post('/insert/product',auth.verifuser,upload.single('prdimage'),function(req,res){
    if(req.file==undefined){
        console.log("invalid")
        return res.status(400).json({
            message:"invalid image format!!",
        
            
        })
    }
    const name=req.body.name;
    const qty=req.body.qty;
    const specification=req.body.specification;
    const price=req.body.price;
    const prdimage=req.file.path;
    
    

        const me=new User({name:name, qty:qty,specification:specification,price:price,prdimage:prdimage})
        me.save().then(function(){
            res.send("product added")
            console.log("Added")
            
        })
})















        

router.get('/show/product',function(req,res){
    User.find().then(function(data){
        // console.log(data);
        res.send(data);
    })
})

router.put('/update/product/:id',function(req,res){
    const id=req.params.id;
    const name=req.body.name;
    const price =req.body.price;
    const qty= req.body.qty;
    const specification = req.body.specification;
    
    User.updateOne({_id:id},{name:name}).then(function(result){
        res.status(202).json({message:"product has been updated"})
        
})

User.updateOne({_id:id},{specification:specification}).then(function(){
    console.log("Updated")
})

User.updateOne({_id:id},{price:price}).then(function(){
    console.log("Updated")
})

User.updateOne({_id:id},{qty:qty}).then(function(){
    console.log("Updated")
})

.catch(function(err){res.status(500).json({message:err,status:false})})
})











router.delete('/delete/product/:id',function(req,res){
    const id=req.params.id;

    User.deleteOne({_id : id})
    .then(function(result){
        res.status(200).json({success:true,message:"product has been deleted"})
    })
        .catch(function(err){res.status(500).json({message:err,status:false})})
    });



//read
router.get('/product/all',function(req,res){
    User.find().then(function(data){
        res.status(200).json({data,success:true})
        console.log("showed")
    }).catch(function(e){
        res.status(500).json({error:e})
        console.log("not showed")
    })
})

router.get('/product/single/:id',function(req,res){
    const id=req.params.id;
    User.findOne({_id:id}).then(function(data){
        res.status(200).json(data)
    }).catch(function(e){
        res.status(500).json({error:e})
    })
})
module.exports= router  