const express = require('express'); 
const router = express.Router();
const Buyer= require('../models/buyerModel');
const {check, validationResult} = require('express-validator');
const bcryptjs  = require('bcryptjs');


router.post('/insert', [

    check('firstName', "please enter name").not().isEmpty(),
    check('lastName', "please enter name").not().isEmpty(),
    check('email', "please enter name").not().isEmail(),
],

function(req,res)
{
    
    const errors = validationResult(req);
    if(errors.isEmpty()){


    const fName = req.body.fName;
    const lName= req.body.lName;
    const contact= req.body.contact;
    const email = req.body.email;
    const gender= req.body.gender;
    const username = req.body.username;
    const password = req.body.password;

    bcryptjs.hash(password, 10, function(err,hash)

    {
        const me= new Buyer({firstName: fName, lastName:lName, contact:contact, email:email, gender:gender,username:username,password:password }); 
        me.save();

    })

}

else
{
    res.send(errors.array())
}
 
})


router.get('/show', function(req,res)
{
    Buyer.find().then(function(data){

        res.send(data)
    })
})

module.exports= router;