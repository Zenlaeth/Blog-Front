import { AppContextProvider } from "@@/components/AppContext"
import "../styles/globals.css"
import "bootswatch/dist/cosmo/bootstrap.min.css"

const App = ({ Component, pageProps, ...otherProps }) => {
  return (
    <div>
      <AppContextProvider>
        {/* <Routes /> */}
        <Component {...pageProps} {...otherProps} />
      </AppContextProvider>
    </div>
  )
}

export default App
