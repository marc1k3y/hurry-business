import { HIDE_SUCCESS_LINE, SHOW_SUCCESS_LINE } from "./actions"

const defaultState = {
  successShow: false,
  successText: ""
}

export function SuccessLineReducer(state = defaultState, action) {
  switch (action.type) {
    case SHOW_SUCCESS_LINE:
      return { ...state, successShow: true, successText: action.payload }
    case HIDE_SUCCESS_LINE:
      return { ...state, successShow: false, successText: "" }
    default:
      return state
  }
}