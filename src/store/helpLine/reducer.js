import { HIDE_HELP_LINE, SHOW_HELP_LINE } from "./actions"

const defaultState = {
  helpShow: false,
  helpText: ""
}

export function HelpLineReducer(state = defaultState, action) {
  switch (action.type) {
    case SHOW_HELP_LINE:
      return { ...state, helpShow: true, helpText: action.payload }
    case HIDE_HELP_LINE:
      return { ...state, helpShow: false, helpText: "" }
    default:
      return state
  }
}