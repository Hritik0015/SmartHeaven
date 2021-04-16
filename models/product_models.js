

const mongoose=require('mongoose')
const router=require('../route/product_route')


const User=mongoose.model('product',{
    name:{
        type:String,
        require:true
    },
    price:{
       require:true,
        type:String,
    },

    qty:{
        require:true,
         type:String,
     },
 

    
    specification:{
        type:String,
        require:true
       
    },
    prdimage:{
        type:String,
        require:true
        
    }
})

module.exports=User;












