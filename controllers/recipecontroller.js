let express = require('express');
let router = express.Router();

// Create recipes (Post)
// Edit recipes (Put)
// Delete recipes (Delete)
// View recipes by user (Get)
// View all recipes (Get)
// View recipes by views (Get)
// View recipes by category (Get)
// View by cook time (Stretch-Get)

router.get('/practice', function(req, res) {
    res.send('Hey! This is a practice route!')
})

module.exports = router