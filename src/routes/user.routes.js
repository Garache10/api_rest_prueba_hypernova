const express = require('express');
const user_router = express.Router();
const {
    getAllUsers,
    getUserById,
    insertUser,
    deleteUser,
    updateUser
} = require('../controllers/user.controller');

//Routes to users
user_router.get('/', getAllUsers);
user_router.get('/:id', getUserById);
user_router.post('/', insertUser);
user_router.delete('/:id', deleteUser);
user_router.put('/:id', updateUser);

module.exports = {
    user_router
}