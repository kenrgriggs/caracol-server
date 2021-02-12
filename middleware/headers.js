<<<<<<< HEAD
module.exports = function(req, res, next) {
    res.header('access-control-allow-origin', '*');
=======
module.exports = function (req, res, next) {
    res.header('access-control-allow-origin', "*");
>>>>>>> 1b903a0fa3ca629bd6c1721c9c36cf0e0c577ffd
    res.header('access-control-allow-methods', 'GET, POST, PUT, DELETE');
    res.header('access-control-allow-headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    next();
};