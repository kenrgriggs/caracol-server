const Sequelize = require('sequelize');
const sequelize = new Sequelize('caracoldb', 'postgres', 'password', {
  host: 'localhost',
  dialect: 'postgres',
});

sequelize.authenticate().then(
  function () {
    console.log('Connected to caracoldb postgres database');
  },
  function (err) {
    console.log(err);
  }
);

module.exports = sequelize;
