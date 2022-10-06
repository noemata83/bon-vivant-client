import jwt from "jsonwebtoken"
import * as actionTypes from "../actions/actionTypes"
import getCookies from "../../../lib/nextCookies"
import env from "../../../../config/keys"

interface AuthState {
  isLoggedIn: boolean
  username?: string
  userId?: string
}

const initialState: AuthState = {
  isLoggedIn: false,
  username: null,
  userId: null,
}

const reducer = (state = { ...initialState }, action): AuthState => {
  switch (action.type) {
    case actionTypes.GET_LOGGED_IN_STATE: {
      const token = getCookies(action.ctx).appToken
      const isLoggedIn = token ? true : false
      if (isLoggedIn) {
        const payload = jwt.verify(token, env.SECRET)
        const { username, id } = payload
        return {
          ...state,
          isLoggedIn,
          username,
          userId: id,
        }
      }
      return {
        ...state,
        isLoggedIn,
      }
    }
    case actionTypes.SET_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: true,
      }
    case actionTypes.SET_LOGGED_OUT:
      return {
        ...state,
        isLoggedIn: false,
      }
    default: {
      return { ...state }
    }
  }
}

export default reducer
