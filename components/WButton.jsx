const Button = (props) => {
  const { ...otherProps } = props

  return <button {...props} className="btn btn-lg btn-danger" {...otherProps} />
}

export default Button
