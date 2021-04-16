const express=require('express')
const router=express.Router();

const User=require('../models/register_model')
const {check,validationResult}=require('express-validator')
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')
const auth=require('../middleware/auth');

router.post('/insert',[
    check('firstname',"Enter first name").not().isEmpty(),
    check('email',"Please enter valid email").isEmail(),
    check('password',"Please enter password").not().isEmpty(),
],function(req,res){
    const errors=validationResult(req);
    
    if(errors.isEmpty()){
    const firstname=req.body.firstname;
    const age=req.body.age;
    const email=req.body.email;
    const username=req.body.username;
    const password=req.body.password;
    const lastname=req.body.lastname;
    const userType=req.body.userType;

    bcryptjs.hash(password,10,function(err,hash){
        const me=new User({firstname:firstname, age:age,lastname:lastname,username:username,email:email,password:hash,userType:userType})
        me.save().then(function(result){
            res.status(201).json({message:"Registered!!"})
        }).catch(function(err){
            res.status(500).json({message:err})
        })
    })
   
    }
    else{
        res.status(400).json(errors.array())
    }
    // const firstname=req.body.firstname;
    // const age=req.body.age;
    // const email=req.body.email;
    // const username=req.body.username;
    // const password=req.body.password;
    // const lastname=req.body.lastname;
    // const me=new User({firstname:firstname, age:age,lastname:lastname,username:username,email:email,password:password})
    // me.save()
})

//login
router.post('/user/login',function(req,res){
   const username=req.body.username
   const password=req.body.password

   //checking if user exists
   User.findOne({username:username}).then(function(userdata){
       if(userdata === null){
           //incorrect username
           return res.status(403).json({message:"Invalid login!!"});
       }
       //correct username
       bcryptjs.compare(password,userdata.password,function(err,result){
           if(result===false){
               return res.status(403).json({message:"Invalid login!!!"})
           }
           
       })
       const token=jwt.sign({userId:userdata._id},'secretkey');
       res.status(200).json({success:true,message:"Login success",message:"Authentication success",
    token:token,userType:userdata.userType, firstname:userdata.firstname})
   }
    ).catch()

})

router.get('/show',function(req,res){
    User.find().then(function(data){
        // console.log(data);
        res.send(data);
    })
})

router.put('/updateuser/:id',function(req,res){
    const id=req.params.id;
    const firstname=req.body.firstname;
    // const lastname=req.body.lastname;
    // const username=req.body.username;
    // const email=req.body.email;
    // const password=req.body.password;
    // const age=req.body.age;
    User.updateOne({_id:id},{firstname:firstname}).then(function(){
        console.log("Updated")
})
})

router.delete('/deleteuser/:id',function(req,res){
    const id=req.params.id;

    User.deleteOne({_id : id}).then(function(){
        console.log("deleted!!")
    });

})
router.get('/users/all',function(req,res){
    User.find().then(function(data){
        res.status(200).json({userData:data})
    }).catch(function(e){
        res.status(500).json({error:e})
    })
})
module.exports= router