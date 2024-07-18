import { Form, Formik } from "formik"
import InputField from "../../subcomponents/FormComponets/FormInput"
import Heading1 from "../../subcomponents/HeadingCoponets/Heading1"
import { forgetPasswordSchema } from "./validationSchema"
import { forgetPasswordFeed } from "./feeds"
import axios from "axios"
import Button from "../../subcomponents/FormComponets/Button"
import { useDispatch } from 'react-redux'
import { setNewPasswordToken } from "../../../features/authenticationSlice"
import { useNavigate } from "react-router-dom"
import "./css/forgetPassword.css"


const ForgetPassword = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
 

  function handleSubmit(values, actions){
    const reqtoken = async () => {
      try{
        const response = await axios.post("http://127.0.0.1:8000/urban-company/requestreset/", values)
        let url = response?.data?.success.split(">=>>")[1].trim() // extracting the url 
        dispatch(setNewPasswordToken(url)); // setting up the new url token into redux store to get the token from confirm password side
        navigate("/setpassword"); // this is the navigation function which is helping to navigate to the confirm password page
      } catch (error) {
        console.log(error);
      }
      actions.setTouched({});
      actions.setSubmitting(false);
    }
    reqtoken()
  }

  return(
  <div className="container">
    <Formik
      initialValues={{ email: "" }}
      validationSchema={forgetPasswordSchema}
      onSubmit={handleSubmit}
    >
    {({ isSubmitting, handleSubmit, errors }) => (
      <form onSubmit={handleSubmit} method="post">
        <Heading1 name="Forget Password" />
        <InputField obj={forgetPasswordFeed} key={forgetPasswordFeed.id}/>
        <Button name={"Generate Token"} type={"submit"} />
        <Button name={"Back"} type={"button"} handleAction={()=>{navigate("/")}} />
      </form>
    )}
    </Formik>
  </div>
  )
}

export default ForgetPassword