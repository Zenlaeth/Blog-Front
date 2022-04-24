import { Field, Formik } from "formik"
import Button from "./Button"
import * as yup from "yup"
import { useCallback, useState, useContext } from "react"
import FormField from "./FormField"
import { makeClient } from "../src/services/makeClient"
import { AppContext } from "./AppContext"
import { useRouter } from "next/router"

const initialValues = {
  title: "",
  content: "",
  isPublished: false,
}

const validationSchema = yup.object().shape({
  title: yup.string().max(40).required().label("title"),
  content: yup.string().max(1000).required().label("content"),
})

const PostForm = () => {
  const router = useRouter()
  const [error, setError] = useState()
  const { idUserLogged } = useContext(AppContext)
  const handleFormSubmit = useCallback(
    async ({ title, content, isPublished }) => {
      setError(null)

      try {
        await makeClient().post("/posts", {
          title,
          content,
          isPublished,
          user_id: idUserLogged,
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

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={handleFormSubmit}
    >
      {({ handleSubmit, isValid, isSubmitting, errors }) =>
        // eslint-disable-next-line no-console
        console.error(errors) || (
          <div className="card mb-3">
            <div className="b py-16 bg-gray-50 px-4 sm:px-6 h-screen w-screen flex justify-center items-center">
              <div className="form-group">
                <form
                  className="grid grid-cols-1 gap-y-6"
                  onSubmit={handleSubmit}
                >
                  {error ? <p>{error}</p> : null}
                  <div className="card-body">
                    <FormField name="title" type="text" label="Title" />
                    <FormField name="content" type="text" label="Content" />
                    <div className="form-group form-check">
                      <Field
                        name="isPublished"
                        type="checkbox"
                        label="Publish"
                      />
                      <label className="form-check-label">
                        Publish the post
                      </label>
                    </div>
                  </div>
                  <Button type="submit" disabled={!isValid || isSubmitting}>
                    Create
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

export default PostForm
