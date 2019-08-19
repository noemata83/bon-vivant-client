import cookies from "next-cookies"

export default function getCookies(ctx) {
  return cookies(ctx)
}
