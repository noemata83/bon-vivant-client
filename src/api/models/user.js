"use strict"
const bcrypt = require("bcrypt")
const uuid = require("uuid")

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: uuid.v4(),
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
    user.belongsToMany(models.Ingredient, {
      through: "IngredientShelves",
      as: "shelf"
    })
    user.belongsToMany(models.Spec, {
      through: "CocktailBooks",
      as: "book"
    })
  }
  user.addHook("beforeCreate", async (user, options) => {
    const hashedPassword = await bcrypt.hash(user.password, 10)
    user.password = hashedPassword
  })
  user.prototype.isValidPassword = async function(password) {
    const user = this
    const compare = await bcrypt.compare(password, user.password)
    return compare
  }
  return user
}
