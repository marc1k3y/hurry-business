import cn from "./style.module.css"
import loader from "../../../assets/loader.svg"

export const Loader = () => {
  return (
    <div className={cn.loaderWrapper}>
      <div className={cn.loader}>
        <img src={loader} alt="loading" />
      </div>
    </div>
  )
}