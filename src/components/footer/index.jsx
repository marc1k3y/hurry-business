import cn from "./style.module.css"

export const Footer = () => {
  const link = "https://www.buymeacoffee.com/marc1k3y"
  return (
    <div className={cn.footerWrapper}>
      <div>
        <a href={link} target="_blank" rel="noreferrer">Buy Coffee Author</a>
      </div>
      <div>marc1k3y production</div>
    </div>
  )
}