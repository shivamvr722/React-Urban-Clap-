import axios from "axios";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import InputField from "../../subcomponents/FormComponets/FormInput";
import Button from "../../subcomponents/FormComponets/Button";
import Heading1 from "../../subcomponents/HeadingCoponets/Heading1";
import { addSubService } from "../../../features/subServices";


const feed = [
  {
    "id": "up_fname",
    "title": "Sub Service",
    "hint": "AC Repair",
    "name": "sub_service",
    "type": "text",
  }, 
]

const addServiceSchema = Yup.object().shape({
  sub_service: Yup.string()
  .required("service is required")
  .max(30, "name field should be less then 30 characteres"),
})




const AddSubService = ({update, setUpdate, data, aState}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  let url = null
  const servicesOld = useSelector(state => state.subServiceAction.subservices)

  console.log(servicesOld, "S");
  const handleSubmit = async (values, action) => {
    console.log(values);
    url = "http://localhost:8000/urban-company/subservice/"
    try{
      const response = await axios.post(url, values, {headers: {Authorization: `Bearer ${localStorage.getItem("access")}`}});
      alert("service added successfully!")
      console.log([...servicesOld, addSubService(response.data)])
      dispatch([...servicesOld, addSubService(response.data)])
      // navigate("/")
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
    <Heading1 name={"Add Sub Service"} />
    <Formik 
      initialValues={{
        service_type: "",
        sub_service: "",
      }}
      validationSchema={addServiceSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, handleSubmit, errors }) => (
      <Form>
      <Field as="select"  name="service_type">
        {servicesMap}
      </Field>
      {serviceSubForm}
      <Button name={"Add"} type={"submit"} />
      <Button name={"Back"} type={"button"} handleAction={()=>{navigate("/")}} />
      </Form> )}
    </Formik>
    </div>
  )
}



 

export default AddSubService