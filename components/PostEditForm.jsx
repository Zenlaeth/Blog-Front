import { Field, Formik } from "formik"
import Button from "./Button"
import * as yup from "yup"
import { useCallback, useState } from "react"
import FormField from "./FormField"
import { makeClient } from "../src/services/makeClient"
import { useRouter } from "next/router"

const validationSchema = yup.object().shape({
  title: yup.string().max(40).required().label("title"),
  content: yup.string().max(1000).required().label("content"),
})

const initialValues = {
  title: "",
  content: "",
  isPublished: true,
}

const PostEditForm = () => {
  const router = useRouter()
  const postId = router.query.id
  const urlPost = "/posts/edit/" + postId
  const [error, setError] = useState()

  const handleFormSubmit = useCallback(async ({ title, content, isPublished }) => {
    setError(null)

    try {
      await makeClient().put(urlPost, {
        title,
        content,
        isPublished
      })

      router.push("/posts/" + router.query.id)
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
            <div className="form-container">
              <div className="edit-form p-5">
                <h2 className="card-title"><b>Edit the post</b></h2>
                <div className="form-group">
                  <form
                    onSubmit={handleSubmit}
                  >
                    {error ? <p>{error}</p> : null}
                    <div className="input-box">
                      <h4 className="details">Title</h4>
                      <FormField name="title" type="text"/>
                    </div>
                    <div className="input-box">
                      <h4 className="details">Content</h4>
                      <FormField name="content" type="text" />
                    </div>
                    <div className="checkbox">
                      <Field
                        name="isPublished"
                        type="checkbox"
                        label="Publish"
                      />
                      <label className="form-check-label px-2">
                        Publish the post
                      </label>
                    </div>
                    <Button type="submit" disabled={!isValid || isSubmitting}>
                      Update
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </Formik>
  )
}

export default PostEditForm
