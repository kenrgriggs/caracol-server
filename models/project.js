// const { DataTypes } = require("sequelize/types");

module.exports = (sequelize, DataTypes) => {
	const Project = sequelize.define('project', {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		category: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: false,
		},
		planned: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: false,
		},
		est_startdate: {
			type: DataTypes.STRING,
			// defaultValue: DataTypes.NOW,
			allowNull: false,
			unique: false,
		},
		startdate: {
			type: DataTypes.STRING,
			// defaultValue: DataTypes.NOW,
			allowNull: false,
			unique: false,
		},
		est_enddate: {
			type: DataTypes.STRING,
			// defaultValue: DataTypes.NOW,
			allowNull: false,
			unique: false,
		},
		enddate: {
			type: DataTypes.STRING,
			// defaultValue: DataTypes.NOW,
			allowNull: false,
			unique: false,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: true,
			unique: false,
		},
		notes: {
			type: DataTypes.STRING,
			allowNull: true,
			unique: false,
		},
		hours: {
			type: DataTypes.STRING,
			allowNull: true,
			unique: false,
		},
		created_by: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: false,
		},
	});
	return Project;
};