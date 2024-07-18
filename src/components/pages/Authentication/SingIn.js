import { useState } from "react"
import Button from "../../subcomponents/FormComponets/Button"
import InputField from "../../subcomponents/FormComponets/FormInput"
import Heading1 from "../../subcomponents/HeadingCoponets/Heading1"
import { singInformFeed } from "./feeds"
import { Formik, Form } from 'formik';
import { singInValidationSchema } from "./validationSchema"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import ShowError from "../../subcomponents/FormComponets/ShowError"
import { AiOutlineEye } from "react-icons/ai";

const SingIn = () => {
  const [errorMessage, setErrorMessage] = useState("")
  const [isPassword, setIsPassword] = useState(true)

  const navigate = useNavigate()
  function handleSubmit(values, actions){
    const URL = "http://127.0.0.1:8000/urban-company/signin/"
    // const URL = process.env.API_BASE_URL
    const login = async () => {
      try{
        setErrorMessage("")
        const response =  await axios.post(URL, values)
        const accessToken = response.data.access
        const refreshToken = response.data.refresh
        localStorage.setItem("refresh", refreshToken);
        localStorage.setItem("access", accessToken);
        window.location = "/"
      } catch (error) {
        setErrorMessage(error.response.data)
      }
    }
    login()
  }

  const mappedFileds = singInformFeed.map((obj, i)=>{
    if (obj.name === "password"){
      if(isPassword){
        obj.type = "password"
      } else {
        obj.type = "text"
      }
    }
    return <InputField obj={obj} key={obj.id}/>
  })

  return (
    <div className="container">
    <Formik 
      initialValues={{
        username: "",
        password: ""
      }}
      validationSchema={singInValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, handleSubmit, errors }) => (
      <Form  onSubmit={handleSubmit} method="post">
        <Heading1 name="Sing In"/>
        {mappedFileds}
        <p onMouseDown={()=>{setIsPassword(!isPassword)}}><AiOutlineEye className="eyes"/></p>
        <Button name={"Sing In"} type={"submit"}  />
        <Button name={"Sing Up"} type={"button"} handleAction={()=>{navigate("/signup")}} />
        <p onClick={() => navigate("/forget")} className="forgetlink">Forget Password</p>
        <ShowError errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
      </Form>
      )}
    </Formik>
    </div>
  )
}


export default SingIn