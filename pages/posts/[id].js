import Navbar from "../../components/Navbar"
import NotFound from "@@/components/NotFound"
import PostDetails from "@@/components/PostDetails"
import Comments from "@@/components/Comments"
import CommentForm from "@@/components/CommentForm"
import useApi from "@@/components/useApi"
import { useRouter } from "next/router"

const Post = () => {
  const [errU] = useApi([null, {}], "get", "/users")
  const router = useRouter()
  const postId = router.query.id
  const [errP, post] = useApi([null, {}], "get", "/posts/" + postId)

  return (
    <div>
      <Navbar />
      {!errP ?
        <div className="container">
          <PostDetails />
          {errU ? <h5 className="p-2"><b>Log in to comment</b></h5> : <CommentForm />}
          <Comments />
        </div>
      : <NotFound />}
    </div>
  )
}

export default Post
