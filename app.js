const express = require('express');
const app = express();

// Module 3.2 Postman Setup - Adding a Response
app.use('/test', function(req, res) {
  res.send('This is a message from the test endpoint on the server!')
})

//Module 4.2 Express Router Introduction
let recipes = require('./controllers/recipecontroller')

app.use('/recipe', recipes)

// Module 6.2 Sequlize Connection
let sequelize = require('./db');

sequelize.sync();
//sequlize.sunc({force: true})


app.listen(3000, function () {
  console.log('App is listening on port 3000');
});
