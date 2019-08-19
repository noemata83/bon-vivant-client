import * as actionTypes from "../actions/actionTypes"
import getCookies from "../../lib/nextCookies"

const initialState = {
  isLoggedIn: false
}

const reducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case actionTypes.GET_LOGGED_IN_STATE: {
      const isLoggedIn = getCookies(action.ctx).appToken ? true : false
      return {
        ...state,
        isLoggedIn
      }
    }
    case actionTypes.SET_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: true
      }
    case actionTypes.SET_LOGGED_OUT:
      return {
        ...state,
        isLoggedIn: false
      }
    default: {
      return { ...state }
    }
  }
}

export default reducer
