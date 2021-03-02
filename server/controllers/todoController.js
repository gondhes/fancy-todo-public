const {Todo} = require('../models')

class todoController {

    static findAll(req, res) {
        Todo.findAll()
        .then(data => {
            res.status(200).json({todo: data})
        })
        .catch(err => {
            res.status(500).json({msg: 'Internal server error'})
        })
    }

    static findOne(req, res) {
        let id = +req.params.id
        Todo.findByPk(id)
        .then(data => {
            if(!data) {
                res.status(404).json({msg: 'There is nothing todo here'})
            } else {
                res.status(200).json({todo: data})
            }
        })
        .catch(err => {
            res.status(500).json({msg: 'Internal server error'})
        })
    }

    static create(req, res) {
        let todo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }

        Todo.create(todo)
        .then(data => {
            res.status(201).json({todo: data, msg: 'Todo created successfully'})
        })
        .catch(err => {
            res.status(500).json({msg: 'Internal server error'})
        })
    }

    static update(req, res) {
        let id = +req.params.id
        let todo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }

        Todo.update(todo, {where: {id: id}})
        .then(data => {
            res.status(200).json({msg: 'Todo edited successfully'})
        })
        .catch(err => {
            res.status(500).json({msg: 'Internal server error'})
        })
    }

    static updateStatus(req, res) {
        let id = +req.params.id
        let todoStatus = {
            status: req.body.status
        }

        Todo.update(todoStatus, {where: {id: id}})
        .then(data => {
            res.status(200).json({msg: 'Todo updated successfully'})
        })
        .catch(err => {
            res.status(500).json({msg: 'Internal server error'})
        })
    }

    static delete(req, res) {
        let id = +req.params.id

        Todo.destroy({where: {id: id}})
        .then(_=> {
            res.status(200).json({msg: 'Todo deleted successfully'})
        })
        .catch(err => {
            res.status(500).json({msg: 'Internal server error'})
        })
    }
}

module.exports = todoController