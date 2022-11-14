const express = require('express')
const authorModel = require('../models/authorModel')

const validateEmail = function(req ,res ,next) {
    let validMail = /^[A-Za-z.]{2,}@[A-Za-z]{2,}[.]{1}[A-Za-z.]{2,3}$/
    let check = validMail.test(req.body.email)
    try{
        if(!check) {
            res.status(400).send({msg : "mail id is not valid" , error})
        }
        else{
            next()
        }
    }catch(error) {
        res.status(500).send({msg : "internal server error" , error})
    }
} 

module.exports.validateEmail = validateEmail