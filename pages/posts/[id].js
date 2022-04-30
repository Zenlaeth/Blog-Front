import Navbar from "../../components/Navbar"

import PostDetails from "@@/components/PostDetails"
import Comments from "@@/components/Comments"
import CommentForm from "@@/components/CommentForm"
import useApi from "@@/components/useApi"

const Post = () => {
  const [errU] = useApi([null, {}], "get", "/users")
  
  return (
    <div>
      <Navbar />
      <div className="container">
        <PostDetails />
        {errU ? <p>Log in to comment</p> : <CommentForm />}
        <Comments />
      </div>
    </div>
  )
}

export default Post
