"use strict"
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define(
    "Review",
    {
      id: DataTypes.UUID,
      rating: DataTypes.NUMERIC,
      content: DataTypes.TEXT
    },
    {}
  )
  Review.associate = function(models) {
    Review.belongsTo(models.user)
    Review.belongsTo(models.spec)
  }
  return Review
}
