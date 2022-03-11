import { Formik } from "formik"
import Button from "./Button"
import * as yup from "yup"
import { useState } from "react"

const initialValues = {
  email: "",
  password: "",
}

// const validationSchema = yup.object().shape({
//   email: yup.string().required().label("email"),
//   password: yup.string().required().label("password"),
// })

const Form = () => {
  const [user, setUser] = useState(initialValues)

  const onValueChange = (e) => {
    setUser({ ...user, [e.target.email]: e.target.password })
    // eslint-disable-next-line no-console
    console.log(user)
  }

  return (
    <Formik
      // onSubmit={handleFormSubmit}
      initialValues={initialValues}
      // validationSchema={validationSchema}
    >
      {({ handleSubmit, isValid, isSubmitting, errors }) =>
        // eslint-disable-next-line no-console
        console.error(errors) || (
          <div>
            <div className="b py-16 bg-gray-50 px-4 sm:px-6 h-screen w-screen flex justify-center items-center">
              <div className="form-group">
                <form
                  className="grid grid-cols-1 gap-y-6"
                  noValidate
                  onSubmit={handleSubmit}
                >
                  <div className="form-group">
                    <label>Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="Enter email"
                      value={user.email}
                      onChange={(e) => onValueChange(e)}
                    />
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="Enter password"
                      value={user.password}
                      onChange={(e) => onValueChange(e)}
                    />
                  </div>
                  <Button type="submit" disabled={!isValid || isSubmitting}>
                    Submit
                  </Button>
                </form>
              </div>
            </div>
          </div>
        )
      }
    </Formik>
  )
}

export default Form
