require('dotenv').config();
const express = require('express');
const app = express();
const sequelize = require('./db');

var user = require('./controllers/usercontroller');

sequelize.sync();
app.use(require('./middleware/headers'));

app.use(express.json());

app.use('/user', user);
app.listen(3000, function () {
	console.log('App is listening on port 3000');
});
