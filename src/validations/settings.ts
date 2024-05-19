import * as yup from 'yup'
import { countrySchema, emailSchema, nameSchema } from './authValidations'

export const genderSchema = yup.object().shape({
  gender: yup.string().required('Please select a gender')
})

export const bioSchema = yup.object().shape({
  bio: yup.string().trim().required('Please write your bio').min(40, 'Bio must be at least 40 characters long')
})

export const settingsSchema = yup.object().shape({
  ...nameSchema.fields,
  ...emailSchema.fields,
  ...countrySchema.fields,
  ...genderSchema.fields,
  ...bioSchema.fields
})
