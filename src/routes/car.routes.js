const express = require('express');
const car_router = express.Router();
const { ObjectID } = require('mongodb');
const { connect } = require('../db');

//Routes to cars
car_router.get('/', async (req, res) => {
    const db = await connect();
    const cars = await db.collection('cars').find({}).toArray();
    console.log(cars);
    res.json(cars); 
});

car_router.get('/:id', async (req, res) => {
    const id = req.params.id
    const db = await connect();
    const car = await db.collection('cars').findOne({
        _id: ObjectID(id)
    });
    res.json(car);
});

car_router.post('/', async (req, res) => {
    const db = await connect();
    const car = {
        marca: req.body.marca,
        disponibilidad: req.body.disponibilidad
    };
    const result = await db.collection('cars').insertOne(car);
    res.json(result.ops[0]);
});

car_router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const db = await connect();
    await db.collection('cars').deleteOne({
        _id: ObjectID(id)
    });
    res.json({
        message: `car ${id} has deleted`
    });
});

car_router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const car = {
        marca: req.body.marca,
        disponibilidad: req.body.disponibilidad
    };
    const db = await connect();
    await db.collection('cars').updateOne({
        _id: ObjectID(id)
    }, {
        $set: car
    });
    res.json({
        message: `car ${id} has updated`
    });
});

module.exports = {
    car_router
}
