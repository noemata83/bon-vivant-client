import * as actionTypes from "../actions/actionTypes"

const initialState = {
  isLoggedIn: false
}

const reducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case actionTypes.GET_LOGGED_IN_STATE: {
      // const isLoggedIn = parseCookies().appToken == true
      return {
        ...state,
        isLoggedIn: true
      }
    }
    default: {
      return { ...state }
    }
  }
}

export default reducer
