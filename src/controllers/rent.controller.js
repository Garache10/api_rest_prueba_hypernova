const { ObjectID } = require('mongodb');
const { connect } = require('../db');
const { changeDispo, changeNoDispo } = require('../controllers/car.controller');

const getAllRents = async (req, res) => {
    const db = await connect();
    const rents = await db.collection('rents').find({}).toArray();
    console.log(rents);
    res.json(rents); 
}

const getRentById = async (req, res) => {
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
}

const insertRent = async (req, res) => {
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
}

const deleteRent = async (req, res) => {
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
}

const updateRent = async (req, res) => {
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
}

const getRentsByUser = async (req, res) => {
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
}

const completeRent = async (req, res) => {
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
            message: `rent ${id} is completed`
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'rent not updated'
        });
    }
}

module.exports = {
    getAllRents,
    getRentById,
    getRentsByUser,
    insertRent,
    deleteRent,
    updateRent,
    completeRent
}