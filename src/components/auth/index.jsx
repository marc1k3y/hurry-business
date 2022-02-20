import cn from "./style.module.css"
import axios from "axios"
import { Link } from "react-router-dom"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import eyeShow from "../../assets/eye-show.svg"
import eyeHide from "../../assets/eye-hide.svg"
import { host } from "../../constants"
import { authSuccessAction } from "../../store/auth/actions"
import { HelpLine } from "../UI/helpLine"
import { Modal } from "../UI/modal"

export const Auth = () => {
  console.log("render")
  const dispatch = useDispatch()
  const { t } = useSelector(state => state.lang)
  const [isLogin, setIsLogin] = useState(true)
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [passType, setPassType] = useState(true)
  const [policy, setPolicy] = useState(false)
  const [helpLine, setHelpLine] = useState(false)
  const [textHelpLine, setTextHelpLine] = useState(null)
  const [modal, setModal] = useState(false)
  const [textModal, setTextModal] = useState(null)

  function log() {
    axios.post(`${host}bus/login`, { login, password })
      .then((res) => {
        if (res.data.length === 24) {
          localStorage.setItem("bid", res.data)
          dispatch(authSuccessAction())
        }
      })
      .catch(() => {
        setTextHelpLine("Please try again")
        setHelpLine(true)
        setTimeout(() => {
          setHelpLine(false)
        }, 3000)
      })
  }

  function reg() {
    axios.post(`${host}bus/reg`, { login, password })
      .then((res) => {
        if (res.data.length === 24) {
          localStorage.setItem("bid", res.data)
          dispatch(authSuccessAction())
        }
      })
      .catch(() => {
        setTextHelpLine("Login already exist")
        setHelpLine(true)
        setTimeout(() => {
          setHelpLine(false)
        }, 3000)
      })
  }

  function auth(e) {
    e.preventDefault()
    isLogin
      ? log()
      : reg()
  }

  function policyHandler() {
    setTextModal("We can send you news")
    setModal(true)
  }

  return (
    <div className={cn.authWrapper}>
      <form onSubmit={(e) => auth(e)}>
        <div className={cn.authWw}>
          <h2>{t?.auth.windowTitle}</h2>
          <div className={cn.authLabels}>{t?.auth.loginLabel}
            <input
              type="text"
              value={login.toLowerCase()}
              onChange={(e) => setLogin(e.target.value)} />
          </div>
          <div className={cn.authLabels}>{t?.auth.passLabel}
            <div>
              <input
                minLength="8"
                maxLength="14"
                type={passType ? "password" : "text"}
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
              <img src={passType ? eyeShow : eyeHide} alt="show" onClick={() => setPassType(!passType)} />
            </div>
          </div>
          <div className={cn.privacyPolicy}>
            <div onClick={policyHandler}>{t?.auth.privacyPlc}</div>
            <input type="checkbox" value={policy} onChange={() => setPolicy(!policy)} />
          </div>
          <div className={cn.authBtns}>
            <button
              disabled={!policy}>
              {isLogin
                ? t?.auth.loginBtn
                : t?.auth.regBtn}
            </button>
            <div
              onClick={() => setIsLogin(!isLogin)}>
              {isLogin
                ? t?.auth.idha
                : t?.auth.iha}
            </div>
            <Link to="/forgotPass">{t?.auth.forgotPass}</Link>
          </div>

        </div>
      </form>
      <HelpLine visible={helpLine}>{textHelpLine}</HelpLine>
      <Modal visible={modal} onClose={setModal} header={t?.auth.privacyPlc}>
        {textModal}
      </Modal>
    </div>
  )
}