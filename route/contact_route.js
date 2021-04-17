const express=require('express')
const router=express.Router();

const contact=require('../models/contactModel')
const {check,validationResult}=require('express-validator')
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')
const auth=require('../middleware/auth');

router.post('/insert/message',function(req,res){

    
    const name=req.body.name;
    const email=req.body.email;
    const phone=req.body.phone;
    const message =req.body.message
    

        const me=new contact({name:name, email:email,phone:phone,message:message})
        me.save().then(function(result){

                res.status(201).json({message:"Message has been sent to admin"})
            })
                .catch(function(err){res.status(500).json({message:err,status:false})})
            });
        
        

router.get('/show/message',function(req,res){
    contact.find().then(function(data){
        // console.log(data);
        res.send(data);
    })
})




//read
router.get('/message/all',function(req,res){
    contact.find().then(function(data){
        res.status(200).json({productData:data})
    }).catch(function(e){
        res.status(500).json({error:e})
    })
})

router.get('/message/single/:id',function(req,res){
    const id=req.params.id;
    contact.findOne({_id:id}).then(function(data){
        res.status(200).json(data)
    }).catch(function(e){
        res.status(500).json({error:e})
    })
})
module.exports= router