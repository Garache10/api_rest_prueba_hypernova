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

// http://localhost:4095/cars/list/
car_router.get('/list', getAllCars);

// http://localhost:4095/cars/one/:id
car_router.get('/one/:id', getCarById);

// http://localhost:4095/cars/
car_router.post('/', insertCar);

// http://localhost:4095/cars/one/:id
car_router.delete('/one/:id', deleteCar);

// http://localhost:4095/cars/one/:id
car_router.put('/one/:id', updateCar);

/*Endpoint para mostrar los carros que están disponibles únicamente
http://localhost:4095/cars/available/    */
car_router.get('/available', getCarsAvailables);

module.exports = {
    car_router
}