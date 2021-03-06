const {User, Todo} = require('../models')
const verifyToken = require('../helpers/verifyToken')

const authentication = (req, res, next) => {
    try {
        let {id, email} = verifyToken(req.headers.access_token)
        User.findOne({
            where: {id, email}
        })
        .then(user => {
            req.currentUser = {id: user.id, email: user.email}
            next()
        })
        .catch(err => {
            throw new Error()
        })
    } catch (error) {
        res.status(401).json({msg: 'Unauthorized'})
    }
}

const authorization = (req, res, next) => {
    let id = +req.params.id
    Todo.findByPk(id)
    .then(data => {
        console.log(data.userId)
        let userId = data.userId
        if(userId == req.currentUser.id) {
            next()
        } else {
            res.status(401).json({msg: 'Unauthorized'})
        }
    })
    .catch(err => {
        res.status(500).json({msg: 'Internal server error'})
    })
}

module.exports = {
    authentication,
    authorization
}