//Importing develop modules
const express = require('express');
const database = require('./db');
const morgan = require('morgan');
const { router } = require('./routes/user.routes');
const app = express();

//Settings
app.set('port', process.env.PORT || 4095);

//Middlewares
app.use(express.json());
app.use(morgan('dev'));

//Routes
app.use('/users', router);

//Run server
async function main() {
    await app.listen(app.get('port'),
        () => console.log('Server is running on port ' + app.get('port')));
}

main();