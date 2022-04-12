import PostForm from "@@/components/PostForm"
import Navbar from "@@/components/Navbar"

const newPost = () => {
  return (
    <div>
      <Navbar />
      <h1>Create a new post</h1>
      <PostForm />
    </div>
  )
}

export default newPost
