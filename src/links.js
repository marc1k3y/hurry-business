import menu from "./assets/menu.svg"
import admin from "./assets/settings.svg"
import login from "./assets/login1.svg"

export const privateLinks = [
  { to: "/", ico: menu, alt: "Menu" },
  { to: "/admin", ico: admin, alt: "Admin" }
]

export const publicLinks = [
  { to: "/", ico: login, alt: "Login" }
]