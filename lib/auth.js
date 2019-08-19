import { Component } from "react"
import Router from "next/router"
import nextCookie from "next-cookies"

export const auth = ctx => {
  const { appToken } = nextCookie(ctx)

  if (ctx.req && !appToken) {
    ctx.res.writeHead(302, { Location: "/login" })
    ctx.res.end()
    return
  }

  if (!appToken) {
    Router.push("/login")
  }

  return appToken
}
