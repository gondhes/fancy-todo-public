const {generate} = require('../helpers/verifyToken')
const {User} = require('../models')
const {comparePassword} = require('../helpers/passwordHelper')
const {OAuth2Client} = require('google-auth-library')

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
                    const access_token = generate({id: user.id, email: user.email}, process.env.SECRET_KEY)
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

    static googleLogin(req, res) {
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
        async function verify(){
            const ticket = await client.verifyIdToken({
                idToken: req.body.token,
                audience: process.env.GOOGLE_CLIENT_ID
            })
            const googleUserParams = ticket.getPayload()

            User.findOrCreate({
                where: {
                    email: googleUserParams.email
                },
                defaults: {
                    password: (new Date()).toDateString()
                }
            })
            .then(user => {
                let data = user[0];
                let payload = {id: data.id, email: data.email}
                const token = jwt.sign(payload, process.env.SECRET_KEY)
                res.status(200).json({
                    id: payload.id,
                    email: payload.email,
                    access_token: token
                })
            })
        }
        verify().catch(console.table)
    }
}



module.exports = userController