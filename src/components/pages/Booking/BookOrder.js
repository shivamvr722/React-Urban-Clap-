import axios from "axios";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import InputField from "../../subcomponents/FormComponets/FormInput";
import Button from "../../subcomponents/FormComponets/Button";
import Heading1 from "../../subcomponents/HeadingCoponets/Heading1";  
import { useEffect, useState } from "react";
import useFetchData from "../../../Networks/useFetchData";
import "./book.css"


const bookingSchema = Yup.object().shape({
  // slotdatetime: Yup.string().datetime(),
  service_address: Yup.string()
  .required("address is required"),
})

const AddOrder = ({data}) => { 
  alert("hey", data.stateId, data.cityId, data.serviceId)
  const navigate = useNavigate()
  const { isLoading, dataFetch } = useFetchData()
  // const [cities, setCities] = useState("")
  let url = null

  // const fetchCities = async () => {
  //   const apiData = await dataFetch('city')
  //   if (apiData?.success) {
  //     setCities(apiData?.data)
  //   } else if (!apiData?.success){
  //     navigate("/authredirect") 
  //   }
  // }


  // useEffect( ()=> {fetchCities()}, [])

  const handleSubmit = async (values, action) => {
    alert(values, ":eh")
    console.log(values);
  }



  return(
    <div className="addservicecontainer2">
    <Heading1 name={"Book Service"} />
    <Formik 
      initialValues={{
        slotdatetime: "",
        service_address: "",
      }}
      validationSchema={bookingSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, handleSubmit, errors }) => (
      <Form className="formbook">
        <Field type="text" id="timeslot" name="state"  value={data.stateId}/>
        <Field type="text" id="timeslot" name="city"  value={data.cityId}/>
        <Field type="text" id="timeslot" name="service"  value={data.serviceId}/>

        <label htmlFor="timeslot">Time Slot:&nbsp;&nbsp;</label>
        <Field type="datetime-local" id="timeslot" name="slotdatetime" />
        <br/>
        <label htmlFor="service_address">Address:&nbsp;&nbsp;</label>
        <Field as="textarea" name="service_address"  id="service_address" />
        <br></br>
        <Button name={"Book"} type={"submit"} />
        <Button name={"Back"} type={"button"} handleAction={()=>{navigate("/")}} />
      </Form> )}
    </Formik>
    </div>
  )
}



export default AddOrder