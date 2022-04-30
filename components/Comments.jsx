import useApi from "../components/useApi"
import Moment from "react-moment"
import { useRouter } from "next/router"
import Button from "./Button"
import { makeClient } from "../src/services/makeClient"
import { AppContext } from "./AppContext"
import Link from "next/link"
import { useContext } from "react"

const Comments = () => {
  const router = useRouter()
  const postId = router.query.id
  const [errC, comments] = useApi([null, {}], "get", "/comments")
  const [errP, post] = useApi([null, {}], "get", "/posts/" + postId)
  const { idUserLogged } = useContext(AppContext)
  // const [errU, user] = useApi(
  //   [null, {}],
  //   "get",
  //   "/users/" + comment.user_id
  // )

  return (
    <div className="comment-all">
      {comments
        ? Array.from(comments)
            .filter((comment) => comment.post_id == postId)
            .map((comment) => {
              const deleteComment = async () => {
                await makeClient().delete("/comments/" + comment.id)
                router.reload(window.location.pathname)
              }

              return (
                <div key={comment.id}>
                  <h4>
                    <b>
                      commented on{" "}
                      <Moment format="DD/MM/YYYY HH:mm">
                        {comment.createdAt}
                      </Moment>
                    </b>
                    {idUserLogged == comment.user_id ||
                    idUserLogged == post.user_id ? (
                      <Button onClick={deleteComment}>Delete</Button>
                    ) : null}
                    {idUserLogged == comment.user_id ? (
                      <Link href={`/comments/edit/` + comment.id} key={post.id}>
                        <a>Edit post</a>
                      </Link>
                    ) : null}
                  </h4>
                  <p>{comment.content}</p>
                </div>
              )
            })
        : null}
    </div>
  )
}

export default Comments
