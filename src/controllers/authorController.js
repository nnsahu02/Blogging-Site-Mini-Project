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
catch(error) {
    res.status(500).send({msg : "internal server error" , error})
}
}

module.exports.createAuthor = createAuthor