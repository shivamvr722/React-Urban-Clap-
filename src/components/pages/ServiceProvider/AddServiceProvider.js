import { useNavigate } from "react-router-dom"
import providerFeed from "./AddProviderFeeds"
import { useDispatch } from "react-redux"
import usePostData from "../../../Networks/usePostData"



const addServiceSchema = Yup.object().shape({
  sub_service: Yup.string()
  .required("service is required")
  .max(30, "name field should be less then 30 characteres"),
})


const AddProviderSchema = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {isLoading, postData} = usePostData()

  const servicesOld = useSelector(state => state.subServiceAction.subservices)

  const handleSubmit = async (values, action) => {
    const response = await postData("services", values);
    if(response?.data){
      dispatch(addSubService([...servicesOld, response.data]))
      alert("data added successfully!")
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

  const serviceSubForm = providerFeed?.map((obj, i) => {
    return (
      <InputField obj={obj} key={obj.id} />
    )
  })
  

  console.log(serviceSubForm);
  return(
    <div className="addservicecontainer">
    <Heading1 name={"Service Povider"} />
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



 

export default AddProviderSchema