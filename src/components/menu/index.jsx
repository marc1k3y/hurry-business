import cn from "./style.module.css"
import axios from "axios"
import { nanoid } from "nanoid"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import deleteIco from "../../assets/delete.svg"
import { host } from "../../constants"
import { capFirst } from "../../utils/capFirst"
import { HelpLine } from "../UI/helpLine"
import { Loader } from "../UI/loader"

export const Menu = () => {
  console.log("render")
  const bid = localStorage.getItem("bid")
  const { t } = useSelector(state => state.lang)
  const [loading, setLoading] = useState(false)
  const [menuAction, setMenuAction] = useState(false)
  const [infoFilled, setInfoFilled] = useState(true)
  const [currency, setCurrency] = useState("")
  const [option, setOption] = useState("ml")
  const [menu, setMenu] = useState([])
  const [posTitle, setPosTitle] = useState("")
  const [posOption, setPosOption] = useState("")
  const [posPrice, setPosPrice] = useState("")

  function currencySymbol(currency) {
    switch (currency) {
      case "usd":
        return "$"
      case "eur":
        return "€"
      case "rub":
        return "rub"
      default:
        return
    }
  }

  async function popPos(e, target) {
    e.preventDefault()
    setMenuAction(true)
    await axios.put(`${host}bus/popPos?bid=${bid}`, { target })
      .finally(() => {
        setMenuAction(false)
      })
  }

  async function sendPos(e) {
    e.preventDefault()
    setMenuAction(true)
    await axios.put(`${host}bus/menu?bid=${bid}`, {
      pos: {
        id: nanoid(4),
        title: posTitle,
        option: posOption + option,
        price: posPrice + currencySymbol(currency)
      }
    })
      .finally(() => {
        setPosTitle("")
        setPosOption("")
        setPosPrice("")
        setMenuAction(false)
      })
  }

  useEffect(() => {
    async function getInfoStatus() {
      setLoading(true)
      await axios.get(`${host}bus/checkInfo?bid=${bid}`)
        .then(() => setInfoFilled(true))
        .catch(() => setInfoFilled(false))
        .finally(() => setLoading(false))
    }
    getInfoStatus()
  }, [bid])

  useEffect(() => {
    async function getMenu() {
      setLoading(true)
      await axios.get(`${host}bus/menuPage?bid=${bid}`)
        .then((res) => {
          setCurrency(res.data.currency)
          setMenu(res.data.menu.sort((a, b) => a.title > b.title ? 1 : -1))
        })
        .finally(() => setLoading(false))
    }
    getMenu()
  }, [bid, menuAction])

  if (loading) return <Loader />

  return (
    <div className={cn.menuWrapper} style={{ marginTop: !infoFilled && "80px" }}>
      <div className={cn.menuCreate}>
        <h2>{t?.menu.windowTitle}</h2>
        <form onSubmit={(e) => sendPos(e)}>
          <input
            type="text"
            placeholder={t?.menu.plcTitle}
            value={capFirst(posTitle)}
            onChange={(e) => setPosTitle(e.target.value)}
            required
          />
          <div className={cn.optionInput}>
            <input
              type="number"
              placeholder="250"
              value={posOption}
              onChange={(e) => setPosOption(e.target.value)}
            />
            <select value={option} onChange={(e) => setOption(e.target.value)}>
              <option value="ml">{t?.menu.ml}</option>
              <option value="gr">{t?.menu.gr}</option>
            </select>
          </div>
          <div className={cn.priceInput}>
            <input
              className={cn.priceInput}
              type="number"
              placeholder="15"
              value={posPrice}
              onChange={(e) => setPosPrice(e.target.value)}
              required
            />
            <div>{currencySymbol(currency)}</div>
          </div>
          <button disabled={!infoFilled}>{t?.menu.createBtn}</button>
        </form>
      </div>
      <div className={cn.menuPositions}>
        {menu.length > 0 && menu.map((pos, index) =>
          <div key={index} className={cn.menuPosition}>
            <button onClick={(e) => popPos(e, pos.id)}>
              <img src={deleteIco} alt="delete" />
            </button>
            <div className={cn.posTitle}>{pos.title}</div>
            <div>{pos.option}</div>
            <div className={cn.posPrice}>{pos.price}</div>

          </div>)}
      </div>
      <HelpLine visible={!infoFilled}>
        Please before fill <Link to="/admin">info</Link>
      </HelpLine>
    </div>
  )
}