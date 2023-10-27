import * as Yup from 'yup'

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const basicSchema = Yup.object().shape({
    username: Yup.string().required(),
    email : Yup.string().email("Please enter a valid email").required(),
    password: Yup
    .string()
    .min(5)
    .matches(passwordRules, {message: "Please create a stronger password"})
    .required(),
    // confirmpassword: Yup.string()
    // .oneOf([Yup.ref('password'), 'null'], 'Passwords must match').required()
})