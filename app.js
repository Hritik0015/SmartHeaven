const express=require('express')
const bodyParser=require('body-parser')
const mongoose=require('mongoose')
const cors=require('cors')
const db=require('./database/db');
const register_route=require('./route/register_route');

const path=require('path');


const publicDir=path.join(__dirname,'');

var app=express();
app.use(express.static(publicDir))
app.use(cors())
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}))

app.use(register_route)

app.listen(90)