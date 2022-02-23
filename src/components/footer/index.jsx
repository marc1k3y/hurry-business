import cn from "./style.module.css"
import { useSelector } from "react-redux"

export const Footer = () => {
  const { t } = useSelector(state => state.lang)
  const link = "https://www.buymeacoffee.com/marc1k3y"
  return (
    <div className={cn.footerWrapper}>
      <div>
        <a href={link} target="_blank" rel="noreferrer">{t?.footer.bca}</a>
      </div>
      <div>marc1k3y production</div>
    </div>
  )
}