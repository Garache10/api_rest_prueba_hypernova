const express = require('express');
const rent_router = express.Router();
const {
    getAllRents,
    getRentById,
    getRentsByUser,
    insertRent,
    deleteRent,
    updateRent,
    completeRent
} = require('../controllers/rent.controller');

//Routes to rents

// http://localhost:4095/rents/list
rent_router.get('/list', getAllRents);

// http://localhost:4095/rents/one/:id
rent_router.get('/one/:id', getRentById);

// http://localhost:4095/rents/
rent_router.post('/', insertRent);

// http://localhost:4095/rents/one/:id
rent_router.delete('/one/:id', deleteRent);

// http://localhost:4095/rents/one/:id
rent_router.put('/one/:id', updateRent);

/*endpoint para mostrar rentas por usuario
http://localhost:4095/rents/user/:id    */
rent_router.get('/user/:id', getRentsByUser);

/*Endpoint para completar una renta, devolución del auto y vuelve a estar disponible
http://localhost:4095/rents/finish/:id     */
rent_router.put('/finish/:id', completeRent);

module.exports = {
    rent_router
}