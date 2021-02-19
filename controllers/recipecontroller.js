let express = require("express");
let router = express.Router();
const Recipe = require("../db").import("../models/recipe");
const validateSession = require('../middleware/validate-session');

//      #################################
//      ##       WORKING ROUTES        ##
//      #################################

// Create recipes (Post)
router.post("/create", validateSession, function (req, res) {
  // res.send('Hey! This is the create recipes route!')
  let recipe_name = req.body.recipe.recipe_name;
  let category = req.body.recipe.category;
  let directions = req.body.recipe.directions;
  let servings = req.body.recipe.servings;
  let cook_time = req.body.recipe.cook_time;
  let views = req.body.recipe.views;
  let photo_url = req.body.recipe.photo_url;
  let created_by = req.user.id; 

  let recipeModel = {
    recipe_name: recipe_name,
    category: category,
    directions: directions,
    servings: servings,
    cook_time: cook_time,
    views: views,
    photo_url: photo_url,
    created_by: created_by,
  };

  Recipe.create(recipeModel)
  .then(recipe => res.status(200).json(recipe))
  .catch(err => res.status(500).json({error: err}))
});

// Edit recipes (Put)
router.put("/:entryId", validateSession, function (req, res) {
  // res.send('Hey! This is the create recipes route!')
  let recipe_name = req.body.recipe.recipe_name;
  let category = req.body.recipe.category;
  let directions = req.body.recipe.directions;
  let servings = req.body.recipe.servings;
  let cook_time = req.body.recipe.cook_time;
  let views = req.body.recipe.views;
  let photo_url = req.body.recipe.photo_url;
  let created_by = req.user.id; 

  let updateRecipeModel = {
    recipe_name: recipe_name,
    category: category,
    directions: directions,
    servings: servings,
    cook_time: cook_time,
    views: views,
    photo_url: photo_url,
    created_by: created_by,
  };

  const query = { where: { id: req.params.entryId } };

  Recipe.update(updateRecipeModel, query)
  .then(recipe => res.status(200).json(recipe))
  .catch(err => res.status(500).json({error: err}))
});

// View all recipes (Get)
router.get("/", function (req, res) {
    Recipe.findAll()
    .then((recipes) => res.status(200).json(recipes))
    .catch((err) => res.status(500).json({ error: err }));
});

// Delete recipes (Delete)
// ### ISSUE : Any user can delete any other user's recipes. Don't know how to fix.
router.delete("/delete/:id", validateSession, function (req, res) {
    const query = { where: { id: req.params.id } };
    
    Recipe.destroy(query)
    .then(() => res.status(200).json({ message: "Recipe Removed." }))
    .catch((err) => res.status(500).json({ error: err }));
});

// View recipes by user (Get) 
router.get("/user", validateSession, function (req, res) {
    let id = req.user.id;
    Recipe.findAll({
        where: { created_by: id }
    })
    .then(recipes => res.status(200).json(recipes))
    .catch(err => res.status(500).json({ error: err }))
})  

// View recipes by category (Get)
router.get("/:category", (req, res) => {
    let category = req.params.category
    Recipe.findAll({
        where: { category: category }
    })
    .then((recipes) => res.status(200).json(recipes))
    .catch((err) => res.status(500).json({ error: err }));
})

// Get Recipe by ID
router.get("/id/:recipeid", function (req, res) {
  let recipeid = req.params.recipeid;
  console.log(recipeid)
    const query = { where: { id: recipeid } };
    
    Recipe.findAll(query)
    .then((recipes) => res.status(200).json({recipes}))
    .catch((err) => res.status(500).json({ error: err })); 

});

//      #################################
//      ##       BROKEN ROUTES        ##
//      #################################

//      #################################
//      ##       STRETCH GOALS         ##
//      #################################


// View recipes by views (Get)                      
// router.get("/:id", (req, res) => {
//     let category = req.params.category
//     Recipe.findAll({
//         where: { category: category }
//     })
//     .then((recipes) => res.status(200).json(recipes))
//     .catch((err) => res.status(500).json({ error: err }));
// })


// View by cook time (Stretch-Get)

module.exports = router;
