const router = require('express').Router()
const todo = require('./todoRouter')

router.use('/todos', todo)

module.exports = router