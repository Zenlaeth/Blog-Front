import useApi from "@@/components/useApi"
import FormAreaField from "./FormAreaField"
import Button from "./Button"
import * as yup from "yup"
import { makeClient } from "../src/services/makeClient"
import { useCallback, useState, useContext } from "react"
import { Formik } from "formik"
import { useRouter } from "next/router"
import { AppContext } from "./AppContext"

const initialValues = {
  content: "",
}

const validationSchema = yup.object().shape({
  content: yup.string().max(500).required(),
})

const CommentForm = () => {
  const { idUserLogged } = useContext(AppContext)
  const router = useRouter()
  const postId = router.query.id
  const [errU, user] = useApi([null, {}], "get", "/users/" + idUserLogged)
  const [error, setError] = useState()

  const handleFormSubmit = useCallback(async ({ content }) => {
    setError(null)

    try {
      await makeClient().post("/comments", {
        content,
        post_id: postId,
        user_id: idUserLogged,
      })
    } catch (err) {
      const { response: { data } = {} } = err

      if (data.error) {
        setError("Oops, something went wrong.")

        return
      }

      setError("Oops, something went wrong.")
    }
    // router.reload(window.location.pathname)
  }, [])

  return (
    <div className="comment-form">
      <h4>
        <b>Comments</b>
      </h4>
      <p>
        Signed as{" "}
        <b>
          {user.firstName} {user.lastName}
        </b>
        . Logout ?
      </p>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={handleFormSubmit}
      >
        {({ handleSubmit, isValid, isSubmitting, errors }) =>
          // eslint-disable-next-line no-console
          console.error(errors) || (
            <div className="form-group">
              <form
                className="grid grid-cols-1 gap-y-6"
                onSubmit={handleSubmit}
              >
                {error ? <p>{error}</p> : null}
                <div className="input-box">
                  <FormAreaField name="content" type="text" />
                </div>
                <Button type="submit" disabled={!isValid || isSubmitting}>
                  Create
                </Button>
              </form>
            </div>
          )
        }
      </Formik>
    </div>
  )
}

export default CommentForm
