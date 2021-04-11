const express = require('express');
const car_router = express.Router();
const {
    getAllCars,
    getCarById,
    getCarsAvailables,
    insertCar,
    deleteCar,
    updateCar
} = require('../controllers/car.controller');

//Routes to cars
car_router.get('/list', getAllCars);
car_router.get('/one/:id', getCarById);
car_router.post('/', insertCar);
car_router.delete('/one/:id', deleteCar);
car_router.put('/one/:id', updateCar);

//Endpoint to get list of available cars
car_router.get('/available', getCarsAvailables);

module.exports = {
    car_router
}