const express=require('express')
const router=express.Router();

const blog=require('../models/blogModel')
const {check,validationResult}=require('express-validator')
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')
const auth=require('../middleware/auth');
const upload=require('../middleware/upload')


    router.post('/insert/blog',auth.verifuser,auth.verifyadmin,upload.single('photo'),function(req,res){
        if(req.file==undefined){
            return res.status(400).json({
                message:"invalid image format!!"
            })
        }
    const title=req.body.title;
    const message=req.body.message;


    const me=new blog({title:title, message:message,photo:req.file.path})
        me.save().then(function(result){

                res.status(201).json({message:"Blog has been added"})
            })
                .catch(function(err){res.status(500).json({message:err,status:false})})
            });
        
            router.get('/show/blog',function(req,res){
                blog.find().then(function(data){
                    // console.log(data);
                    res.send(data);
                })
            })
            

            router.put('/update/blog/:id',function(req,res){
                const id=req.params.id;
                const title=req.body.title;
                const message =req.body.message;
                
                
                blog.updateOne({_id:id},{title:title}).then(function(result){
                    res.status(202).json({message:"blog has been updated"})
                    
            })
            
            blog.updateOne({_id:id},{message:message}).then(function(){
                console.log("Updated")
            })
            
        
            
            .catch(function(err){res.status(500).json({message:err,status:false})})
            })



   




//read
router.get('/blog/all',function(req,res){
    blog.find().then(function(data){
        res.status(200).json({productData:data})
    }).catch(function(e){
        res.status(500).json({error:e})
    })
})


router.get('/blog/single/:id',function(req,res){
    const id=req.params.id;
    blog.findOne({_id:id}).then(function(data){
        res.status(200).json(data)
    }).catch(function(e){
        res.status(500).json({error:e})
    })
})
module.exports= router

            
            