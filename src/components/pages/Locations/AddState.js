import axios from "axios";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import InputField from "../../subcomponents/FormComponets/FormInput";
import Button from "../../subcomponents/FormComponets/Button";
import Heading1 from "../../subcomponents/HeadingCoponets/Heading1";
import { addState } from "../../../features/stateSlice";
import { useState } from "react";


const feed = [
  {
    "id": "add_state",
    "title": "State",
    "hint": "State",
    "name": "state",
    "type": "text",
  }, 
]

const addStateSchema = Yup.object().shape({
  state: Yup.string()
  .required("state is required")
  .max(30, "name field should be less then 30 characteres"),
})

const AddState = ({update, setUpdate, data, aState}) => {
  const navigate = useNavigate()
  const [state, setState] = useState("")
  let url = null
  const dispatch = useDispatch()

  const handleSubmit = async (values, action) => {
    console.log(values);
    url = `${process.env.REACT_APP_API_BASE_URL}/state/`
    try{
      const response = await axios.post(url, values, {headers: {Authorization: `Bearer ${localStorage.getItem("access")}`}});
      console.log(response.data);
      alert("service added successfully!", response.data)
    
    } catch (error) {
      console.log("on error");
      console.log(error)
    }
  }


  const servicesData = useSelector(state => state.servicesActions.services)

  let servicesMap = ""
  if (servicesData.length > 0){
    servicesMap = servicesData?.map((service, i) => {
      return <option key={service.id} value={service.id}>{service.service_type}</option>
    })  
  }

  const serviceSubForm = feed.map((obj, i) => {
    return (
      <InputField obj={obj} key={obj.id} />
    )
  })
  

  console.log(serviceSubForm);
  return(
    <div className="addservicecontainer">
    <Heading1 name={"Add State"} />
    <Formik 
      initialValues={{
        state: "",
      }}
      validationSchema={addStateSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, handleSubmit, errors }) => (
      <Form>
        {serviceSubForm}
        <Button name={"Add"} type={"submit"} />
        <Button name={"Back"} type={"button"} handleAction={()=>{navigate("/")}} />
      </Form> )}
    </Formik>
    </div>
  )
}



export default AddState