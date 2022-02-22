export const SHOW_WRONG_LINE = "SHOW_WRONG_LINE"
export const HIDE_WRONG_LINE = "HIDE_WRONG_LINE"

export const showWrongLineAction = (payload) => ({ type: SHOW_WRONG_LINE, payload })
export const hideWrongLineAction = () => ({ type: HIDE_WRONG_LINE })