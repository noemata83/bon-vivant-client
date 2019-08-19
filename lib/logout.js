import Router from "next/router"
import cookie from "js-cookie"

const logout = () => {
  cookie.remove("appToken")
  Router.push("/")
}

export default logout
