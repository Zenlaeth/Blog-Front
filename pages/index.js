import Navbar from "../components/Navbar"
import useApi from "@@/components/useApi"
import Link from "next/link"

const Index = () => {
  const [err, { data }] = useApi([null, {}], "get", "/users")

  return (
    <div>
      <Navbar />
      <div className="posts">
        {/* {err ? <p>{data.error}</p> : <pre>{JSON.stringify(data, null, 2)}</pre>} */}
        {err ? <p>Veuillez vous connecter</p> : <p>Vous êtes bien connecté</p>}
        <h1>
          <Link className="nav-item" href="/post">
            <a>Title post</a>
          </Link>
        </h1>
        <p>
          <small>By John Doe, on XX/XX/XXXX</small>
        </p>
        <p>
          Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis
          natoque penatibus et magnis dis parturient montes, nascetur ridiculus
          mus. Nullam id dolor id nibh ultricies vehicula.
        </p>
      </div>
    </div>
  )
}

export default Index
