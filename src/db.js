const MongoClient = require('mongodb').MongoClient

const connect = async function () {
    try {
        const client = await MongoClient.connect('mongodb://localhost:27017', {
            useUnifiedTopology: true
        });
        const db = client.db('dbprueba');
        console.log('DB is connected');
        return db;
    } catch (error) {
        console.log(e);
    }
}

module.exports = {
    connect
}