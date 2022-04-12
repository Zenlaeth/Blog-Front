import useApi from "../components/useApi"
import Moment from "react-moment"
import { useRouter } from "next/router"
import Button from "./Button"
import { makeClient } from "../src/services/makeClient"
import { AppContext } from "./AppContext"
import { useCallback, useState, useContext } from "react"

const Comments = () => {
  const router = useRouter()
  const postId = router.query.id
  const [errP, comments] = useApi([null, {}], "get", "/comments")
  const { idUserLogged } = useContext(AppContext)
  // const [errU, user] = useApi(
  //   [null, {}],
  //   "get",
  //   "/users/" + comment.user_id
  // )

  return (
    <div className="comment-all">
      {Array.from(comments)
        .filter((comment) => comment.post_id == postId)
        .map((comment) => {
          const deleteComment = async () => {
            await makeClient().delete("/comments/" + comment.id)
            router.reload(window.location.pathname)
          }
          // const [errU, user] = useApi(
          //   [null, {}],
          //   "get",
          //   "/users/" + comment.user_id
          // )

          return (
            <div>
              <h4>
                <b>
                  commented on{" "}
                  <Moment format="DD/MM/YYYY HH:mm">{comment.createdAt}</Moment>
                </b>
                {idUserLogged == comment.user_id ? (
                  <Button onClick={deleteComment}>Delete</Button>
                ) : null}
              </h4>
              <p>{comment.content}</p>
            </div>
          )
        })}
    </div>
  )
}

export default Comments
