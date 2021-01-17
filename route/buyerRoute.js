const express = require('express'); 
const router = express.Router();
const Buyer= require('../models/buyerModel');


router.post('/insert', function(req,res)
{

    const fName = req.body.fName;
    const lName= req.body.lName;
    const contact= req.body.contact;
    const email = req.body.email;
    const gender= req.body.gender;
    const username = req.body.username;
    const password = req.body.password;

    const me= new Buyer({firstName: fName, lastName:lName, contact:contact, email:email, gender:gender,username:username,password:password }); 
    me.save();
})


    

router.get('/show', function(req,res)
{
    Buyer.find().then(function(data){

        res.send(data)
    })
})

module.exports= router;