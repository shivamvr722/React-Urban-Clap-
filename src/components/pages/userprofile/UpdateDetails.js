import { Formik, Form, Field } from "formik"
import InputField from "../../subcomponents/FormComponets/FormInput"
import * as Yup from "yup";
import Button from "../../subcomponents/FormComponets/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../../features/usersSlice";

const feed = [
  {
    "id": "up_fname",
    "title": "FirstName",
    "hint": "First Name",
    "name": "first_name",
    "type": "text",
  }, 
  {
    "id": "up_lname",
    "title": "LastName",
    "hint": "Last Name",
    "name": "last_name",
    "type": "text",
  },
  {
    "id": "up_email",
    "title": "Email",
    "hint": "Email",
    "name": "email",
    "type": "email",
  },
  {
    "id": "up_contanct",
    "title": "Contact",
    "hint": "Phone no",
    "name": "contact_number",
    "type": "phone"
  },
  // {
  //   "id": "up_usertype",
  //   "title": "User Type",
  //   "hint": "Phone no",
  //   "name": "user_type",
  //   "type": "phone"
  // }
]

const updateProfileValidationSchema = Yup.object().shape({
  first_name: Yup.string()
  .required("first name is required")
  .max(30, "name field should be less then 30 characteres"),

  last_name: Yup.string()
  .required("last name is required")
  .max(30, "name field should be less then 30 characteres"),

  email: Yup.string()
  .required("Email is required")
  .max(320, "email field should be less then 320 characteres")
  .min(3, "email should be more then 3 characters "),

  contact_number: Yup.string()
  .required("Contact Number is required")
  .max(15, "Contact field should be less then 15 characteres")
  .min(5, "Contact field should be more then 5 characters "),


  // user_type: Yup.string()
  // .required("User Type is required")
  // .max(10, "User Type should be less then 10 characteres")
  // .min(4, "Contact field should be more then 4 characters"),
})


// http://127.0.0.1:8000/urban-company/profileimage/ (to add user profile pic)

const UpdateDetails = ({update, setUpdate, data, aState}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let url = null
  
  const handleSubmit = async (values, action) => {
    if(aState){
      url = `${process.env.REACT_APP_API_BASE_URL}userprofiles/${values.id}/`
    } else {
      url = `${process.env.REACT_APP_API_BASE_URL}userprofile/${values.id}/`
    }
    try{
      const response = await axios.put(url, values, {headers: {Authorization: `Bearer ${localStorage.getItem("access")}`}});
      console.log(aState, "astate", response.data);
      dispatch(addUser(response.data))
      setUpdate(prev => !prev)
      if (aState) {
        navigate("/profile", {state: { updatedUser: response.data }})
      } else {
        navigate("/profile")
      }
    } catch (error) {
      console.log("on error");
      console.log(error)
    }
  }

  const updateForm = feed.map((obj, i) => {
    return (
      <InputField obj={obj} key={obj.id} />
    )
  })
  

  console.log(updateForm);
  return(
    <Formik 
      initialValues={{
        id: data?.id,
        first_name: data?.first_name,
        last_name: data?.last_name,
        email: data?.email,
        contact_number: data?.contact_number,
        user_type: data?.user_type,
      }}
      validationSchema={updateProfileValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, handleSubmit, errors }) => (
      <Form>
      {updateForm}
      {/* {currentUser?.user_type.toLowerCase() === "superadmin" 
      &&
      <Field as="select" name='user_type' className="selectbox" disable>
        <option value="user">User</option>
        <option value="SuperAdmin">Super Admin</option>
        <option value="serviceprovider">Service Provider</option>
      </Field> } */}
      <br></br>
      <Button name={"Update"} type={"submit"} />
      <Button name={"Back"} handleAction={(prev)=>{ setUpdate(!prev) }} />
      </Form> )}
    </Formik>
  )
}

export default UpdateDetails