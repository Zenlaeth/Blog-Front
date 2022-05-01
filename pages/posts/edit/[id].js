import Navbar from "@@/components/Navbar"
import PostEditForm from "@@/components/PostEditForm"
import NotAllowed from "@@/components/NotAllowed"
import { useContext } from "react"
import { AppContext } from "@@/components/AppContext"
import useApi from "@@/components/useApi"
import { useRouter } from "next/router"

const Edit = () => {
  const { idUserLogged } = useContext(AppContext)
  const [errU, user] = useApi([null, {}], "get", "/users/" + idUserLogged)
  const router = useRouter()
  const postId = router.query.id
  const [errC, post] = useApi([null, {}], "get", "/posts/" + postId)

  return (
    <>
      <Navbar />
      {idUserLogged == post.user_id ? (
        <PostEditForm />
      ) : <NotAllowed />}
    </>
  )
}

export default Edit
