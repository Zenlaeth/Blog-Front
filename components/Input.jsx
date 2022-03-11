import classnames from "classnames"

const Input = (props) => {
  return (
    <input
      {...props}
      className={classnames(
        props.className,
        "px-1.5 py-1 border-2 border-blue-600"
      )}
    />
  )
}

export default Input
