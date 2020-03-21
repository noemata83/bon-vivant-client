"use strict"
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define(
    "Review",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        autoIncrement: false
      },
      rating: DataTypes.NUMERIC,
      content: DataTypes.TEXT
    },
    {}
  )
  Review.associate = function(models) {
    Review.belongsTo(models.User)
    Review.belongsTo(models.Spec)
  }
  return Review
}
