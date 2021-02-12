let express = require('express');
let router = express.Router();


// Module 4.2 Express Router Introduction - Practice Route
router.get('/practice', function(req, res) {
    res.send('Hey! This is a practice route!')
})

module.exports = router