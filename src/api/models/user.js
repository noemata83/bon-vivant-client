"use strict"
const bcrypt = require("bcrypt")

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "User",
    {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        autoIncrement: false
      },
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING
    },
    {}
  )
  user.associate = function(models) {
    user.belongsToMany(models.ingredient, {
      through: "IngredientShelves",
      as: "shelf"
    })
    user.belongsToMany(models.spec, {
      through: "CocktailBooks",
      as: "book"
    })
  }
  user.prototype.isValidPassword = async function(password) {
    const user = this
    const compare = await bcrypt.compare(password, user.password)
    return compare
  }
  return user
}
