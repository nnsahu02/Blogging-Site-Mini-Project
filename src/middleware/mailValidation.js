const express = require('express')
const authorModel = require('../models/authorModel')

const validateEmail = function (req, res, next) {
    try {
        let validMail = /^[A-Za-z.]{2,}@[A-Za-z]{2,}[.]{1}[A-Za-z.]{2,3}$/
        let check = validMail.test(req.body.email)
        if (!check) {
            res.status(400).send({ msg: "mail id is not valid", error })
        }
        else {
            next()
        }
   } catch (err) {
        res.status(500).send({ msg: err.message })
   }
}

module.exports.validateEmail = validateEmail