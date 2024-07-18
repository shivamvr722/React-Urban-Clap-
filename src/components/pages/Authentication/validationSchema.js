import * as Yup from "yup";

export const singUpValidationSchema = Yup.object().shape({
    username: Yup.string()
    .required("Username is required")
    .max(30, "name field should be less then 30 characteres"),

    first_name: Yup.string()
    .required("first name is required")
    .max(30, "name field should be less then 30 characteres"),

    last_name: Yup.string()
    .required("last name is required")
    .max(30, "name field should be less then 30 characteres"),

    email: Yup.string().email()
    .required("Email is required")
    .max(320, "email field should be less then 320 characteres")
    .min(3, "email should be more then 3 characters "),
    
    password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
    
    password2: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
  })


export const singInValidationSchema = Yup.object().shape({
  username: Yup.string()
  .required("Username is required")
  .max(30, "username field should be less then 30 characters"),

  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
})


export const forgetPasswordSchema = Yup.object().shape({
  email: Yup.string().email()
  .required("Email is required")
  .max(320, "email field should be less then 320 characteres")
  .min(3, "email should be more then 3 characters "),
})


export const confirmPasswordSchema = Yup.object().shape({
  new_password: Yup.string()
  .required("Password is required")
  .min(6, "Password Must at le least 6 character"),
  confirm_password: Yup.string()
  .required('Confirm Password is required')
  .oneOf([Yup.ref('new_password')], 'Passwords must match'),
})