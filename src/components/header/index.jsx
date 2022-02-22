import cn from "./style.module.css"
import { Link, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import langIco from "../../assets/lang.svg"
import hurryLogo from "../../assets/hurry2.svg"
import { privateLinks, publicLinks } from "../../links"
import { setEnAction, setRuAction } from "../../store/translate/actions"
import { hideHelpLineAction } from "../../store/helpLine/actions"

export const Header = () => {
  const dispatch = useDispatch()
  const lang = localStorage.getItem("lang")
  const { pathname } = useLocation()
  const { isAuth } = useSelector(state => state.auth)

  function changeLang() {
    dispatch(lang === "en" ? setRuAction() : setEnAction())
  }

  return (
    <div className={cn.headerWrapper}>
      <div className={cn.headerLogo}>
        <div>hurry</div>
        <img src={hurryLogo} alt="logo" />
      </div>
      <div className={cn.headerNavbar}>
        <div onClick={changeLang} className={cn.changeLang}>
          <img src={langIco} alt="lang" />
          {lang === "en" ? "ru" : "en"}
        </div>
        {isAuth
          ? privateLinks.map(link =>
            <Link key={link.to} to={link.to}
              className={link.to === pathname ? cn.activeLink : ""}>
              <img src={link.ico} alt={link.alt} />
            </Link>)
          : publicLinks.map(link =>
            <Link key={link.to} to={link.to}>
              <img src={link.ico} alt={link.alt} />
            </Link>)}
      </div>
    </div>
  )
}