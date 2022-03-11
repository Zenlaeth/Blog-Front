import { Field } from "formik"
import Input from "./Input"

const FormField = (props) => {
  const { as: Component = Input, name, label, ...otherProps } = props

  return (
    <Field name={name}>
      {({ field, meta }) => (
        <label>
          <span className="block rb-2">{label}</span>
          <Component className="w-full" {...field} {...otherProps} />
          {meta.touched && meta.error ? (
            <p className="danger p-2 text-sm">{meta.error}</p>
          ) : null}
        </label>
      )}
    </Field>
  )
}

export default FormField
