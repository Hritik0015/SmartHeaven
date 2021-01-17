const { strict } = require('assert');
const mongoose = require('mongoose');

const Buyer = mongoose.model('Buyer',{


    firstName : {
        type: String
    },

    lastName : {
        type: String
    },

    contact : {
        type: String
    },

    email : {
        type: String
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

