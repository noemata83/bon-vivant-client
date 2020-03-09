"use strict"
module.exports = (sequelize, DataTypes) => {
  const spec = sequelize.define(
    "Spec",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        autoIncrement: false
      },
      dateAdded: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
        allowNull: false
      },
      source: DataTypes.STRING,
      name: DataTypes.STRING,
      slug: DataTypes.STRING,
      description: DataTypes.TEXT,
      directions: DataTypes.TEXT
    },
    {}
  )
  spec.associate = function(models) {
    spec.hasOne(models.spec, { as: "riffOn", useJunctionTable: false })
    spec.belongsTo(models.user, { as: "contributedBy" })
    spec.belongsToMany(models.ingredient, { through: "SpecIngredients" })
    spec.belongsToMany(models.user, {
      through: "CocktailBooks",
      as: "users_saved"
    })
  }
  spec.addHook("beforeCreate", (spec, options) => {
    if (!spec.slug) {
      const slug = slugify(spec.name.toLowerCase())
      spec.slug = slug
    }
  })
  return Spec
}
