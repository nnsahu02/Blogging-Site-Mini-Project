const express = require('express')
const authorModel = require('../models/authorModel')

const createAuthor = async function(req ,res) {
    const {fname , lname , title , email , password} = req.body
    try{
    if(!fname || !lname || !title || !email || !password){
        res.status(400).send({msg : "all field is required" , error})
        }
        else {
            const data = await authorModel.create({fname , lname , title , email , password})
            res.status(201).send({msg : "data created succesfully" , data})
        }
    }
catch(err) {
    res.status(500).send({msg : err.message})
}
}

module.exports.createAuthor = createAuthor