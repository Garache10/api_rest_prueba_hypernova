const express = require('express');
const rent_router = express.Router();
const { changeDispo, changeNoDispo } = require('./car.routes');
const { ObjectID } = require('mongodb');
const { connect } = require('../db');

//Routes to rents
rent_router.get('/list', async (req, res) => {
    const db = await connect();
    const rents = await db.collection('rents').find({}).toArray();
    console.log(rents);
    res.json(rents); 
});

rent_router.get('/one/:id', async (req, res) => {
    try {
        const id = req.params.id
        const db = await connect();
        const rent = await db.collection('rents').findOne({
            _id: ObjectID(id)
        });
        res.json(rent);
    } catch (error) {
        console.log(error);
        res.status(404).json({
            message: 'rent not found'
        });
    }
});

rent_router.post('/', async (req, res) => {
    try {
        const db = await connect();
        const rent = {
            user: req.body.user,
            car: req.body.car,
            days: req.body.days,
            active: 'yes'
        };
        const result = await db.collection('rents').insertOne(rent);
        changeDispo(req.body.car);
        res.json(result.ops[0]);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'rent not created'
        });
    }
});

rent_router.delete('/one/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const db = await connect();
        await db.collection('rents').deleteOne({
            _id: ObjectID(id)
        });
        res.json({
            message: `rent ${id} has deleted`
        });    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'rent not deleted'
        });
    }
});

rent_router.put('/one/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const rent = {
            user: req.body.user,
            car: req.body.car,
            days: req.body.days,
            active: req.body.active
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
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'rent not updated'
        });
    }
});

//endpoint to select rents by user
rent_router.get('/user/:id', async (req, res) => {
    try {
        const id = req.params.id
        const db = await connect();
        const rents = await db.collection('rents').find({user: id}).toArray();
        console.log(rents);
        res.json(rents);
    } catch (error) {
        console.log(error);
        res.status(404).json({
            message: 'There is not rents to this user'
        });
    }
});

//Endpoint to finish the rent
rent_router.put('/finish/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const db = await connect();
        const car = await db.collection('rents').findOne({_id: ObjectID(id)});
        const rent = {
            active: 'no'
        };
        await db.collection('rents').updateOne({
            _id: ObjectID(id)
        }, {
            $set: rent
        });
        changeNoDispo(car.car);
        res.json({
            message: `rent ${id} is finished`
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'rent not updated'
        });
    }
});

module.exports = {
    rent_router
}