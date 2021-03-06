import { Field } from "formik"
import TextArea from "./TextArea"

const FormAreaField = (props) => {
  const { as: Component = TextArea, name, label, ...otherProps } = props

  return (
    <Field name={name}>
      {({ field, meta }) => (
        <label>
          <span className="block rb-2">{label}</span>
          <Component className="form-input" {...field} {...otherProps} />
          {meta.touched && meta.error ? (
            <p className="text-danger p-2 text-sm">{meta.error}</p>
          ) : null}
        </label>
      )}
    </Field>
  )
}

export default FormAreaField
