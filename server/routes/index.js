const router = require('express').Router()
const todo = require('./todoRouter')
const userController = require('../controllers/userController')
const weatherController = require('../controllers/weatherController')

router.use('/todos', todo)

router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/googleLogin', userController.googleLogin)
router.get('/weather', weatherController.getWeather)

module.exports = router