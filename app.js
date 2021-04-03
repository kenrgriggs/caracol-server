require('dotenv').config();
const express = require('express');
const app = express();
let sequelize = require('./db');

var user = require('./controllers/usercontroller');
var project = require('./controllers/projectcontroller');

sequelize.sync();
// sequelize.sync({ force: true });

app.use(require('./middleware/headers'));

app.use(express.json());

app.use('/user', user);
app.use('/project', project);

app.listen(3000, function () {
	console.log('App is listening on port 3000');
});
