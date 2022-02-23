import stls from "./style.module.css"
import { useSelector } from "react-redux"
import helpIco from "../../../assets/help.svg"

export const HelpLine = ({ children, visible }) => {
  const { t } = useSelector(state => state.lang)
  return (
    <div className={stls.helpLineWrapper}
      style={{ display: visible ? "flex" : "none" }}>
      <div className={stls.icoBlock}>
        <img src={helpIco} alt="help-img" />
        <div>{t?.helpLine.helperName}</div>
      </div>
      <div className={stls.messageBlock}>
        {children}
      </div>
    </div>
  )
}