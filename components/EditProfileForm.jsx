import { Formik } from "formik"
import Button from "./Button"
import WButton from "./WButton"
import * as yup from "yup"
import { useCallback, useState, useContext } from "react"
import FormField from "./FormField"
import { makeClient } from "../src/services/makeClient"
import { useRouter } from "next/router"
import { AppContext } from "./AppContext"

const initialValues = {
  email: "",
  firstName: "",
  lastName: "",
  password: "",
}

const validationSchema = yup.object().shape({
  email: yup.string().email().required().label("email"),
  firstName: yup
    .string()
    .matches(/^[aA-zZ\s]+$/, "Please enter valid name")
    .max(40)
    .required()
    .label("firstName"),
  lastName: yup
    .string()
    .matches(/^[aA-zZ\s]+$/, "Please enter valid name")
    .max(40)
    .required()
    .label("lastName"),
  password: yup.string().min(8).required().label("password"),
})

const EditProfileForm = () => {
  const { idUserLogged } = useContext(AppContext)
  const router = useRouter()
  const [error, setError] = useState()
  const handleFormSubmit = useCallback(
    async ({ email, firstName, lastName, password }) => {
      setError(null)

      try {
        await makeClient().put("/users/" + idUserLogged, {
          email,
          firstName,
          lastName,
          password,
        })

        router.push("/")
      } catch (err) {
        const { response: { data } = {} } = err

        if (data.error) {
          setError("Oops, something went wrong.")

          return
        }

        setError("Oops, something went wrong.")
      }
    },
    []
  )
  const deleteAccount = async () => {
    await makeClient().delete("/users/" + idUserLogged)
    router.push("/login")
  }

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
              <div className="edit-form p-5">
                <h2 className="card-title"><b>Edit profile</b></h2>
                <div className="form-group">
                  <form
                    className="grid grid-cols-1 gap-y-6"
                    onSubmit={handleSubmit}
                  >
                    {error ? <p>{error}</p> : null}
                    <div className="input-box">
                      <h4 className="details">Email</h4>
                      <FormField name="email" type="email" />
                    </div>
                    <div className="input-box">
                      <h4 className="details">First name</h4>
                      <FormField name="firstName" type="text" />
                    </div>
                    <div className="input-box">
                      <h4 className="details">Last name</h4>
                      <FormField name="lastName" type="text" />
                    </div>
                    <div className="input-box">
                      <h4 className="details">Password</h4>
                      <FormField name="password" type="password" />
                    </div>      
                    <Button type="submit" disabled={!isValid || isSubmitting}>
                      Edit profile
                    </Button>
                    <WButton onClick={deleteAccount}>Delete profile</WButton>
                  </form>
                </div>
              </div>
            </div>
        )
      }
    </Formik>
  )
}

export default EditProfileForm
