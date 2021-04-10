const express = require('express');
const router = express.Router();
const { ObjectID } = require('mongodb');
const { connect } = require('../db');

//Routes to users
router.get('/', async (req, res) => {
    const db = await connect();
    const users = await db.collection('users').find({}).toArray();
    console.log(users);
    res.json(users); 
});

router.get('/:id', async (req, res) => {
    const id = req.params.id
    const db = await connect();
    const user = await db.collection('users').findOne({
        _id: ObjectID(id)
    });
    res.json(user);
});

router.post('/', async (req, res) => {
    const db = await connect();
    const user = {
        nombre: req.body.nombre,
        apellido: req.body.apellido
    };
    const result = await db.collection('users').insertOne(user);
    res.json(result.ops[0]);
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const db = await connect();
    await db.collection('users').deleteOne({
        _id: ObjectID(id)
    });
    res.json({
        message: `user ${id} has deleted`
    });
});

router.put('/:id', async (req, res) => {
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
});

module.exports = {
    router
}