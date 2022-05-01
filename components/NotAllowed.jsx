import Link from "next/link"

const NotAllowed = () => {
    return (
        <div className="form-container">
            <h2 className="title">Not allowed</h2>
            <p className="text-danger">Oops, you're not allowed to be here!</p>
            <Link
                className="nav-item"
                href={`/`}
            >
                <a>Return to home</a>
            </Link>
        </div>
    )
  }
  
  export default NotAllowed
  