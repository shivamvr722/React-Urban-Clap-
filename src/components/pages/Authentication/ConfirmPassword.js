import { Formik } from "formik"
import InputField from "../../subcomponents/FormComponets/FormInput"
import Heading1 from "../../subcomponents/HeadingCoponets/Heading1"
import Button from "../../subcomponents/FormComponets/Button"
import { confirmPasswordFeed } from "./feeds"
import { confirmPasswordSchema } from "./validationSchema"
import axios from "axios"
import { useSelector } from "react-redux"
import { applyMiddleware } from "@reduxjs/toolkit"
import { useNavigate } from "react-router-dom"
import { AiOutlineEye } from "react-icons/ai";
import { useState } from "react"

const ConfirmpPassword = () => {
  const newPassLink = useSelector(state => state.newPassworeToken.passwordToken)
  const navigate = useNavigate();
  const [isPassword, setIsPassword] = useState(true)
  
  const handleSubmit = (values, actions) => {
    console.log(values);
    const setNewPasswordPost = async () => {
      if(newPassLink){
        try{
          const response = await axios.post(newPassLink, values)
          alert("Password Updated Successfully")
          navigate("/")
        } catch (error) {
          alert("something went wrong while updating password")
          console.log(error)
          navigate("/")
        }
      }
    }
    actions.setTouched({});
    actions.setSubmitting(false);
    setNewPasswordPost()
  }

  const confirmMappedFields = confirmPasswordFeed.map((obj, i) => {
    if (obj.name === "new_password" || obj.name === "confirm_password"){
      if(isPassword){
        obj.type = "password"
      } else {
        obj.type = "text"
      }
    }
    return <InputField obj={obj} key={obj.id} />
  })
  
  return (
    <div className="container"> 
    <Formik 
      initialValues={{
        new_password: "",
        confirm_password: ""
      }}
      validationSchema={confirmPasswordSchema}
      onSubmit={handleSubmit}
      >
      {({ isSubmitting, handleSubmit, errors }) => (
      <form onSubmit={handleSubmit} method="POST">
        <Heading1 name="Set New Password" />
        {confirmMappedFields}
        <p onClick={()=>{setIsPassword(!isPassword)}}><AiOutlineEye className="eyes"/></p>
        <Button name={"Confirm"} type={"submit"}/>
        <Button name={"Cancel"} type={"button"} handleAction={() => { navigate("/") }} />
      </form>
      )}
    </Formik>
    </div>
  )
}


export default ConfirmpPassword