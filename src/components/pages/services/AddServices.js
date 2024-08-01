import { Formik, Form } from "formik"
import InputField from "../../subcomponents/FormComponets/FormInput"
import * as Yup from "yup";
import Button from "../../subcomponents/FormComponets/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Heading1 from "../../subcomponents/HeadingCoponets/Heading1";
import usePostData from "../../../Networks/usePostData";
import { addService } from "../../../features/services";
// import { addService } from "../../../features/services";


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
  .max(30, "service field should be less then 30 characteres"),
})




const AddService = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {isLoading, postData} = usePostData()
  
  const servicesData = useSelector(state => state.servicesActions.services)
  const handleSubmit = async (values, action) => {
    const response = await postData("service", values);
    if(response.data){
      dispatch(addService([...servicesData, response?.data]))
      alert("data added successfully!")
      action.resetForm()
    } else if (response?.error) {
      console.log(response.error);
      alert("failed")
    }
  }

  const serviceForm = feed?.map((obj, i) => {
    return (
      <InputField obj={obj} key={obj.id} />
    )
  })
  
  
  const services =  useSelector(state => state.servicesActions.services);
  
  console.log(services, "Ser");
  
  // useDispatch(addService([...services, {id: 2, service_type: 'cleaning'}]))
  // console.log(serviceForm);
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