const { ObjectID } = require('mongodb');
const { connect } = require('../db');

const getAllCars = async (req, res) => {
    const db = await connect();
    const cars = await db.collection('cars').find({}).toArray();
    console.log(cars);
    res.json(cars); 
}

const getCarById = async (req, res) => {
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
}

const insertCar = async (req, res) => {
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
}

const deleteCar = async (req, res) => {
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
}

const updateCar = async (req, res) => {
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
}

const getCarsAvailables = async (req, res) => {
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
}

//function to change disponibilidad to car after rent
async function changeDispo (car) {
    try {
        const id = car;
        const db = await connect();
        const car_s = {
            disponibilidad: 'No Disponible'
        }
        await db.collection('cars').updateOne({
            _id: ObjectID(id)
        }, {
            $set: car_s
        });
    } catch (error) {
        console.log(error);
    }
};

//function to change disponibilidad to car when rent is finished
async function changeNoDispo (id) {
    try {
        const db = await connect();
        const car_s = {
            disponibilidad: 'Disponible'
        }
        await db.collection('cars').updateOne({
            _id: ObjectID(id)
        }, {
            $set: car_s
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getAllCars,
    getCarById,
    getCarsAvailables,
    insertCar,
    deleteCar,
    updateCar,
    changeDispo,
    changeNoDispo
}