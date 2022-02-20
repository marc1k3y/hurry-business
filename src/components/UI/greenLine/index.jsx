import stls from "./style.module.css"
import successIco from "../../../assets/success.svg"

export const GreenLine = ({ children, visible }) => {
  return (
    <div className={stls.greenLineWrapper}
      style={{ display: visible ? "flex" : "none" }}>
      <div className={stls.icoBlock}>
        <img src={successIco} alt="help-img" />
      </div>
      <div className={stls.messageBlock}>
        {children}
      </div>
    </div>
  )
}