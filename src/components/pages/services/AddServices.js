import { Formik, Form } from "formik"
import InputField from "../../subcomponents/FormComponets/FormInput"
import * as Yup from "yup";
import Button from "../../subcomponents/FormComponets/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import Heading1 from "../../subcomponents/HeadingCoponets/Heading1";


const feed = [
  {
    "id": "up_fname",
    "title": "Service Type",
    "hint": "Enter Service",
    "name": "service_type",
    "type": "text",
  }, 
]

const addServiceSchema = Yup.object().shape({
  service_type: Yup.string()
  .required("service is required")
  .max(30, "name field should be less then 30 characteres"),

})




const AddService = ({update, setUpdate, data, aState}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  let url = null
  
  const handleSubmit = async (values, action) => {
    url = "http://127.0.0.1:8000/urban-company/service/"
    try{
      const response = await axios.post(url, values, {headers: {Authorization: `Bearer ${localStorage.getItem("access")}`}});
      navigate("/")
    } catch (error) {
      console.log("on error");
      console.log(error)
    }
  }

  const serviceForm = feed.map((obj, i) => {
    return (
      <InputField obj={obj} key={obj.id} />
    )
  })
  

  console.log(serviceForm);
  return(
    <div className="addservicecontainer">
    <Heading1 name={"Add New Service"} />
    <Formik 
      initialValues={{
        id: "",
        service_type: "",
      }}
      validationSchema={addServiceSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, handleSubmit, errors }) => (
      <Form>
      {serviceForm}
      <Button name={"Add Service"} type={"submit"} />
      <Button name={"Back"} type={"button"} handleAction={()=>{navigate("/")}} />
      </Form> )}
    </Formik>
    </div>
  )
}



 

export default AddService