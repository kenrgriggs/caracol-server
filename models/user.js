const sequelize = require('../db');
module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define('user', {
		firstname: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
		lastname: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				len: {
					args: [4, 18],
					msg: 'Username must be between 4 and 18 characters.',
				},
			},
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: { isEmail: { args: true, msg: 'Please use a valid email' } },
		},
		password: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
	});
	return User;
};
