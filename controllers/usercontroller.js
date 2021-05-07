const router = require('express').Router();
const User = require('../db').import('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// CREATE BUILT IN ADMIN USER WHEN NO USERS EXIST
User.count().then(numberOfUsers => {
	console.log(numberOfUsers)
	if (numberOfUsers === 0) {
			User.create({
				firstname: process.env.DEFAULT_ADMIN,
				lastname: process.env.DEFAULT_ADMIN,
				username: process.env.DEFAULT_ADMIN,
				email: process.env.DEFAULT_ADMIN_EMAIL,
				password: bcrypt.hashSync(process.env.DEFAULT_ADMIN_PASSWORD, 13),
				isAdmin: true
			})
	}
})

//      #################################
//      ##       WORKING ROUTES        ##
//      #################################

// Create new user
router.post('/register', function (req, res) {
	User.create({
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		username: req.body.username,
		email: req.body.email,
		password: bcrypt.hashSync(req.body.password, 13),
	})
		.then(function createSuccess(user) {
			let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
				expiresIn: 60 * 60,
			});
			res.json({
				user: user,
				message: 'User registered!',
				sessionToken: token,
			});
		})
		.catch((err) => res.status(500).json({ error: err }));
});


// Login
router.post('/login', function (req, res) {
	User.findOne({
		where: {
			username: req.body.username,
		},
	})
	.then(function loginSuccess(user) {
		if (user) {
			bcrypt.compare(
				req.body.password,
				user.password,
				function (err, matches) {
					if (matches) {
						let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
							expiresIn: 60 * 60 * 24,
						});
						res.status(200).json({
							user: user,
							message: 'User successfully logged in!',
							sessionToken: token,
						});
					} else {
						res.status(502).send({ error: 'Login Failed' });
					}
				}
				);
			} else {
				res.status(500).json({ error: 'User does not exist.' });
			}
		})
		.catch((err) => res.status(500).json({ error: err }));
	});
	
	//      #################################
	//      ##       BROKEN ROUTES        ##
	//      #################################
	
	module.exports = router;
