import { Formik } from "formik"
import Button from "./Button"
import * as yup from "yup"
import { useCallback, useState, useContext } from "react"
import FormField from "./FormField"
import { makeClient } from "../src/services/makeClient"
import { AppContext } from "./AppContext"

const initialValues = {
  email: "",
  password: "",
}

const validationSchema = yup.object().shape({
  email: yup.string().email().required().label("email"),
  password: yup.string().min(8).required().label("password"),
})

const RegisterForm = () => {
  const [error, setError] = useState()
  const { register } = useContext(AppContext)
  const handleFormSubmit = useCallback(async ({ email, password }) => {
    setError(null)

    try {
      const {
        data: { jwt },
      } = await makeClient().post("/register", { email, password })

      if (!jwt) {
        throw new Error("Missing JWT.")
      }

      register(jwt)
    } catch (err) {
      const { response: { data } = {} } = err

      if (data.error) {
        setError("Oops, something went wrong.")

        return
      }

      setError("Oops, something went wrong.")
    }
  }, [])

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={handleFormSubmit}
    >
      {({ handleSubmit, isValid, isSubmitting, errors }) =>
        // eslint-disable-next-line no-console
        console.error(errors) || (
          <div>
            <div className="b py-16 bg-gray-50 px-4 sm:px-6 h-screen w-screen flex justify-center items-center">
              <div className="form-group">
                <form
                  className="grid grid-cols-1 gap-y-6"
                  onSubmit={handleSubmit}
                >
                  {error ? <p>{error}</p> : null}
                  <FormField name="email" type="email" label="E-mail" />
                  <FormField name="password" type="password" label="Password" />
                  <Button type="submit" disabled={!isValid || isSubmitting}>
                    Register
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

export default RegisterForm
