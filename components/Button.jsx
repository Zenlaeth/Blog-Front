const Button = (props) => {
  const { ...otherProps } = props

  return <button {...props} className="btn btn-lg btn-dark" {...otherProps} />
}

export default Button
