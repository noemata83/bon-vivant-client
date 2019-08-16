import cookie from "cookie"

export default function(req, options = {}) {
  return cookie.parse(
    req
      ? req.headers.cookie || ""
      : typeof document !== "undefined"
      ? document.cookie
      : "",
    options
  )
}
