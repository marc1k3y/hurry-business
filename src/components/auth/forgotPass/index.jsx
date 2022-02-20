import cn from "./style.module.css"
import axios from "axios"
import { useSelector } from "react-redux"
import { useState } from "react"
import { host } from "../../../constants"

export const ForgotPass = () => {
  const { t } = useSelector(state => state.lang)
  const [login, setLogin] = useState("")

  async function recoveryPass(e) {
    e.preventDefault()
    login.length && await axios.put(`${host}bus/forgotPass`, { login })
      .then((res) => console.log(res))
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
    </div>
  )
}