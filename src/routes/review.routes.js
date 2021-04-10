const express = require('express');
const review_router = express.Router();
const { ObjectID } = require('mongodb');
const { connect } = require('../db');

//Routes to reviews
review_router.get('/', async (req, res) => {
    const db = await connect();
    const reviews = await db.collection('reviews').find({}).toArray();
    console.log(reviews);
    res.json(reviews); 
});

review_router.get('/:id', async (req, res) => {
    const id = req.params.id
    const db = await connect();
    const review = await db.collection('reviews').findOne({
        _id: ObjectID(id)
    });
    res.json(review);
});

review_router.post('/', async (req, res) => {
    const db = await connect();
    const review = {
        rent: req.body.rent,
        rate: req.body.rate,
        descripcion: req.body.descripcion
    };
    const result = await db.collection('reviews').insertOne(review);
    res.json(result.ops[0]);
});

review_router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const db = await connect();
    await db.collection('reviews').deleteOne({
        _id: ObjectID(id)
    });
    res.json({
        message: `review ${id} has deleted`
    });
});

review_router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const review = {
        rent: req.body.rent,
        rate: req.body.rate,
        descripcion: req.body.descripcion
    };
    const db = await connect();
    await db.collection('reviews').updateOne({
        _id: ObjectID(id)
    }, {
        $set: review
    });
    res.json({
        message: `review ${id} has updated`
    });
});

module.exports = {
    review_router
}