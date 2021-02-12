const Sequelize = require('sequelize');
const sequelize = new Sequelize('cook_db', 'postgres', 'password', {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function() {
        console.log('Connected to cook_db');
    },
    function(err) {
        console.log(err);
    }
);

module.exports = sequelize;
