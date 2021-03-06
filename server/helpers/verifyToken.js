const jwt = require('jsonwebtoken')

const verifyToken = (access_token) => {
    return jwt.verify(access_token, process.env.SECRET_KEY)
}

module.exports = verifyToken