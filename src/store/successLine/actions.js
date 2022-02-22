export const SHOW_SUCCESS_LINE = "SHOW_SUCCESS_LINE"
export const HIDE_SUCCESS_LINE = "HIDE_SUCCESS_LINE"

export const showSuccessLineAction = (payload) => ({ type: SHOW_SUCCESS_LINE, payload })
export const hideSuccessLineAction = () => ({ type: HIDE_SUCCESS_LINE })