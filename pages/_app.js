import { AppContextProvider } from "@@/components/AppContext"
import "../styles/globals.css"
import "bootswatch/dist/cosmo/bootstrap.min.css"

const App = ({ Component, pageProps, ...otherProps }) => {
  return (
    <AppContextProvider>
      {/* <Routes /> */}
      <Component {...pageProps} {...otherProps} />
    </AppContextProvider>
  )
}

export default App
