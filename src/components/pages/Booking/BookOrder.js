import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import Button from "../../subcomponents/FormComponets/Button";
import Heading1 from "../../subcomponents/HeadingCoponets/Heading1";
import usePostData from "../../../Networks/usePostData";
import "./book.css"


const bookingSchema = Yup.object().shape({
  // slotdatetime: Yup.string().datetime(),
  service_address: Yup.string()
  .required("address is required"),
})

const AddOrder = ({data, setIsForm, setOpen}) => {
  const navigate = useNavigate()
  const { isLoading, postData } = usePostData()


  const handleSubmit = async (values, action) => {
    console.log(data, "This is the values ");
    const response = await postData("bookings", {...values,state: data.stateId, city:data.cityId, service:data.providerId})
    if(response.status === 201){
      alert("Order Booked Successfully!")
      setIsForm(false)
      setOpen(false)
      navigate("/")
    } else {
      alert("failed to book order!")
      setIsForm(false)
      setOpen(false)
      navigate("/")
    }
  }



  return(
    <div className="addservicecontainer2">
    <Heading1 name={"Book Service"} />
    <div></div>
    <Formik 
      initialValues={{
        slotdatetime: "",
        service_address: "",
      }}
      validationSchema={bookingSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, handleSubmit, errors }) => (
      <div className="formDiv">
      <Form className="formbook">        
        <div className="fieldsdiv">
          <label htmlFor="timeslot">Time Slot:&nbsp;&nbsp;</label>
          <Field type="datetime-local" id="timeslot" name="slotdatetime" />
        </div>
        
        <div className="fieldsdiv">
          <label htmlFor="service_address">Address:&nbsp;&nbsp;</label>
          <Field as="textarea" className="text-black color: rgb(0 0 0);" name="service_address"  id="service_address" />
        </div>
        <br></br>
        <Button name={"Book"} type={"submit"} />
        <Button name={"Back"} type={"button"} handleAction={()=>{navigate("/")}} />
      </Form>
      </div>
       )}
    </Formik>
    </div>
  )
}



export default AddOrder