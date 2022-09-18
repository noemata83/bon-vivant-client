import * as actions from "./actionTypes"

export const getLoggedInState = ({ ctx }) => ({
  type: actions.GET_LOGGED_IN_STATE,
  ctx
})

export const setLoggedIn = () => ({
  type: actions.SET_LOGGED_IN
})

export const setLoggedOut = () => ({
  type: actions.SET_LOGGED_OUT
})
