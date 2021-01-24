const { strict } = require('assert');
const mongoose = require('mongoose');

const Buyer = mongoose.model('Buyer',{


    firstName : {
        type: String,
        required: true,
        unique: true
    },

    lastName : {
        type: String,
        required: true,
        unique: true
    },

    contact : {
        type: String
    },

    email : {
        type: String,
        required: true,
        unique: true
    },

    gender : {
        type: Boolean
    }
,

    username : {
    type: String
}
,

    password : {
        type: String
    }

 
} )

module.exports = Buyer;

