const mongoose=require('mongoose')
const router=require('../route/contact_route')


const contact=mongoose.model('Contact',{
    name:{
        type:String,
        require:true
    },
    email:{
       require:true,
        type:String,
    },

    message:{
        type:String,
        require:true
        
    }
})

module.exports=contact;