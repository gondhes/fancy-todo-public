const router = require('express').Router()
const userController = require('../controllers/userController')

router.get('/', userController.findAll)
router.get('/:id', userController.findOne)
router.post('/', userController.create)
router.put('/:id', userController.replace)
router.patch('/:id', userController.update)
router.delete('/:id', userController.delete)

module.exports = router