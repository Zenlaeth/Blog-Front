import useApi from "@@/components/useApi"
import { Route, useParams } from "react-router-dom"
import { useRouter } from "next/router"
import Moment from "react-moment"
import Link from "next/link"
import { makeClient } from "../src/services/makeClient"
import { AppContext } from "./AppContext"
import { useCallback, useState, useContext } from "react"
import Button from "./Button"

const PostDetails = () => {
  const router = useRouter()
  const postId = router.query.id
  const { idUserLogged } = useContext(AppContext)
  const [errP, post] = useApi([null, {}], "get", "/posts/" + postId)
  const [errU, user] = useApi([null, {}], "get", "/users/" + post.user_id)
  const deletePost = async () => {
    await makeClient().delete("/posts/" + postId)
    router.push("/")
  }

  return (
    <div className="post-details">
      <h2>
        <b>{post.title}</b>
      </h2>
      {idUserLogged == post.user_id ? (
        <h3>
          <Link
            className="nav-item"
            href={`/posts/edit/` + post.id}
            key={post.id}
          >
            <a>Edit post</a>
          </Link>
          <Button onClick={deletePost}>Delete</Button>
        </h3>
      ) : null}

      <p>
        <small>
          By{" "}
          <b>
            {user.firstName} {user.lastName}
          </b>
          , on <Moment format="DD/MM/YYYY HH:mm">{post.createdAt}</Moment>
        </small>
      </p>
      <p>{post.content}</p>
    </div>
  )
}

export default PostDetails
