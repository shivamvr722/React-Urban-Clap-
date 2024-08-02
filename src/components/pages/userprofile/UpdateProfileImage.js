import { Formik, Form, Field } from "formik"

// import validationProfileSchema from "./uploadfilevalidationSchema"
import Button from "../../subcomponents/FormComponets/Button"
import axios from "axios"
import { AiFillFileAdd } from "react-icons/ai"

const UploadProfileImage = () => {
  const handleSubmitHandler = (values, actions) => {
    alert("hello from submio", values)
  }


  return (
    <Formik
      initialValues={{ profile_path: "" }}
      onSubmit={async (values) => {
        try{
          const formData = new FormData()
          formData.append('profile_path', values.profile_path)
          const resposne = await axios.post(`${process.env.REACT_APP_API_BASE_URL}profileimage/`, formData, {headers: {Authorization: `Bearer ${localStorage.getItem("access")}`}}, { headers: { "Content-Type": "multipart/form-data" } })
          alert("succeeded!", resposne.data)
        } catch (error) {
          alert("failed!", error)
          console.log(error)
        }
      }}
    >
      {({ values, setFieldValue }) => (
      <Form encType="multipart/form-data" method="POST" noValidate>
        <input type="file" name="profile_path" accept="image/png, image/jpeg, image/jpg" onChange={ e => setFieldValue("profile_path", e.target.files[0])} />
        <Button type="submit" name={"submit"} />
      </Form>
      )}
    </Formik>
  )
}

export default UploadProfileImage