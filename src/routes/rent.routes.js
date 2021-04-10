const express = require('express');
const rent_router = express.Router();
const { ObjectID } = require('mongodb');
const { connect } = require('../db');

//Routes to rents
rent_router.get('/', async (req, res) => {
    const db = await connect();
    const rents = await db.collection('rents').find({}).toArray();
    console.log(rents);
    res.json(rents); 
});

rent_router.get('/:id', async (req, res) => {
    const id = req.params.id
    const db = await connect();
    const rent = await db.collection('rents').findOne({
        _id: ObjectID(id)
    });
    res.json(rent);
});

rent_router.post('/', async (req, res) => {
    const db = await connect();
    const rent = {
        user: req.body.user,
        car: req.body.car,
        days: req.body.days
    };
    const result = await db.collection('rents').insertOne(rent);
    res.json(result.ops[0]);
});

rent_router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const db = await connect();
    await db.collection('rents').deleteOne({
        _id: ObjectID(id)
    });
    res.json({
        message: `rent ${id} has deleted`
    });
});

rent_router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const rent = {
        user: req.body.user,
        car: req.body.car,
        days: req.body.days
    };
    const db = await connect();
    await db.collection('rents').updateOne({
        _id: ObjectID(id)
    }, {
        $set: rent
    });
    res.json({
        message: `rent ${id} has updated`
    });
});

module.exports = {
    rent_router
}