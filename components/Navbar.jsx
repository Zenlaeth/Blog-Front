import Link from "next/link"
import { useContext } from "react"
import { AppContext } from "./AppContext"
import Button from "./Button"
import useApi from "@@/components/useApi"

const Navbar = () => {
  const { logout, idUserLogged } = useContext(AppContext)
  const [errU, user] = useApi([null, {}], "get", "/users/" + idUserLogged)

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Link className="nav-item" href="/">
            <a className="navbar-brand">BLOG</a>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor01"
            aria-controls="navbarColor01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav me-auto">
              <Link className="nav-item" href="/login">
                <a className="nav-link">Login</a>
              </Link>
              <Link className="nav-item" href="/register">
                <a className="nav-link">Register</a>
              </Link>
              {idUserLogged ? (
                <>
                  {user.role_id == 2 ? (
                    <>
                      <Link className="nav-item" href="/newPost">
                        <a className="nav-link">New post</a>
                      </Link>
                    </>
                  ) : null}
                  <Link className="nav-item" href="/edit-profile">
                    <a className="nav-link">Edit profile</a>
                  </Link>
                  <li className="nav-item" href="#">
                    <Button onClick={logout}>Log out</Button>
                  </li>
                </>
              ) : null}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
