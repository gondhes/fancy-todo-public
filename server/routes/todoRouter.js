const router = require('express').Router()
const todoController = require('../controllers/todoController')
const {authentication, authorization} = require('../middlewares/auth')

router.use(authentication)
router.get('/', todoController.findAll)
router.get('/:id', authorization, todoController.findOne)
router.post('/', todoController.create)
router.put('/:id', authorization, todoController.update)
router.patch('/:id', authorization, todoController.updateStatus)
router.delete('/:id', authorization, todoController.delete)

module.exports = router