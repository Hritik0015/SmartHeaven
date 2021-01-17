
const mongoose = require('mongoose'); // to connect with mangodb and database related task

mongoose.connect('mongodb://127.0.0.1:27017/mobileBase',
{
    useNewUrlParser : true,
    useCreateIndex : true,
    useUnifiedTopology : true

})