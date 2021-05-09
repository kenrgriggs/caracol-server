const router = require('express').Router();
const Project = require('../db').import('../models/project');
const validateSession = require('../middleware/validate-session');

// Create project (Post)
router.post('/', validateSession, function (req, res) {
  let name = req.body.project.name;
  let category = req.body.project.category;
  let planned = req.body.project.planned;
  let est_startdate = req.body.project.est_startdate;
  let startdate = req.body.project.startdate;
  let est_enddate = req.body.project.est_enddate;
  let enddate = req.body.project.enddate;
  let description = req.body.project.description;
  let notes = req.body.project.notes;
  let hours = req.body.project.hours;
  let created_by = req.user.username;
  
  let projectModel = {
    name: name,
    category: category,
    planned: planned,
    est_startdate: est_startdate,
    startdate: startdate,
    est_enddate: est_enddate,
    enddate: enddate,
    description: description,
    notes: notes,
    hours: hours,
    created_by: created_by,
  };
  
  Project.create(projectModel)
  .then((project) => res.status(200).json(project))
  .catch((err) => res.status(500).json({ error: err }));
});

// Edit project (Put)
router.put('/:id', validateSession, function (req, res) {

  const column = req.body.field

  const value = req.body.value

  const query = { where: { id: req.params.id }, returning: true  };

  Project.update({[column]: value}, query)
  .then(
    (project) => {
      res.status(200)
    .json(project[1][0])
    })
  .catch((error) => res.status(500).json({ error }));
});

// View all project (Get)
router.get('/', function (req, res) {
  Project.findAll()
  .then((project) => res.status(200).json(project))
  .catch((err) => res.status(500).json({ error: err }));
});

// Delete project (Delete)
router.delete('/:id', validateSession, function (req, res) {
  const query = { where: { id: req.params.id } };
  
  Project.destroy(query)
  .then(() => res.status(200).json({ message: 'Project Removed.' }))
  .catch((err) => res.status(500).json({ error: err }));
});

// View project by user (Get)
router.get('/user', function (req, res) {
  let id = req.user.id;
  Project.findAll({
    where: { created_by: id },
  })
  .then((project) => res.status(200).json(project))
  .catch((err) => res.status(500).json({ error: err }));
});

// View project by category (Get)
router.get('/:category', (req, res) => {
  let category = req.params.category;
  Project.findAll({
    where: { category: category },
  })
  .then((project) => res.status(200).json(project))
  .catch((err) => res.status(500).json({ error: err }));
});

// Get Project by ID
router.get('/id/:projectid', function (req, res) {
  let projectid = req.params.projectid;
  const query = { where: { id: projectid } };
  
  
	Project.findAll(query)
  .then((project) => {
    res.status(200).json({ project });
    Project.update({ views: project[0].views + 1 }, query);
  })
  .catch((err) => res.status(500).json({ error: err }));
  
});
    
    module.exports = router;
