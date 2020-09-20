import cookie from "cookie"

export default function ParseCookies(req, options = {}) {
  return cookie.parse(
    req
      ? req.headers.cookie || ""
      : typeof document !== "undefined"
      ? document.cookie
      : "",
    options
  )
}
