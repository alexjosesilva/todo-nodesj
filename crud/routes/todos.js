// routes/todos.js
const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// Obter todos os TODOs
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Criar um novo TODO
router.post('/', async (req, res) => {
    const todo = new Todo({
        title: req.body.title,
        description: req.body.description
    });

    try {
        const newTodo = await todo.save();
        res.status(201).json(newTodo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Atualizar um TODO existente
router.put('/:id', async (req, res) => {
    try {
        await Todo.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({ message: 'Todo updated successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Excluir um TODO
router.delete('/:id', async (req, res) => {
    try {
        await Todo.findOneAndDelete(req.params.id);
        res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
