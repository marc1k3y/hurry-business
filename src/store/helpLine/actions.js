export const SHOW_HELP_LINE = "SHOW_HELP_LINE"
export const HIDE_HELP_LINE = "HIDE_HELP_LINE"

export const showHelpLineAction = (payload) => ({ type: SHOW_HELP_LINE, payload })
export const hideHelpLineAction = () => ({ type: HIDE_HELP_LINE })