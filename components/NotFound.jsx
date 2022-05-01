import Link from "next/link"

const NotFound = () => {
    return (
        <div className="form-container">
            <h2 className="title">Not found</h2>
            <p className="text-danger">Oops, we couldn't find what you're searching...</p>
            <Link
                className="nav-item"
                href={`/`}
            >
                <a>Return to home</a>
            </Link>
        </div>
    )
  }
  
  export default NotFound
  