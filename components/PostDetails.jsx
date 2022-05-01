import useApi from "@@/components/useApi"
import { useRouter } from "next/router"
import Moment from "react-moment"
import Link from "next/link"
import { makeClient } from "../src/services/makeClient"
import { AppContext } from "./AppContext"
import { useContext } from "react"
import Button from "./Button"
import WButton from "./WButton"

const PostDetails = () => {
  const router = useRouter()
  const postId = router.query.id
  const { idUserLogged } = useContext(AppContext)
  const [errP, post] = useApi([null, {}], "get", "/posts/" + postId)
  const [errU, user] = useApi([null, {}], "get", "public/users/" + post.user_id)
  const [errUC, userC] = useApi([null, {}], "get", "/users/" + idUserLogged)

  const deletePost = async () => {
    await makeClient().delete("/posts/" + postId)
    router.push("/")
  }

  const isAdmin =  userC.role_id == 3 ? true : false

  return (
    <div className="post-details">
      <h2>
        <b>{post.title}</b>
      </h2>
      <p>
        <small>
          By{" "}
          <b>
            {user.firstName} {user.lastName}
          </b>
          , on <Moment format="DD/MM/YYYY HH:mm">{post.createdAt}</Moment>
        </small>
      </p>
      {idUserLogged == post.user_id || isAdmin ? (
        <div className="edit-post">
          <Link href={`/posts/edit/` + post.id} key={post.id}>
            <Button href={`/posts/edit/` + post.id}>Edit post</Button>
          </Link>
          <WButton onClick={deletePost}>Delete</WButton>
        </div>
      ) : null}
      <p>{post.content}</p>
    </div>
  )
}

export default PostDetails
