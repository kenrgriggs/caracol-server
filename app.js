const express = require('express');
const app = express();
let recipes = require('./controllers/recipecontroller')
let sequelize = require('./db');

app.use('/recipe', recipes)

sequelize.sync();
//sequlize.sunc({force: true})

app.listen(3000, function () {
  console.log('App is listening on port 3000');
});
