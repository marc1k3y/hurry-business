import cn from "./style.module.css"
import axios from "axios"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { v4 } from "uuid"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { host } from "../../constants"
import { capFirst } from "../../utils/capFirst"
import { logoutAction } from "../../store/auth/actions"
import { HelpLine } from "../UI/helpLine"
import { GreenLine } from "../UI/greenLine"
import { Loader } from "../UI/loader"
import { hideHelpLineAction, showHelpLineAction } from "../../store/helpLine/actions"
import { hideSuccessLineAction, showSuccessLineAction } from "../../store/successLine/actions"

export const Admin = () => {
  console.log("render")
  const dispatch = useDispatch()
  const bid = localStorage.getItem("bid")
  const { t } = useSelector(state => state.lang)
  const { helpText, helpShow } = useSelector(state => state.helpLine)
  const { successText, successShow } = useSelector(state => state.successLine)
  const [chatId, setChatId] = useState(null)
  const [newPass, setNewPass] = useState("")
  const [repeatPass, setRepeatPass] = useState("")
  const [isCopied, setIsCopied] = useState(false)
  const [connId, setConnId] = useState(null)
  const [rate, setRate] = useState(null)
  const [currency, setCurrency] = useState("eur")
  const [title, setTitle] = useState("")
  const [country, setCountry] = useState("")
  const [city, setCity] = useState("")
  const [street, setStreet] = useState("")
  const [build, setBuild] = useState("")
  const [sw, setSw] = useState("")
  const [loading, setLoading] = useState(false)

  async function changePass() {
    newPass === repeatPass &&
      await axios.put(`${host}bus/changePass`, { bid, newPass })
        .then(() => {
          dispatch(showSuccessLineAction(t?.successLine.passChanged))
          setTimeout(() => {
            dispatch(hideSuccessLineAction())
          }, 4000)
          setNewPass("")
          setRepeatPass("")
        })
  }

  function genConnId() {
    setConnId("b" + v4())
  }

  function logout() {
    dispatch(logoutAction())
    dispatch(hideHelpLineAction())
  }

  async function sendInfo(e) {
    e.preventDefault()
    setLoading(true)
    await axios.put(`${host}bus/info?bid=${bid}`, {
      info: {
        title,
        currency,
        addr: {
          country: country,
          city: city,
          street: street,
          build: build,
        },
        secretWord: sw
      }
    })
      .then(() => {
        dispatch(showSuccessLineAction(t?.successLine.infoSaved))
        setTimeout(() => {
          dispatch(hideSuccessLineAction())
        }, 3000)
        chatId ? dispatch(hideHelpLineAction()) : dispatch(showHelpLineAction(t?.helpLine.tgConnect))
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    async function getInfo() {
      setLoading(true)
      await axios.get(`${host}bus/info?bid=${bid}`)
        .then((res) => {
          setRate(res.data.rate)
          if (!res.data.tgChatId) {
            dispatch(showHelpLineAction(t?.helpLine.tgConnect))
          } else {
            setChatId(res.data.tgChatId)
          }
          if (res.data.info) {
            setTitle(res.data.info.title)
            setCurrency(res.data.info.currency)
          } else {
            dispatch(showHelpLineAction(t?.helpLine.fillInfo))
          }
          if (res.data.info?.addr) {
            setCountry(res.data.info.addr.country)
            setCity(res.data.info.addr.city)
            setStreet(res.data.info.addr.street)
            setBuild(res.data.info.addr.build)
            setSw(res.data.info.secretWord)
          }
        })
        .finally(() => setLoading(false))
    }
    getInfo()
  }, [bid, dispatch, helpShow && t])

  useEffect(() => {
    connId && axios.put(`${host}bus/connect?bid=${bid}`, { connId })
  }, [connId, bid])

  if (loading) return <Loader />

  return (
    <div className={cn.adminWrapper} style={{ marginTop: helpShow && "100px" }}>
      <button onClick={logout} className={cn.logoutBtn}>
        {t?.admin.logoutBtn}
      </button>
      <h1>{t?.admin.rateTitle} {rate}</h1>
      <form onSubmit={(e) => sendInfo(e)}>
        <div className={cn.adminWw}>
          <h2>{t?.admin.windowTitle}</h2>
          <div className={cn.adminSeletor}>
            {t?.admin.currencyLabel}
            <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
              <option value="usd">USD</option>
              <option value="eur">EUR</option>
              <option value="rub">RUB</option>
            </select>
          </div>
          <div className={cn.adminLabels}>{t?.admin.titleLabel}
            <input
              type="text"
              value={capFirst(title)}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              required />
          </div>
          <div className={cn.adminLabels}>{t?.admin.countryLabel}
            <input
              type="text"
              value={capFirst(country)}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Country"
              required />
          </div>
          <div className={cn.adminLabels}>{t?.admin.cityLabel}
            <input
              type="text"
              value={capFirst(city)}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
              required />
          </div>
          <div className={cn.adminLabels}>{t?.admin.streetLabel}
            <input
              type="text"
              value={capFirst(street)}
              onChange={(e) => setStreet(e.target.value)}
              placeholder="Street"
              required />
          </div>
          <div className={cn.adminLabels}>{t?.admin.buildLabel}
            <input
              type="text"
              value={capFirst(build)}
              onChange={(e) => setBuild(e.target.value)}
              placeholder="Build"
              required />
          </div>
          <div className={cn.adminLabels}>
            {t?.admin.secretWord}
            <input
              type="text"
              value={sw}
              onChange={(e) => setSw(e.target.value)}
              placeholder="dude" />
          </div>
        </div>
        <button>{t?.admin.saveBtn}</button>
      </form>
      <div className={cn.connId}>
        {connId ?
          <CopyToClipboard text={`/register ${connId}`} onCopy={() => setIsCopied(true)}>
            {isCopied
              ? <span className={cn.coppied}>{t?.admin.copiedText}<a href="https://t.me/hurry_orders_bot">{t?.admin.botLink}</a></span>
              : <span className={cn.forCopy}>{connId}</span>}
          </CopyToClipboard>
          : t?.admin.genText}
        {!connId &&
          <button onClick={genConnId} className={!chatId && cn.flashingConnBtn}>{t?.admin.genBtn}</button>}
      </div>
      {chatId && <div className={cn.changePass}>
        <div>{t?.admin.changePass}</div>
        <div className={cn.changePassForm}>
          <input
            placeholder={t?.admin.newPassPlc}
            minLength="8"
            maxLength="14"
            type="password"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)} />
          {newPass.length > 7 && <input
            placeholder={t?.admin.repPassPlc}
            minLength="8"
            maxLength="14"
            type="password"
            value={repeatPass}
            onChange={(e) => setRepeatPass(e.target.value)} />}
          {(newPass === repeatPass && repeatPass.length > 0) && <button onClick={changePass}>{t?.admin.changeBtn}</button>}
        </div>
      </div>}
      <GreenLine visible={successShow}>
        {successText}
      </GreenLine>
      <HelpLine visible={helpShow}>
        {helpText}
      </HelpLine>
    </div >
  )
}