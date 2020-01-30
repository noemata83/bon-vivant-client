import Sequelize from "sequelize"
import sequelize from "../../../lib/sequelize.mjs"
import bcrypt from "bcrypt"
const { Model } = Sequelize

class User extends Model {}
export const initUser = () => {
  User.init(
    {
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: "users"
    }
  )

  User.addHook("beforeCreate", async (user, options) => {
    const hashedPassword = await bcrypt.hash(user.password, 10)
    user.password = hashedPassword
  })

  User.prototype.isValidPassword = async function(password) {
    const user = this
    const compare = await bcrypt.compare(password, user.password)
    return compare
  }
}

export default User
