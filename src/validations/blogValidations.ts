import * as yup from 'yup'

export const titleSchema = yup.object().shape({
  title: yup.string().trim().required('Title is required')
})
export const categories = yup.object().shape({
  categories: yup
    .array()
    .min(1, 'At least one category is required')
    .of(
      yup.object().shape({
        label: yup.string().required(),
        value: yup.string().required()
      })
    )
})

export const contentSchema = yup.object().shape({
  content: yup.string().trim().required('Content is required').min(10, 'Content is too short')
})

export const featuredSchema = yup.object().shape({
  featured: yup.boolean().required('Featured status is required')
})

export const blogSchema = yup.object().shape({
  ...titleSchema.fields,
  ...contentSchema.fields,
  ...featuredSchema.fields,
  ...categories.fields
})
