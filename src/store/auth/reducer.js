import { AUTH_SUCCESS, LOGOUT } from "./actions"

const defaultState = {
  isAuth: false
}

export function AuthReducer(state = defaultState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return { ...state, isAuth: true }
    case LOGOUT:
      localStorage.removeItem("bid")
      return { ...state, isAuth: false }
    default:
      return state
  }
}