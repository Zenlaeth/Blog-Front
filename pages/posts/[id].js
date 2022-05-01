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
        {errU ? <h5 className="p-2"><b>Log in to comment</b></h5> : <CommentForm />}
        <Comments />
      </div>
    </div>
  )
}

export default Post
