import Sequelize from "sequelize"
import sequelize from "../../../lib/sequelize"
import bcrypt from "bcrypt"
const { Model } = Sequelize

class User extends Model {}
export const initUser = () => {
  User.init(
    {
      username: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
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

  User.prototype.isValidPassword = async function(password) {
    const user = this
    const compare = await bcrypt.compare(password, user.password)
    return compare
  }
}

export default User
