import stls from "./style.module.css"
import helpIco from "../../../assets/help.svg"

export const HelpLine = ({ children, visible }) => {
  return (
    <div className={stls.helpLineWrapper}
      style={{ display: visible ? "flex" : "none" }}>
      <div className={stls.icoBlock}>
        <img src={helpIco} alt="help-img" />
        <div>Eva</div>
      </div>
      <div className={stls.messageBlock}>
        {children}
      </div>
    </div>
  )
}