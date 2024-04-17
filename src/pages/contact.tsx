import MainLayout from '@components/Common/MainLayout'
import { Box, Button, Flex, FormControl, FormLabel, Input, Select, Text, Textarea } from '@chakra-ui/react'
import React from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { contactSchema } from '../validations/authValidations'
import ErrorText from '@components/Common/ErrorText'
import HeadingSeo from '@components/Common/HeadingSeo'
import { CONTACT } from '@constants/routes'
import { sendMessage } from '../services/messages'
import { useCustomToast } from '../hooks/useCustomToast'

const Contact = () => {
  const subjects = ['General Inquiry', 'Feedback', 'About work', 'About writing', 'Others']
  const { showToast } = useCustomToast()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(contactSchema)
  })

  const onSubmit = (data: FieldValues) => {
    sendMessage(data as IContact)
      .then((message) => showToast(message, 'success'))
      .catch((err) => showToast(err, 'error'))
  }

  return (
    <>
      <HeadingSeo
        link={`https://codewithmilan.com/${CONTACT}`}
        title="Contact | Code With Milan"
        description="Contact us for any kind of inquiry, feedback or any other work"
      />
      <MainLayout>
        <Box>
          <Text fontSize="40px" fontWeight="700" letterSpacing="2px" mt={3} as="h1">
            Contact Us
          </Text>
          <Text fontSize="md" mt={4} mb={7} as="h2">
            Please feel out valid contact information
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
                {subjects?.map((subject) => (
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
            <Button
              isLoading={isSubmitting}
              loadingText="Sending..."
              type="submit"
              mt={8}
              bg="#6941C6"
              color="white"
              fontSize={{ md: 'sm', xl: 'md' }}
              fontWeight="normal"
            >
              Send Message
            </Button>
          </form>
        </Box>
      </MainLayout>
    </>
  )
}

export default Contact
