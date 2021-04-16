const mongoose=require('mongoose')
const router=require('../route/register_route')


const User=mongoose.model('User',{
    firstname:{
        type:String,
        require:true,
    },
    lastname:{
        require:true,
        type:String
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    username:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    age:{
        type:String
    },
    userType:{
        type:String,
        enum:['Admin','Customer','Staff'],
        deafult:'Customer'
    }

})

module.exports=User;
