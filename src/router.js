import { Admin } from "./components/admin"
import { Auth } from "./components/auth"
import { ForgotPass } from "./components/auth/forgotPass"
import { Menu } from "./components/menu"

export const publicRoutes = [
  { path: "*", element: <Auth />, exact: true },
  { path: "/forgotPass", element: <ForgotPass />, exact: true }
]

export const privateRoutes = [
  { path: "*", element: <Menu />, exact: true },
  { path: "/admin", element: <Admin />, exact: true }
]