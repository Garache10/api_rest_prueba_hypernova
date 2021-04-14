const { ObjectID } = require('mongodb');
const { connect } = require('../db');
const jwt = require('jsonwebtoken');

const getAllUsers = async (req, res) => {
    const db = await connect();
    const users = await db.collection('users').find({}).toArray();
    console.log(users);
    res.json(users); 
}

const getUserById = async (req, res) => {
    try {
        const id = req.params.id
        const db = await connect();
        const user = await db.collection('users').findOne({
            _id: ObjectID(id)
        });
        res.json(user);    
    } catch (error) {
        console.log(error);
        res.status(404).json({
            message: 'user not found'
        });
    }
}

const insertUser = async (req, res) => {
    try {
        const db = await connect();
        const user = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            usuario: req.body.usuario,
            contrasena: req.body.contrasena
        };
        const result = await db.collection('users').insertOne(user);
        res.json(result.ops[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'user not created'
        });
    }
}

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const db = await connect();
        await db.collection('users').deleteOne({
            _id: ObjectID(id)
        });
        res.json({
            message: `user ${id} has deleted`
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'user not deleted'
        });
    }
}

const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            usuario: req.body.usuario,
            contrasena: req.body.contrasena
        };
        const db = await connect();
        await db.collection('users').updateOne({
            _id: ObjectID(id)
        }, {
            $set: user
        });
        res.json({
            message: `user ${id} has updated`
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'user not updated'
        });
    }
}

const login = async (req, res) => {
    try {
        const db = await connect();
        const us = req.body.usuario;
        const cn = req.body.contrasena;
        const user = await db.collection('users').findOne({
            usuario: us,
            contrasena: cn
        });
        if(user == null){
            res.json({
                message: 'Autentificación fallida, vuelva a intentarlo'
            });
        } else {
            jwt.sign({user: user}, 'secretkey', (error, token) => {
                res.json({
                    token: token
                });
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            message: 'Autentificación fallida, vuelva a intentarlo'
        });
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    insertUser,
    deleteUser,
    updateUser,
    login
}