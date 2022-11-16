const jwt = require('jsonwebtoken')

const authenticateAuthor = async function(req ,res , next) {
    const xApiKey = req.headers['x-api-key']
    try{
        if(!xAuthToken) {
            return res.status(400).send({status : false , msg : "token is required" })
        }
        const decodeToken = jwt.verify(xApiKey , 'projectsecretcode')
        if(!decodeToken) {
            return res.status(401).send({status: false , msg : "token is not valid" })
        }
        else {
            req.token=decodeToken
            next()
        }
    }catch(error) {
        return res.status(500).send({status : false , msg : error.message})
    }
}


// authorisation
const authoriseAuhtor = async function(req ,res ,next) {
  try{
    let authorId = req.params.authorId
    let authorIdFromDT = req.token.authorId
    if(authorId != authorIdFromDT) {
        return res.status(403).send({status : false , msg : "access denied" })
    }
    next()
  }
  catch(error) {
    return res.status(500).send({status : false , msg : error.message})
  }
}

module.exports.authenticateAuthor = authenticateAuthor
module.exports.authoriseAuhtor = authoriseAuhtor