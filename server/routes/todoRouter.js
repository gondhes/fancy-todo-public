const router = require('express').Router()
const todoController = require('../controllers/todoController')

router.get('/', todoController.findAll)
router.get('/:id', todoController.findOne)
router.post('/', todoController.create)
router.put('/:id', todoController.update)
router.patch('/:id', todoController.updateStatus)
router.delete('/:id', todoController.delete)

module.exports = router