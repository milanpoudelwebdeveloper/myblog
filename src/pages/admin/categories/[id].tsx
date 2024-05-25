import { useCustomToast } from '@/src/hooks/useCustomToast'
import { deleteCategory, editCategory, getCategoryDetails } from '@/src/services/category'
import { Box, Button, Center, Divider, FormControl, FormLabel, Image, Input, Text, useDisclosure } from '@chakra-ui/react'
import DeleteModal from '@components/Admin/Common/DeleteModal'
import ImageUploader from '@components/Admin/Common/ImageUploaderComponent'
import MainLayout from '@components/Admin/Common/MainLayout'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const CategoryDetails = () => {
  const [name, setName] = React.useState('')
  const [image, setImage] = React.useState<File | null | string>()
  let imageUrl = ''
  const router = useRouter()
  const { id } = router.query
  const { showToast } = useCustomToast()
  const { isOpen, onClose, onOpen } = useDisclosure()

  const { data: categoryDetails } = useQuery({
    queryKey: ['category', id],
    queryFn: () => getCategoryDetails(id as string)
  })

  useEffect(() => {
    setName(categoryDetails?.name)
    setImage(categoryDetails?.image)
  }, [categoryDetails])

  const editHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    editCategory(id as string, name, image as File)
      .then((res) => showToast(res, 'success'))
      .catch((error) => showToast(error, 'error'))
  }

  if (image && typeof image !== 'string') {
    imageUrl = URL.createObjectURL(image) as string
  } else {
    imageUrl = image as string
  }

  const deleteHandler = () => {
    deleteCategory(id as string)
      .then((res) => {
        showToast(res, 'success')
        router.push('/admin/categories')
      })
      .catch((error) => showToast(error, 'error'))
  }

  return (
    <MainLayout>
      <Box>
        <Text fontSize="lg" fontWeight="500" textAlign="center" color="#1814F3">
          Category Details
        </Text>
        <Divider mt={3} borderColor="#1814F3" w={10} borderWidth={2} mx="auto" />
        <Box mt={7} bg="white" pt={10} pb={16} borderRadius={14}>
          <form
            onSubmit={editHandler}
            style={{
              width: '100%'
            }}
          >
            <Box alignItems="center" px={20} gap={20} mx="auto">
              <Box mb={10}>
                {imageUrl || image ? (
                  <Center flexDirection="column" gap={3}>
                    <Image borderRadius="full" w={20} h={20} src={imageUrl} alt="placeholder" />
                    <Button onClick={() => setImage('')} fontWeight="normal">
                      Delete Photo
                    </Button>
                  </Center>
                ) : (
                  <ImageUploader setCoverImage={setImage} />
                )}
              </Box>
              <FormControl maxW={400} mx="auto" mb={10}>
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
              <Center>
                <Box>
                  <Button bg="#4880FF" color="white" fontWeight="normal" type="submit">
                    Update
                  </Button>
                  <Button bg="red.500" color="white" fontWeight="normal" ml={4} onClick={onOpen}>
                    Delete
                  </Button>
                </Box>
              </Center>
            </Box>
          </form>
          <DeleteModal isOpen={isOpen} onClose={onClose} action={deleteHandler} />
        </Box>
      </Box>
    </MainLayout>
  )
}

export default CategoryDetails
