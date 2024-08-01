import { useState } from "react"
import Button from "../../subcomponents/FormComponets/Button"
import InputField from "../../subcomponents/FormComponets/FormInput"
import Heading1 from "../../subcomponents/HeadingCoponets/Heading1"
import { Formik, Form } from 'formik';
import axios from "axios"
import { useNavigate } from "react-router-dom"

const AddReview = () => {

  function handleSubmit(values, actions){
    const URL = "review"
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