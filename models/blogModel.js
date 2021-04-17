const mongoose=require('mongoose')
const router=require('../route/blog_route')


const blog=mongoose.model('Blog',{
    title:{
        type:String,
        require:true
    },

    message:{
        type:String,
        require:true
        
    },

    photo:{
        type:String,
        require:true
    }


})

module.exports=blog;