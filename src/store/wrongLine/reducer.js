import { HIDE_WRONG_LINE, SHOW_WRONG_LINE } from "./actions"

const defaultState = {
  wrongShow: false,
  wrongText: ""
}

export function WrongLineReducer(state = defaultState, action) {
  switch (action.type) {
    case SHOW_WRONG_LINE:
      return { ...state, wrongShow: true, wrongText: action.payload }
    case HIDE_WRONG_LINE:
      return { ...state, wrongShow: false, wrongText: "" }
    default:
      return state
  }
}