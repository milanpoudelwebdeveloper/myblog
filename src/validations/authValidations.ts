import * as yup from 'yup'

export const nameSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required('Please write your full name')
    .min(3, 'Name must be at least 3 characters long')
    .max(50, 'Name must be at most 50 characters long')
    .matches(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/, 'Please enter a valid name')
})

export const emailSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required('Please write your email address')
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Please provide valid email address')
})

export const passwordSchema = yup.object().shape({
  password: yup
    .string()
    .trim()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(
      /^(?=.*[A-Z])(?=.*[@#$%^&+=])(?!.*\s).{8,}$/,
      'Password must contain at least one uppercase, one lowercase, one number and one special character'
    )
})

export const oldPasswordSchema = yup.object().shape({
  oldPassword: yup.string().trim().required('Old password is required')
})

export const confirmPasswordSchema = yup.object().shape({
  confirmPassword: yup
    .string()
    .trim()
    .oneOf([yup.ref('password'), undefined], 'Passwords must match')
    .required('Please confirm your password')
})

export const countrySchema = yup.object().shape({
  country: yup.string().required('Country is required')
})

export const subjectSchema = yup.object().shape({
  subject: yup.string().required('Please select a subject')
})

export const messageSchema = yup.object().shape({
  message: yup.string().required('Please provide your message').min(10, 'Message must be at least 10 characters long')
})

export const signUpSchema = yup.object().shape({
  ...emailSchema.fields,
  ...nameSchema.fields,
  ...passwordSchema.fields,
  ...confirmPasswordSchema.fields,
  ...countrySchema.fields
})

export const loginSchema = yup.object().shape({
  ...emailSchema.fields,
  ...passwordSchema.fields
})

export const createPasswordSchema = yup.object().shape({
  ...passwordSchema.fields,
  ...confirmPasswordSchema.fields
})

export const resetPasswordSchema = yup.object().shape({
  ...oldPasswordSchema.fields,
  ...passwordSchema.fields,
  ...confirmPasswordSchema.fields
})

export const editProfileSchema = yup.object().shape({
  ...nameSchema.fields,
  ...countrySchema.fields
})

export const contactSchema = yup.object().shape({
  ...nameSchema.fields,
  ...emailSchema.fields,
  ...subjectSchema.fields,
  ...messageSchema.fields
})

export const changePasswordSchema = yup.object().shape({
  ...oldPasswordSchema.fields,
  ...passwordSchema.fields,
  ...confirmPasswordSchema.fields
})
