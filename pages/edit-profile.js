import EditProfileForm from "@@/components/EditProfileForm"
import Navbar from "../components/Navbar"
import NotAllowed from "@@/components/NotAllowed"
import { useContext } from "react"
import { AppContext } from "@@/components/AppContext"
import useApi from "@@/components/useApi"

const EditProfile = () => {
  const { idUserLogged } = useContext(AppContext)
  const [errU, user] = useApi([null, {}], "get", "/users/" + idUserLogged)
  
  return (
    <>
      <Navbar />
      {idUserLogged ? (
        <EditProfileForm />
      ) : <NotAllowed />}
    </>
  )
}

export default EditProfile
