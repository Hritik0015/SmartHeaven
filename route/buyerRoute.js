const express = require('express'); 
const router = express.Router();
const Buyer= require('../models/buyerModel');
const {check, validationResult} = require('express-validator');
const bcryptjs  = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.post('/insert', [

    check('firstName', "please enter name").not().isEmpty(),
    check('lastName', "please enter name").not().isEmpty(),
    
],

function(req,res)
{
    
    const errors = validationResult(req);
    if(errors.isEmpty()){


    const fName = req.body.firstName;
    const lName= req.body.lastName;
    const contact= req.body.contact;
    const email = req.body.email;
    const gender= req.body.gender;
    const username = req.body.username;
    const password = req.body.password

    bcryptjs.hash(password, 10, function(err,hash)

    {
        const me= new Buyer({firstName: fName, lastName:lName, contact:contact, email:email, gender:gender,username:username,password:hash }); 
        me.save()
        .then(function(result){
            res.status(201).json({message : "Registered"})
        })
        .catch(function(err)
        {
            res.status(500).json({message: err})
        })

    })

}

else
{
    res.status(400).json(errors.array())
}
 
})


//login system

router.get('/buyer/login', function(req,res)
{

    const username = req.body.username;
    const password = req.body.password;

    //now we need to know if user exists
        Buyer.findOne({username:username})
        .then(function(buyerData)
        {
            if(buyerData===null){
                //if username doesnt exist
                return res.status(403).json({message : "invalid usernmae or password"});   
            }

            //username is correct
            bcryptjs.compare(password, buyerData.password,function(err, result)
            {
                if(result===false){
                    return res.status(403).json({message: "invalid username or password"})
                }
     
                const token = jwt.sign({buyerId:buyerData._id},'secretkey');
                res.status(200).json({
                    message: "Authentication success",
                    token : token
                })

            })

        })
        .catch()

})


router.get('/show', function(req,res)
{
    Buyer.find().then(function(data){

        res.send(data)
    })
})

module.exports= router;