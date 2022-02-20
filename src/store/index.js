import { createStore, combineReducers } from "redux"
import { AuthReducer } from "./auth/reducer"
import { TranslateReducer } from "./translate/reducer"

const rootReducer = combineReducers({
  auth: AuthReducer,
  lang: TranslateReducer
})

export const store = createStore(rootReducer)