const express = require('express')
const mongoose = require('mongoose')
const route = require('./routes/route')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))

mongoose.connect('mongodb+srv://nnsahu2022:Sahurk012@mycluster.ne522qz.mongodb.net/project1', {
    useNewUrlParser:true
})
.then(() => console.log("mongodb is connected"))
.catch(err=>console.log(err))

app.use('/' , route)

app.listen(process.env.PORT || 8000 , function() {
    console.log("express app running on port : " + process.env.PORT || 8000)
})
