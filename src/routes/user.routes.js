const express = require('express');
const user_router = express.Router();
const { ObjectID } = require('mongodb');
const { connect } = require('../db');

//Routes to users
user_router.get('/', async (req, res) => {
    const db = await connect();
    const users = await db.collection('users').find({}).toArray();
    console.log(users);
    res.json(users); 
});

user_router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const db = await connect();
        const user = await db.collection('users').findOne({
            _id: ObjectID(id)
        });
        res.json(user);    
    } catch (error) {
        console.log(error);
        res.status(404).json({
            message: 'user not found'
        });
    }
});

user_router.post('/', async (req, res) => {
    try {
        const db = await connect();
        const user = {
            nombre: req.body.nombre,
            apellido: req.body.apellido
        };
        const result = await db.collection('users').insertOne(user);
        res.json(result.ops[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'user not created'
        });
    }
});

user_router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const db = await connect();
        await db.collection('users').deleteOne({
            _id: ObjectID(id)
        });
        res.json({
            message: `user ${id} has deleted`
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'user not deleted'
        });
    }
});

user_router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user = {
            nombre: req.body.nombre,
            apellido: req.body.apellido
        };
        const db = await connect();
        await db.collection('users').updateOne({
            _id: ObjectID(id)
        }, {
            $set: user
        });
        res.json({
            message: `user ${id} has updated`
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'user not updated'
        });
    }
});

module.exports = {
    user_router
}