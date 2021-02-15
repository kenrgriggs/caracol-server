const express = require('express');
const app = express();
let recipes = require('./controllers/recipecontroller')
let sequelize = require('./db');

app.use(express.json());

app.use('/recipe', recipes)

sequelize.sync();
// sequelize.sync({force: true})

app.listen(3000, function () {
  console.log('App is listening on port 3000');
});
