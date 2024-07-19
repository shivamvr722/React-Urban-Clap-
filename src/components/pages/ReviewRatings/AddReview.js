import { useState } from "react"
import Button from "../../subcomponents/FormComponets/Button"
import InputField from "../../subcomponents/FormComponets/FormInput"
import Heading1 from "../../subcomponents/HeadingCoponets/Heading1"
import { Formik, Form } from 'formik';
import axios from "axios"
import { useNavigate } from "react-router-dom"

const AddReview = () => {
  const [errorMessage, setErrorMessage] = useState("")
  const navigate = useNavigate()

  function handleSubmit(values, actions){
    const URL = "http://127.0.0.1:8000/urban-company/review/"
    
    const login = async () => {
      try{
        setErrorMessage("")
        const response =  await axios.post(URL, values, {headers: {Authorization: `Bearer ${localStorage.getItem("access")}`}})
        console.log(response.data)
        navigate("/reviews")
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
        review: "",
        booking: ""
      }}
      validationSchema={singInValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, handleSubmit, errors }) => (
      <Form  onSubmit={handleSubmit} method="post">
        <Heading1 name="Add Review"/>
        {mappedFileds}
        <Button name={"Add Review"} type={"submit"} />
        <Button name={"Home"} type={"button"} handleAction={()=>{navigate("/")}} />
        <ShowError errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
      </Form>
      )}
    </Formik>
    </div>
  )
}


export default AddReview