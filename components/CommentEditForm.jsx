import FormAreaField from "./FormAreaField"
import Button from "./Button"
import * as yup from "yup"
import { makeClient } from "../src/services/makeClient"
import { useCallback, useState } from "react"
import { Formik } from "formik"
import { useRouter } from "next/router"

const initialValues = {
  content: "",
}

const validationSchema = yup.object().shape({
  content: yup.string().max(500).required(),
})

const CommentEditForm = () => {
  const router = useRouter()
  const commentId = router.query.id
  const urlComment = "/comments/edit/" + commentId

  const [error, setError] = useState()

  const handleFormSubmit = useCallback(async ({ content }) => {
    setError(null)

    try {
      await makeClient().put(urlComment, {
        content,
      })
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
          <div className="form-container">
            <div className="login-form p-5">
              <h2 className="card-title"><b>Edit the comment</b></h2>
              <div className="form-group">
                <form
                  onSubmit={handleSubmit}
                >
                  {error ? <p>{error}</p> : null}
                  <div className="input-box">
                    <h4 className="details">Comment</h4>
                    <FormAreaField name="content" type="text" />
                  </div>
                  <Button type="submit" disabled={!isValid || isSubmitting}>
                    Edit
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

export default CommentEditForm
