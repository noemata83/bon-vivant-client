import Router from "next/router"
import parseCookies from "./parseCookies"

export const auth = ctx => {
  const { appToken } = parsecookies()

  if (ctx.req && !token) {
    ctx.res.writeHead(302, { Location: "/login" })
    ctx.res.end()
    return
  }

  if (!token) {
    Router.push("/login")
  }

  return token
}
