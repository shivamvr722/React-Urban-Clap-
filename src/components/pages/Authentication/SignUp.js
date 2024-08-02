import InputField from "../../subcomponents/FormComponets/FormInput"
import Heading1 from "../../subcomponents/HeadingCoponets/Heading1"
import Button from "../../subcomponents/FormComponets/Button"
import { singUpFieldsFeed } from "./feeds"
import { singUpValidationSchema } from "./validationSchema"
import { Field, Formik } from 'formik';
import { useState } from "react"
import axios from "axios"
import ShowError from "../../subcomponents/FormComponets/ShowError"
import { useNavigate } from "react-router-dom"
import "./css/signupsignin.css"
import { AiOutlineEye } from "react-icons/ai";


const initialValues = {
  username: "",
  first_name: "",
  last_name: "",
  email:"",
  user_type:"",
  password: "",
  password2: ""
}


const SingUp = () => {
  const [errorMessage, setErrorMessage] = useState({"username":"", "email":""})
  const [isPassword, setIsPassword] = useState(true)
  const navigate = useNavigate()

  function handleSubmit(values, actions) {
    const URL = "http://127.0.0.1:8000/urban-company/signup/"
    
    axios.post(URL, values)
    .then((response) => {
      alert(`Dear ${values.first_name}, welcome to urban clap!`);
      setErrorMessage("")
      navigate("/")
    })
    .catch((error) => {
      alert("user created successfully", error)
      console.log(error)
      setErrorMessage({...errorMessage}, errorMessage.username = error.response.data?.username)
      setErrorMessage({...errorMessage}, errorMessage.email = error.response.data?.email)
    })
    actions.setTouched({});
    actions.setSubmitting(false);
  }

  const mappedFileds = singUpFieldsFeed.map((obj, i )=> {
      if (obj.name === "password" || obj.name === "password2"){
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
      initialValues={initialValues}
      validationSchema={singUpValidationSchema}
      onSubmit={handleSubmit}
    >
    {({ isSubmitting, handleSubmit, errors }) => (
    <form onSubmit={handleSubmit} method="post">  
      <Heading1 name={"Urban Clap"} />
      <Heading1 name={"Sing Up"}  /> 
      {mappedFileds}
      <p onMouseDown={()=>{setIsPassword(!isPassword)}}><AiOutlineEye className="eyes"/></p>
      <label htmlFor="user_type" style={{color:"white"}}>Register As: </label>
      <Field as="select" name="user_type" id="user_type" className="selectbox">
        <option>register as</option>
        <option value={'User'}>User</option>
        <option value={'ServiceProvider'}>Service Provider</option>
      </Field>
      <br />
      <Button name={"Sing Up"} type={"submit"} />
      <Button name={"Sing In"} type={"button"} handleAction={()=>{navigate("/")}} />
      <ShowError errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
      {/* <p onClick={() =>navigate("/forget")} className="forgetlink">Forget Password</p> */}
    </form> )}
    </Formik>
    </div>
  )
}


export default SingUp