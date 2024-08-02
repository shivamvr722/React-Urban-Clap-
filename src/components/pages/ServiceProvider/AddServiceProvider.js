import { useNavigate } from "react-router-dom"
import providerFeed from "./providerFeed"
import { useDispatch, useSelector } from "react-redux"
import usePostData from "../../../Networks/usePostData"
import * as Yup from "yup";
import { addSubService } from "../../../features/subServices";
import InputField from "../../subcomponents/FormComponets/FormInput";
import Heading1 from "../../subcomponents/HeadingCoponets/Heading1";
import { Field, Form, Formik, useFormikContext } from "formik";
import { useEffect, useState } from "react";
import Button from "../../subcomponents/FormComponets/Button";
import useFetchData from "../../../Networks/useFetchData";
import "./serviceprovider.css"



const addServiceSchema = Yup.object().shape({
  service_description: Yup.string()
  .required("service desctiption is required")
  // sub_service: Yup.string()
  // .required("service is required")
  // .max(30, "name field should be less then 30 characteres"),
})





const AddProviderServices = () => {
  const currentUser = useSelector((state) => state.userProfileActions.user)
  const cUser = currentUser.user_type;

  const { dataFetch } = useFetchData();
  // const {setFieldValue} = useFormikContext();
  const [serviceDp, setServiceDp] = useState("")
  const [filtedSubServices, setFiltedSubServices] = useState("")
  const [statesDp, setStatesDp] = useState("")
  const [filtredCities, setFiltredCities] = useState("")
  const {isLoading, postData} = usePostData()
  const [cities, setCities] = useState("")


  const handleSubmit = async (values, action) => {
    const formData = new FormData()
    formData.append('service_type', values.service_type);
    formData.append('sub_service_type', values.sub_service_type);
    formData.append('state_id', values.state_id);
    formData.append('user', values.user);
    formData.append('city_id', values.city_id);
    formData.append('service_charges', values.service_charges);
    formData.append('service_description', values.service_description);
    formData.append('service_duration', values.service_duration);
    formData.append('service_image', values.service_image);
    formData.append('document_file', values.document_file);

    
    const response = await postData("services", formData);
    console.log(response.data)
    console.log(formData, "Thgis is the values");
    if(response?.data?.id){
      action.resetForm()
    }
    // alert("data added successfully!")
    
  }


  const servicesData = useSelector(state => state.servicesActions.services)
  const subServicesData = useSelector(state => state.subServiceAction.subservices)
  const stateData = useSelector(state => state.stateAction.states)

  let servicesMap = ""
  if (servicesData?.length > 0){
    servicesMap = servicesData?.map((service, i) => {
      return <option key={service.id} value={service.id}>{service.service_type}</option>
    })  
  }


  let subServicesMap = ""
  const subServicesShowFilter = (serviceId, setFieldValue) => {
    setFieldValue("service_type", serviceId)
    setServiceDp(serviceId)
    setFiltedSubServices(subServicesData?.filter((data, i) =>  `${data.service_type}` === `${serviceId}`))
  }
  

  let stateMap = ""
  if (stateData?.length > 0){
    stateMap = stateData?.map((obj, i) => {
      return <option key={obj.id} value={obj.id}>{obj.state}</option>
    })  
  }


  const fetchCities = async () => {
    const apiData = await dataFetch('city')
    if (apiData?.success) {
      setCities(apiData?.data)
    }
  }

  useEffect(
    () => { fetchCities() },
  [])

  
  let citiesMapped = ""
  const citiesShowFilter = (stateId, setFieldValue) => {
    setStatesDp(stateId)
    setFieldValue('state_id',stateId)
    setFiltredCities(cities?.filter((data, i) =>  `${data.state_id}` === `${stateId}`))
  }


  if (filtredCities?.length > 0){
    citiesMapped = filtredCities?.map((obj, i) => {
      return <option key={obj.id} value={obj.id}>{obj.city}</option>
    })  
  }

  if (filtedSubServices?.length > 0){
    subServicesMap = filtedSubServices?.map((obj, i) => {
      return <option key={obj.id} value={obj.id}>{obj.sub_service}</option>
    })  
  }


  const serviceSubForm = providerFeed?.map((obj, i) => {
    if(cUser === "serviceprovider" && obj.id === "user"){
      obj = {...obj, hidden : true, value: currentUser.id}
      return (<InputField obj={obj} key={obj.id} />)
    }
    return (
      <InputField obj={obj} key={obj.id} />
    )
  })
  

  return(
    <div className="addservicecontainer">
    <Heading1 name={"Service Povider"} />
    <Formik 
      enableReinitialize
      initialValues={{
        service_type: "",
        sub_service_type: "",
        state_id: "",
        user:"",
        city_id: "",
        service_description: "",
        service_duration:"",
        service_charges: "",
        service_image: "",
        document_file: ""
      }}
      validationSchema={addServiceSchema}
      onSubmit={handleSubmit}
      >
      {({ setFieldValue }) => (
      <Form encType="multipart/form-data" method="POST">
      <Field as="select"  name="service_type" className="selectbox" value={serviceDp}  onChange={(e) => {subServicesShowFilter(e.target.value, setFieldValue)}}>
        <option>select services</option>
        {servicesMap}
      </Field>

      <Field as="select"  name="sub_service_type" className="selectbox">
        <option>select subservices</option>
        {subServicesMap}
      </Field>

      <Field as="select"  name="state_id" className="selectbox" value={statesDp} onChange={(e) => {citiesShowFilter(e.target.value, setFieldValue)}}>
        <option>select state</option>
        {stateMap}
      </Field>

      <Field as="select"  name="city_id" className="selectbox" >
        <option>select cities</option>
        {citiesMapped}
      </Field>
      
      {serviceSubForm}
      
      <div className="lableinput">
      {/* <div className="fieldcontainer"> */}
        <label htmlFor="service_image">Service&nbsp;Image</label>
        <input type="file" name="service_image" id="service_image" accept="image/png, image/jpeg, image/jpg" onChange={ e => setFieldValue("service_image", e.target.files[0])} />
      {/* </div> */}
      </div>
      <div className="lableinput">
        <label htmlFor="document_file">Document&nbsp;Image</label>
        <input type="file" name="document_file" id="document_file" accept="image/png, image/jpeg, image/jpg" onChange={ e => setFieldValue("document_file", e.target.files[0])} />
      </div>
      <div>
      <Button name={"Submit"} type={"submit"} />
      <Button name={"Back"} type={"button"} />
      </div>
      </Form> )}
    </Formik>
    </div>
  )
}



 

export default AddProviderServices