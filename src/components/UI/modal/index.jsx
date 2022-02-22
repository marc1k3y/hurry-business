import cn from "./style.module.css"
import close from "../../../assets/close.svg"

export const Modal = ({ visible, onClose, children, header = "info" }) => {
  return (
    <div className={cn.modalWrapper} style={{ display: visible ? "flex" : "none" }}>
      <div className={cn.modalHeader}>
        <p>{header}</p>
        <button onClick={() => onClose(false)}>
          <img src={close} alt="close" />
        </button>
      </div>
      <div className={cn.modalContet}>
        {children}
      </div>
    </div>
  )
}