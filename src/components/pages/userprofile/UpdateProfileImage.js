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
      onSubmit={async  (values) => {
        try{
          console.log(values);
          const resposne = await axios.post("http://127.0.0.1:8000/urban-company/profileimage/", values, {headers: {Authorization: `Bearer ${localStorage.getItem("access")}`}})
          alert("succeeded!", resposne.data)
        } catch (error) {
          alert("failed!", error.resposne.data)
          console.log(error)
        }
      }}

    >
      <Form encType="multipart/form-data" method="POST" noValidate>
        <Field  name="profile_path" type="file" />
        <Button type="submit" name={"submit"} />
      </Form>
    </Formik>
  )
}

export default UploadProfileImage