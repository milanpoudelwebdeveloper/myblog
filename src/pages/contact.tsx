import MainLayout from '@components/Common/MainLayout'
import { Box, Button, Flex, FormControl, FormLabel, Input, Select, Text, Textarea } from '@chakra-ui/react'
import React from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { contactSchema } from '../validations/authValidations'
import ErrorText from '@components/Common/ErrorText'

const Contact = () => {
  const subjects = ['General Inquiry', 'Feedback', 'About work', 'Others']

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(contactSchema)
  })

  const onSubmit = (data: FieldValues) => {
    console.log(data)
  }
  return (
    <MainLayout>
      <Box>
        <Text fontSize="40px" fontWeight="700" letterSpacing="2px" my={7}>
          Contact Us
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex gap={7} mb={7}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input type="text" placeholder="Enter your name" {...register('name')} />
              {errors?.name && <ErrorText message={errors?.name?.message} />}
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="Enter your email" {...register('email')} />
              {errors?.email && <ErrorText message={errors?.email?.message} />}
            </FormControl>
          </Flex>
          <FormControl mb={7}>
            <FormLabel>Subject</FormLabel>
            <Select placeholder="Select subject" {...register('subject')}>
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </Select>
            {errors?.subject && <ErrorText message={errors?.subject?.message} />}
          </FormControl>
          <FormControl>
            <FormLabel>Message</FormLabel>
            <Textarea placeholder="Enter your message" rows={6} {...register('message')} />
            {errors?.message && <ErrorText message={errors?.message?.message} />}
          </FormControl>
          <Button type="submit" mt={8} bg="#6941C6" color="white" fontSize={{ md: 'sm', xl: 'md' }} fontWeight="normal">
            Send Message
          </Button>
        </form>
      </Box>
    </MainLayout>
  )
}

export default Contact
