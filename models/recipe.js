const { DataTypes } = require("sequelize/types");

module.exports = (sequelize, DataTypes) => {
    const Recipe = sequlize.define('recipe', {
        recipe_name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        },
        cook_time: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: false
        },
        directions: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        },
        servings: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        },
        views: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: false
        },
        photo_url: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: false
        },
        created_by: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: false
        },
        
    })
    return Recipe;
}