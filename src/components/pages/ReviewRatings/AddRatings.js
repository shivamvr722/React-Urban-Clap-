import { useEffect, useState } from "react"
import Button from "../../subcomponents/FormComponets/Button"
import InputField from "../../subcomponents/FormComponets/FormInput"
import Heading1 from "../../subcomponents/HeadingCoponets/Heading1"
import { Formik, Form, Field } from 'formik';
import ShowError from "../../subcomponents/FormComponets/ShowError";
import useFetchData from "../../../Networks/useFetchData";
import usePostData from "../../../Networks/usePostData";



const reviewFeed = [
  {
    "id": "rating_book",
    "title": "Ratings",
    "hint": "Rating from 1 to 5",
    "name": "ratings",
    "type": "number",
  }
]

const AddRating = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const {isLoading, dataFetch}  = useFetchData()
  const {postData} = usePostData()
  const [bookings, setBookings] = useState("");
  const [filteredBookings, setfilteredBookings] = useState("")

  const handleSubmit = async (values, action) => {
    const URL = "rating"
    const response = await postData(URL, values);
    console.log(response.data);
    if(response?.data?.id){
      alert(response.data)
      action.resetForm()
    }
  }

  const fetchBookings = async () => {
    let URL = "bookings"
    const apiData = await dataFetch(URL)
    if (apiData?.success) {
      setBookings(apiData?.data.results)
    }
  }
  
  useEffect(
    () => { 
      fetchBookings();
    }, 
  [filteredBookings])
  
  let mappedOptions = ""
  if(bookings?.length){
    mappedOptions = bookings?.map((obj, i)=>{
      return <option value={obj.id} key={obj.id}>{obj.getService} from {obj.getProvider}</option>
    })
  }

  const mappedFileds = reviewFeed.map((obj, i)=>{
    return <InputField obj={obj} key={obj.id}/>
  })

  return (
    <div className="container">
    <Formik 
      initialValues={{
        ratings: "",
        booking: ""
      }}
      // validationSchema={singInValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, handleSubmit, errors }) => (
      <Form  onSubmit={handleSubmit} method="post">
        <Heading1 name="Add Ratings"/>
        <Field as="select" name="booking" className="selectbox">
          {mappedOptions}
        </Field>
        {mappedFileds}
        <Button name={"Add Ratings"} type={"submit"} />
        {/* <Button name={"Home"} type={"button"} handleAction={()=>{navigate("/")}} /> */}
        <ShowError errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
      </Form>
      )}
    </Formik>
    </div>
  )
}


export default AddRating