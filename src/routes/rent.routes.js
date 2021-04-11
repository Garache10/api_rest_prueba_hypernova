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
rent_router.get('/list', getAllRents);
rent_router.get('/one/:id', getRentById);
rent_router.post('/', insertRent);
rent_router.delete('/one/:id', deleteRent);
rent_router.put('/one/:id', updateRent);

//endpoint to select rents by user
rent_router.get('/user/:id', getRentsByUser);

//Endpoint to finish the rent
rent_router.put('/finish/:id', completeRent);

module.exports = {
    rent_router
}