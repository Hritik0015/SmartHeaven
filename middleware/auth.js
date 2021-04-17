const jwt = require('jsonwebtoken');
const User = require('../models/register_model');
 
module.exports.verifuser = function(req,res,next){
    try{
        const token = req.headers.authorization.split(" ")[1];
        const data = jwt.verify(token, 'secretkey');
        User.findOne({_id : data.userId})
        .then(function(result){
            req.data = result;
            next();
        })
        .catch(function(e){
            res.status(401).json({message : "Auth failed!!"});
        })

    }
    catch(er){
        res.status(401).json({error : er})
    }
   
 
}
//guard 2-it will check if admin or not
module.exports.verifyadmin=function(req,res,next){
    if(!req.data){
        return res.status(401).json({message:"Unauthorized user!!"})
    }
    else if(req.data.userType!="Admin"){
        return res.status(401).json({message:"Unauthorized user!!"})
    }
    next()
}
