const express = require('express');
const car_router = express.Router();
const { ObjectID } = require('mongodb');
const { connect } = require('../db');

//Routes to cars
car_router.get('/list', async (req, res) => {
    const db = await connect();
    const cars = await db.collection('cars').find({}).toArray();
    console.log(cars);
    res.json(cars); 
});

car_router.get('/one/:id', async (req, res) => {
    try {
        const id = req.params.id
        const db = await connect();
        const car = await db.collection('cars').findOne({
            _id: ObjectID(id)
        });
        res.json(car);
    } catch (error) {
        console.log(error);
        res.status(404).json({
            message: 'car not found'
        });
    }
});

car_router.post('/', async (req, res) => {
    try {
        const db = await connect();
        const car = {
            marca: req.body.marca,
            disponibilidad: req.body.disponibilidad
        };
        const result = await db.collection('cars').insertOne(car);
        res.json(result.ops[0]);
    } catch (error) {
        console.log(error);
        res.json(500, {
            message: 'Car not created'
        });
    }
});

car_router.delete('/one/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const db = await connect();
        await db.collection('cars').deleteOne({
            _id: ObjectID(id)
        });
        res.json({
            message: `car ${id} has deleted`
        });
    } catch (error) {
        console.log(error);
        res.json(500, {
            message: 'Car not deleted'
        });
    }
});

car_router.put('/one/:id', async (req, res) => {
    try {
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
    } catch (error) {
        console.log(error);
        res.json(500, {
            message: 'Car not updated'
        });
    }
});

//Endpoint to get list of available cars
car_router.get('/available', async (req, res) => {
    try {
        const db = await connect();
        const cars = await db.collection('cars').find({disponibilidad: 'Disponible'}).toArray();
        console.log(cars);
        res.json(cars);    
    } catch (error) {
        console.log(error);
        res.json(500, {
            message: 'All cars are not available'
        });
    }
});

module.exports = {
    car_router
}
