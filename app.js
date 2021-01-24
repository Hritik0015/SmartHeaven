const mongoose = require('mongoose'); // to connect with mangodb and database related task
const express = require('express'); 
const { strict } = require('assert');
const bodyParser = require('body-parser');

const db= require('./database/db');
const buyerRoute= require('./route/buyerRoute');


//json parsing data
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}))

app.use(buyerRoute);  



    app.listen(900);