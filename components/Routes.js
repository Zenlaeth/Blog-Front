import { BrowserRouter as Router, Routes, Switch, Route } from "next/router"
import Post from "@@/pages/posts/[id]"
import Home from "@@/pages/index"
import ReactDOM from "react-dom"
import React from "react"

// if (typeof window !== "undefined") {
//   const app = document.getElementById("root")
//   ReactDOM.render(
//     <Router>
//       <Switch>
//         <Route exact path="/" component={Home} />
//         <Route path="/posts/:id" component={Post} />
//       </Switch>
//     </Router>,
//     app
//   )
// }

const Root = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/posts/:id" component={Post} />
        </Switch>
      </div>
    </Router>
  )
}

export default Root
