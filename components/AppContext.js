import { createContext, useCallback, useState } from "react"
import useApi from "../components/useApi"

const initialJWT =
  typeof window === "undefined" ? null : localStorage.getItem("session_jwt")

// const idUser =
//   typeof window === "undefined"
//     ? null
//     : localStorage.getItem("id_user_connected")

export const AppContext = createContext(null)

export const AppContextProvider = (props) => {
  const [jwt, setJWT] = useState(initialJWT)
  // const [user, setUser] = useState(idUser)

  const login = useCallback((jwt, user) => {
    localStorage.setItem("session_jwt", jwt)
    localStorage.setItem("id_user_connected", user)
  }, [])

  const idUserLogged =
    typeof window === "undefined"
      ? null
      : localStorage.getItem("id_user_connected")

  const register = useCallback((jwt) => {
    localStorage.setItem("session_jwt", jwt)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem("session_jwt")
    localStorage.removeItem("id_user_connected")
    setJWT(null)
  })

  return (
    <AppContext.Provider
      {...props}
      value={{ login, idUserLogged, logout, register, jwt }}
    />
  )
}
