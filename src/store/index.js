import { createStore, combineReducers } from "redux"
import { AuthReducer } from "./auth/reducer"
import { HelpLineReducer } from "./helpLine/reducer"
import { SuccessLineReducer } from "./successLine/reducer"
import { TranslateReducer } from "./translate/reducer"
import { WrongLineReducer } from "./wrongLine/reducer"

const rootReducer = combineReducers({
  auth: AuthReducer,
  lang: TranslateReducer,
  helpLine: HelpLineReducer,
  successLine: SuccessLineReducer,
  wrongLine: WrongLineReducer
})

export const store = createStore(rootReducer)