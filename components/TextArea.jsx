import classnames from "classnames"

const TextArea = (props) => {
  return (
    <textarea
      {...props}
      className={classnames(props.className, "form-control")}
      id="exampleTextarea"
      rows="3"
    />
  )
}

export default TextArea
