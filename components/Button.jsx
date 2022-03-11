const Button = (props) => {
  const { ...otherProps } = props

  return (
    <div className="d-grid gap-2">
      <button {...props} className="btn btn-lg btn-dark" {...otherProps} />
    </div>
  )
}

export default Button
