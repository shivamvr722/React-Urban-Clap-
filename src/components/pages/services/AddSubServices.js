import axios from "axios";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import InputField from "../../subcomponents/FormComponets/FormInput";
import Button from "../../subcomponents/FormComponets/Button";
import Heading1 from "../../subcomponents/HeadingCoponets/Heading1";
import { addSubService } from "../../../features/subServices";
import usePostData from "../../../Networks/usePostData";

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




const AddSubService = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {isLoading, postData} = usePostData()

  const servicesOld = useSelector(state => state.subServiceAction.subservices)

  const handleSubmit = async (values, action) => {
    const response = await postData("subservice", values);
    if(response?.data){
      dispatch(addSubService([...servicesOld, response.data]))
      alert("data added successfully!")
      action.resetForm()
    } else if (response?.error) {
      console.log(response?.error)
      alert("failed")
    }
  }


  const servicesData = useSelector(state => state.servicesActions.services)

  let servicesMap = ""
  if (servicesData?.length > 0){
    servicesMap = servicesData?.map((service, i) => {
      return <option key={service.id} value={service.id}>{service.service_type}</option>
    })  
  }

  const serviceSubForm = feed?.map((obj, i) => {
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
      <Field as="select"  name="service_type" className="selectbox">
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