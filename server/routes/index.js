const router = require('express').Router()
const todo = require('./todoRouter')
const userController = require('../controllers/userController')

router.use('/todos', todo)

router.post('/register', userController.register)
router.post('/login', userController.login)

module.exports = router