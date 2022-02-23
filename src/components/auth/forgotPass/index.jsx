import cn from "./style.module.css"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { host } from "../../../constants"
import { hideHelpLineAction, showHelpLineAction } from "../../../store/helpLine/actions"
import { HelpLine } from "../../UI/helpLine"

export const ForgotPass = () => {
  const dispatch = useDispatch()
  const { t } = useSelector(state => state.lang)
  const { helpText, helpShow } = useSelector(state => state.helpLine)
  const [login, setLogin] = useState("")

  async function recoveryPass(e) {
    e.preventDefault()
    login.length && await axios.put(`${host}bus/forgotPass`, { login })
      .then((res) => console.log(res))
      .catch(() => {
        dispatch(showHelpLineAction(t?.helpLine.tryAgain))
        setTimeout(() => {
          dispatch(hideHelpLineAction())
        }, 3000)
      })
  }

  return (
    <div className={cn.forgotWrapper}>
      <div className={cn.forgotWw}>
        <h2>{t?.forgot.windowTitle}</h2>
        <form onSubmit={(e) => recoveryPass(e)}>
          <div className={cn.forgotLabel}>
            {t?.forgot.loginLabel}
            <input
              value={login.toLowerCase()}
              onChange={(e) => setLogin(e.target.value)}
              type="text"
              placeholder="login" />
            <button disabled={!login.length}>{t?.forgot.approveBtn}</button>
          </div>
        </form>
      </div>
      <HelpLine visible={helpShow}>
        {helpText}
      </HelpLine>
    </div>
  )
}