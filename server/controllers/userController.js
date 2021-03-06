const jwt = require('jsonwebtoken')
const {User} = require('../models')
const {comparePassword} = require('../helpers/passwordHelper')
const { use } = require('../routes')

class userController {

    static register(req, res) {
        let user = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }

        User.create(user)
        .then(data => {
            res.status(201).json({success: true, msg: 'User created successfully'})
        })
        .catch(err => {
            res.status(500).json({msg: 'Internal server error'})
        })
    }

    static login(req, res) {
        const email = req.body.email
        const password = req.body.password

        User.findOne({where: {email}})
        .then(user => {
            if(user) {
                const comparedPassword = comparePassword(password, user.password)

                if(comparedPassword) {
                    const access_token = jwt.sign({id: user.id, email: user.email}, process.env.SECRET_KEY)
                    res.status(200).json({access_token, id: user.id, email: user.email})
                } else {
                    throw {msg: 'Invalid email or password'}
                }
            } else {
                throw {msg: 'Invalid email or password'}
            }
        })
        .catch(err => {
            let errorMessage

            if(err.msg) {
                errorMessage = err.msg
            } else {
                errorMessage = 'Internal server error'
            }

            res.status(500).json({msg: errorMessage})
        })
    }
}

module.exports = userController