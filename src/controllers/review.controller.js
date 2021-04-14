const { ObjectID } = require('mongodb');
const { connect } = require('../db');

const getAllReviews = async (req, res) => {
    const db = await connect();
    const reviews = await db.collection('reviews').find({}).toArray();
    console.log(reviews);
    res.json(reviews); 
}

const getReviewById = async (req, res) => {
    const id = req.params.id
    const db = await connect();
    const review = await db.collection('reviews').findOne({
        _id: ObjectID(id)
    });
    res.json(review);
}

const insertReview = async (req, res) => {
    const db = await connect();
    const review = {
        rent: req.body.rent,
        rate: req.body.rate,
        descripcion: req.body.descripcion
    };
    const result = await db.collection('reviews').insertOne(review);
    res.json(result.ops[0]);
}

const deleteReview = async (req, res) => {
    const id = req.params.id;
    const db = await connect();
    await db.collection('reviews').deleteOne({
        _id: ObjectID(id)
    });
    res.json({
        message: `review ${id} has deleted`
    });
}

const updateReview = async (req, res) => {
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
}

const getReviewByRent = async (req, res) => {
    const id = req.params.id
    const db = await connect();
    const review = await db.collection('reviews').findOne({
        rent: id
    });
    res.json(review);
}

module.exports = {
    getAllReviews,
    getReviewById,
    insertReview,
    deleteReview,
    updateReview,
    getReviewByRent
}