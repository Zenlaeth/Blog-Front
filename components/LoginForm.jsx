import { Formik } from "formik"
import Button from "./Button"
import * as yup from "yup"
import { useCallback, useState, useContext } from "react"
import FormField from "./FormField"
import { makeClient } from "../src/services/makeClient"
import { AppContext } from "./AppContext"
import { useRouter } from "next/router"

const initialValues = {
  email: "",
  password: "",
}

const validationSchema = yup.object().shape({
  email: yup.string().email().required().label("email"),
  password: yup.string().min(8).required().label("password"),
})

const LoginForm = () => {
  const router = useRouter()
  const [error, setError] = useState()
  const { login } = useContext(AppContext)
  const handleFormSubmit = useCallback(async ({ email, password }) => {
    setError(null)

    try {
      const {
        data: { jwt },
      } = await makeClient().post("/login", { email, password })

      if (!jwt) {
        throw new Error("Missing JWT.")
      }

      const parseJwt = (token) => {
        if (!token) {
          return
        }

        const base64Url = token.split(".")[1]
        const base64 = base64Url.replace("-", "+").replace("_", "/")

        return JSON.parse(window.atob(base64))
      }

      const decodeJwt = parseJwt(jwt)

      login(jwt, decodeJwt.payload.userId)

      router.push("/")
    } catch (err) {
      const { response: { data } = {} } = err

      if (data.error) {
        setError(data.errors)

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
          <div className="form-container">
            <div className="login-form p-5">
              <h2 className="card-title"><b>Login</b></h2>
              <div className="form-group">
                <form
                  onSubmit={handleSubmit}
                >
                  {error ? <p>{error}</p> : null}
                  <div className="input-box">
                    <h4 className="details">Email</h4>
                    <FormField name="email" type="email"/>
                  </div>
                  <div className="input-box">
                    <h4 className="details">Password</h4>
                    <FormField name="password" type="password"/>
                  </div>
                  <Button type="submit" disabled={!isValid || isSubmitting}>
                    Sign in
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

export default LoginForm
