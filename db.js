const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: true,
    rejectUnauthorized: false
  }
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
