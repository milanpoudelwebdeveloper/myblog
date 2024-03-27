import * as yup from 'yup'

export const nameSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required('Full name is required')
    .matches(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/, 'Please enter a valid name')
})

export const emailSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required('Email is required')
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Invalid email address')
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
  ...emailSchema.fields,
  ...nameSchema.fields,
  ...countrySchema.fields
})
