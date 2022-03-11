import { useState, useEffect, useContext } from "react"
import { makeClient } from "@@/src/services/makeClient"
import { AppContext } from "./AppContext"

const useApi = (defaultValue, method, ...args) => {
  const [result, setResult] = useState(defaultValue)
  const { jwt } = useContext(AppContext)
  const deps = JSON.stringify(args)

  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await makeClient({
          headers: { authentification: jwt },
        })[method](...args)

        setResult([null, data])
      } catch (err) {
        setResult([err, err.response])
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jwt, deps, method])

  return result
}

export default useApi
