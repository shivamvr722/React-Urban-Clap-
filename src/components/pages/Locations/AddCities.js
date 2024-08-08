import axios from "axios";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import InputField from "../../subcomponents/FormComponets/FormInput";
import Button from "../../subcomponents/FormComponets/Button";
import Heading1 from "../../subcomponents/HeadingCoponets/Heading1";  
import { useState } from "react";


const feed = [
  {
    "id": "add_city",
    "title": "City",
    "hint": "City",
    "name": "city",
    "type": "text",
  }, 
]

const addServiceSchema = Yup.object().shape({
  city: Yup.string()
  .required("city is required")
  .max(30, "name field should be less then 30 characteres"),
})

const AddCity = () => { 
  const navigate = useNavigate()
  const [state, setState] = useState("")
  const stateData = useSelector(state => state.stateAction.states)

  
  const handleSubmit = async (values, action) => {
    const url = `${process.env.REACT_APP_API_BASE_URL}city/`
    try{
      const response = await axios.post(url, values, {headers: {Authorization: `Bearer ${localStorage.getItem("access")}`}});
      alert("city added successfully!")
    } catch (error) {
      console.log("on error");
      console.log(error)
    }
  }


  
  let stateMap = ""
  if (stateData?.length > 0){
    stateMap = stateData?.map((obj, i) => {
      return <option key={obj.id} value={obj.id}>{obj.state}</option>
    })  
  }

  const mappedInputs = feed.map((obj, i) => {
    return (
      <InputField obj={obj} key={obj.id} />
    )
  })
  

  console.log(mappedInputs);
  return(
    <div className="addservicecontainer">
    <Heading1 name={"Add City"} />
    <Formik 
      initialValues={{
        state_id:"",
        city: "",
      }}
      validationSchema={addServiceSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, handleSubmit, errors }) => (
      <Form>
        <label htmlFor="state_id">State</label>
        <Field as="select" id="state_id" name="state_id" className="selectbox">
          <option>select state</option>
          {stateMap}
        </Field>
        {mappedInputs}
        <Button name={"Add"} type={"submit"} />
        <Button name={"Back"} type={"button"} handleAction={()=>{navigate("/")}} />
      </Form> )}
    </Formik>
    </div>
  )
}



export default AddCity