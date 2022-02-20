import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Routes, Route } from "react-router-dom"
import "./App.css"
import { Header } from "./components/header"
import { Footer } from "./components/footer"
import { host } from "./constants"
import { privateRoutes, publicRoutes } from "./router"
import { authSuccessAction, logoutAction } from "./store/auth/actions"
import { setEnAction, setRuAction } from "./store/translate/actions"
import { Loader } from "./components/UI/loader"

export default function App() {
  const bid = localStorage.getItem("bid")
  const lang = localStorage.getItem("lang")
  const dispatch = useDispatch()
  const { curLang } = useSelector(state => state.lang)
  const { isAuth } = useSelector(state => state.auth)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    axios.get(`${host}bus/check?bid=${bid}`)
      .then(() => dispatch(authSuccessAction()))
      .catch(() => dispatch(logoutAction()))
      .finally(() => setLoading(false))
  }, [dispatch, bid])

  useEffect(() => {
    dispatch(lang === "ru" ? setRuAction() : setEnAction())
  }, [dispatch, lang, curLang])

  if (loading) return <Loader />

  return (
    <div className="App">
      <Header />
      <div className="app-content">
        <Routes>
          {isAuth
            ? privateRoutes.map(route =>
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
                exact={route.exact} />)
            : publicRoutes.map(route =>
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
                exact={route.exact} />)}
        </Routes>
      </div>
      <Footer />
    </div>
  )
}