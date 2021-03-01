const router = require('express').Router()
const todoController = require('../controllers/todoController')

router.get('/', todoController.findAll)
router.get('/:id', todoController.findOne)
router.post('/', todoController.create)
router.put('/:id', todoController.replace)
router.patch('/:id', todoController.update)
router.delete('/:id', todoController.delete)

module.exports = router