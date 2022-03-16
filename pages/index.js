import Navbar from "../components/Navbar"
import useApi from "@@/components/useApi"

const Index = () => {
  // const [err, { data }] = useApi([null, {}], "get", "/users")

  return (
    <div>
      <Navbar />
      {/* {err ? <p>{data.error}</p> : <pre>{JSON.stringify(data, null, 2)}</pre>} */}
    </div>
  )
}

export default Index
