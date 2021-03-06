import PostForm from "@@/components/PostForm"
import NotAllowed from "@@/components/NotAllowed"
import Navbar from "@@/components/Navbar"
import { useContext } from "react"
import { AppContext } from "@@/components/AppContext"
import useApi from "@@/components/useApi"

const newPost = () => {
  const { idUserLogged } = useContext(AppContext)
  const [errU, user] = useApi([null, {}], "get", "/users/" + idUserLogged)
  const isAdmin =  user.role_id == 3 ? true : false

  return (
    <>
      <Navbar />
      {idUserLogged ? (
        <>
          {user.role_id == 2 || isAdmin ? (
            <PostForm />
            ) : <NotAllowed />}
        </>
      ) : <NotAllowed />}
    </>
  )
}

export default newPost
