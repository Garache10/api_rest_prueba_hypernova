const express = require('express');
const user_router = express.Router();
const {
    getAllUsers,
    getUserById,
    insertUser,
    deleteUser,
    updateUser,
    login
} = require('../controllers/user.controller');

//Routes to users

// http://localhost:4095/users/
user_router.get('/', getAllUsers);

// http://localhost:4095/users/:id
user_router.get('/:id', getUserById);

// http://localhost:4095/users/
user_router.post('/', insertUser);

// http://localhost:4095/users/:id
user_router.delete('/:id', deleteUser);

// http://localhost:4095/users/:id
user_router.put('/:id', updateUser);

/* Inicio de sesión y autentificación de usuario con jwt
http://localhost:4095/user/login/            */ 
user_router.post('/login', login);

module.exports = {
    user_router
}