const express = require('express');
const app = express();
const sequelize = require('./db');

sequelize.sync();

app.listen(3000, function () {
  console.log('App is listening on port 3000');
});
