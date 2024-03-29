import { useCustomToast } from '@/src/hooks/useCustomToast'
import { addCategory } from '@/src/services/category'
import { Box, Button, Center, Divider, FormControl, FormLabel, Image, Input, Text } from '@chakra-ui/react'
import ImageUploader from '@components/Admin/Common/ImageUploader'
import MainLayout from '@components/Admin/Common/MainLayout'
import React, { useState } from 'react'

const AddCategory = () => {
  const [name, setName] = useState('')
  const [image, setImage] = useState<File | null | string>(null)
  let imageUrl = ''
  const { showToast } = useCustomToast()

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addCategory(name, image as File)
      .then((res) => {
        showToast(res, 'success')
      })
      .catch((error) => {
        showToast(error, 'error')
      })
  }

  if (image && typeof image !== 'string') {
    imageUrl = URL.createObjectURL(image)
  } else {
    imageUrl = image as string
  }

  return (
    <MainLayout>
      <Box>
        <Text fontSize="lg" fontWeight="500" textAlign="center" color="#1814F3">
          Add Category
        </Text>
        <Divider mt={3} borderColor="#1814F3" w={10} borderWidth={2} mx="auto" />
        <Box mt={7} bg="white" pt={10} pb={16} borderRadius={14}>
          <form onSubmit={submitHandler}>
            <Box alignItems="center" px={20} gap={20} mx="auto">
              <Box mb={12}>
                {imageUrl ? (
                  <Image borderRadius="full" w={20} h={20} src={imageUrl} alt="placeholder" mx="auto" />
                ) : (
                  <ImageUploader setCoverImage={setImage} />
                )}
              </Box>
              <FormControl maxW={400} mx="auto">
                <FormLabel color="#232323" fontSize="md">
                  Title
                </FormLabel>
                <Input
                  type="text"
                  borderColor="#DFEAF2"
                  borderRadius={17}
                  bg="#FFF"
                  _placeholder={{ color: '#718EBF' }}
                  placeholder="Enter title"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
              <Center mt={10}>
                <Button bg="#4880FF" color="white" fontWeight="normal" type="submit">
                  Submit
                </Button>
              </Center>
            </Box>
          </form>
        </Box>
      </Box>
    </MainLayout>
  )
}

export default AddCategory
