let express = require('express');
let router = express.Router();
const Recipe = require('../db').import('../models/recipe')


//      #################################
//      ##       WORKING ROUTES        ##
//      #################################

// Create recipes (Post)
router.post('/create', function(req, res) {
    // res.send('Hey! This is the create recipes route!')
    let recipe_name = req.body.recipe.recipe_name;
    let category = req.body.recipe.category;
    let directions = req.body.recipe.directions;
    let servings = req.body.recipe.servings;
    let cook_time = req.body.recipe.cook_time;
    let views = req.body.recipe.views;
    let photo_url = req.body.recipe.photo_url;
    let created_by = req.body.recipe.created_by; // <-- This needs to be changed to req.user.id at some point

    let recipeModel = {
        recipe_name: recipe_name,
        category: category,
        directions: directions,
        servings: servings,
        cook_time: cook_time,
        views: views,
        photo_url: photo_url,
        created_by: created_by
    }

    Recipe.create(recipeModel)
    .then (
        function createSuccess(recipe){
            // res.send("This is our create-recipes endpoint.")
            res.json({
                recipe: recipe
            })
        }
    )
})

// Edit recipes (Put)
router.put('/:entryId', function(req, res) {
    // res.send('Hey! This is the create recipes route!')
    let recipe_name = req.body.recipe.recipe_name;
    let category = req.body.recipe.category;
    let directions = req.body.recipe.directions;
    let servings = req.body.recipe.servings;
    let cook_time = req.body.recipe.cook_time;
    let views = req.body.recipe.views;
    let photo_url = req.body.recipe.photo_url;
    let created_by = req.body.recipe.created_by; // <-- This needs to be changed to req.user.id at some point

    let updateRecipeModel = {
        recipe_name: recipe_name,
        category: category,
        directions: directions,
        servings: servings,
        cook_time: cook_time,
        views: views,
        photo_url: photo_url,
        created_by: created_by
    }

    const query = { where: { id: req.params.entryId }}

    Recipe.update(updateRecipeModel, query)
    .then (
        res.send("This is our update-recipes endpoint.")
    )
})


router.get('/:recipeId', function(req, res) {
    
    let recipeid = req.recipe.id

    Recipe.findAll({
        where: { id: recipeid }
    })
    .then(recipes => res.status(200).json(recipes))
    .catch(err => res.status(500).json({ error: err }))
})

//      #################################
//      ##       BROKEN ROUTES        ##
//      #################################



// Delete recipes (Delete)
// View recipes by user (Get)

// Get Recipe by ID << Not an assignment requirement >>

// View all recipes (Get)
router.get('/', function(req, res) {
    Recipe.findAll()
    .then(recipes => res.status(200).json(recipes))
    .catch(err => res.status(500).json({ error: err }))
})

// View recipes by views (Get)
// View recipes by category (Get)
// View by cook time (Stretch-Get)

router.get('/recipes', function(req, res) {
    res.send('Hey! This is a practice route!')
})



module.exports = router