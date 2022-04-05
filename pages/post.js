import Navbar from "../components/Navbar"
import useApi from "@@/components/useApi"

const Post = () => {
  const [err, { data }] = useApi([null, {}], "get", "/users")

  return (
    <div>
      <Navbar />
      <div className="post">
        <div className="post-details">
          {/* {err ? <p>{data.error}</p> : <pre>{JSON.stringify(data, null, 2)}</pre>} */}
          {err ? (
            <p>Veuillez vous connecter</p>
          ) : (
            <p>Vous êtes bien connecté</p>
          )}
          <h2>
            <b>Title post</b>
          </h2>
          <p>
            <small>
              By <b>John Doe</b>, on XX/XX/XXXX
            </small>
          </p>
          <p>
            Nullam quis risus eget <a href="#">urna mollis ornare</a> vel eu
            leo. Cum sociis natoque penatibus et magnis dis parturient montes,
            nascetur ridiculus mus. Nullam id dolor id nibh ultricies vehicula.
          </p>
        </div>
        <div className="comment-form">
          <h4>
            <b>Comments</b>
          </h4>
          <p>Signed as Someone. Logout ?</p>
          <textarea
            className="form-control"
            id="exampleTextarea"
            rows="3"
          ></textarea>
          <button type="submit" className="btn btn-primary">
            Comment
          </button>
        </div>
        <div className="comment-all">
          <h4>
            <b>Jimmy McGill commented on XX/XX/XXXX</b>
          </h4>
          <p>This is a comment.</p>
        </div>
      </div>
    </div>
  )
}

export default Post
