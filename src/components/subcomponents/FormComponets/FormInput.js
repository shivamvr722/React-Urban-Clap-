import { ErrorMessage, Field } from "formik";
import "./FormInput.css"

const InputField = (props) => {
  return(
    <>
    <div className="lableinput" style={props.obj.hidden && {backgroundColor: "black"}}>
      <label htmlFor={props.obj.name} hidden={props.obj.hidden ? true : false}>{props.obj.title}:&nbsp;&nbsp;</label>
      <Field type={props.obj.type} id={props.obj.name} name={props.obj.name} placeholder={props.obj.title} {...props.obj} />
      {props?.eye} 
    </div>
    <div className="errormessage">
      <ErrorMessage name={props.obj.name} />
    </div>
    </>
  )
}


export default InputField


