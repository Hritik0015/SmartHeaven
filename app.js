const express=require('express')
const bodyParser=require('body-parser')
const mongoose=require('mongoose')
const cors=require('cors')
const db=require('./database/db');
const register_route=require('./route/register_route');
const product_route=require('./route/product_route')
const contact_route=require('./route/contact_route')
const blog_route = require('./route/blog_route')
const path=require('path');


const publicDir=path.join(__dirname,'');

var app=express();
app.use(express.static(publicDir))
app.use(cors())
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}))

app.use(register_route)
app.use(product_route)
app.use(contact_route)
app.use(blog_route)
app.listen(90)