import Navbar from "@@/components/Navbar"
import CommentEditForm from "@@/components/CommentEditForm"
import NotAllowed from "@@/components/NotAllowed"
import { useContext } from "react"
import { AppContext } from "@@/components/AppContext"
import useApi from "@@/components/useApi"
import { useRouter } from "next/router"

const Edit = () => {
  const { idUserLogged } = useContext(AppContext)
  const [errU, user] = useApi([null, {}], "get", "/users/" + idUserLogged)
  const router = useRouter()
  const commentId = router.query.id
  const [errC, comment] = useApi([null, {}], "get", "/comments/" + commentId)

  return (
    <>
      <Navbar />
      {idUserLogged == comment.user_id ? (
        <CommentEditForm />
      ) : <NotAllowed />}
    </>
  )
}

export default Edit
