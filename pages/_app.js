import "../styles/globals.css"
import "bootswatch/dist/cosmo/bootstrap.min.css"
import { AppContextProvider } from "@@/components/AppContext"

const App = ({ Component, pageProps, ...otherProps }) => {
  return (
    <AppContextProvider>
      <Component {...pageProps} {...otherProps} />
    </AppContextProvider>
  )
}

export default App
