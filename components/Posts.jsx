import useApi from "../components/useApi"
import Link from "next/link"
import Moment from "react-moment"

const Posts = () => {
  const [errP, posts] = useApi([null, {}], "get", "/posts")

  const [errU] = useApi([null, {}], "get", "/users")

  return (
    <div className="container">
      {posts
        ? Array.from(posts).filter((post) => post.isPublished == 1).map((post) => {
            // const [errU, user] = useApi([null, {}], "get", "/users/" + post.user_id)
            return (
              <div className="post-item" key={post.id}>
                <h1>
                  <Link
                    className="nav-item"
                    href={`/posts/` + post.id}
                    key={post.id}
                  >
                    <a>{post.title}</a>
                  </Link>
                </h1>
                <p>
                  <small>
                    <Moment format="DD/MM/YYYY HH:mm">{post.createdAt}</Moment>
                  </small>
                </p>
                <p>{post.content}</p>
              </div>
            )
          })
        : null}
    </div>
  )
}

export default Posts
