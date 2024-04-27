import React, { useMemo, useState } from 'react'
import { Box, Button, Divider, Flex, FormControl, FormLabel, Image, Input, Text, useDisclosure } from '@chakra-ui/react'
import MainLayout from '@components/Admin/Common/MainLayout'
import { getCategories } from '@/src/services/category'
import { useCustomToast } from '@/src/hooks/useCustomToast'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.core.css'
import 'react-quill/dist/quill.snow.css'
import { deleteBlog, getBlogDetails, updateBlog } from '@/src/services/blog'
import hljs from 'highlight.js'
import ImageUploader from '@components/Admin/Common/ImageUploaderComponent'
import { useRouter } from 'next/router'
import 'highlight.js/styles/monokai-sublime.css'
import { Controller, FieldValues, useForm } from 'react-hook-form'
import ErrorText from '@components/Common/ErrorText'
import { useQuery } from '@tanstack/react-query'
import { yupResolver } from '@hookform/resolvers/yup'
import { blogSchema } from '@/src/validations/blogValidations'
import { Select } from 'chakra-react-select'

const toolbarOptions = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  ['bold', 'italic', 'underline', 'strike'],
  [{ color: [] }, { background: [] }],
  [{ script: 'sub' }, { script: 'super' }],
  ['blockquote', 'code-block'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ indent: '-1' }, { indent: '+1' }, { align: [] }],
  ['link', 'image']
]
const modules = {
  syntax: {
    highlight: (text: string) => hljs.highlightAuto(text).value
  },
  toolbar: toolbarOptions,
  clipboard: {
    matchVisual: false
  }
}

hljs.configure({
  languages: ['javascript', 'HTML', 'css']
})

const LazyLoadedDeleteModal = dynamic(() => import('@components/Admin/Common/DeleteModal'))

const BlogDetails = ({ blogDetails }: { blogDetails: IBlog }) => {
  const [coverImage, setCoverImage] = useState<File | null | string>(blogDetails?.coverimage || null)

  const { data: categories } = useQuery({
    queryKey: ['getCategoryInDetails'],
    queryFn: getCategories,
    staleTime: Infinity
  })

  const {
    handleSubmit,
    register,
    control,

    formState: { errors }
  } = useForm({
    resolver: yupResolver(blogSchema),
    defaultValues: {
      ...blogDetails,
      categories: blogDetails?.categories
    }
  })

  const { showToast } = useCustomToast()
  const router = useRouter()
  const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), [])
  const { isOpen, onClose, onOpen } = useDisclosure()

  const submitHandler = async (data: FieldValues, published: boolean) => {
    if (!coverImage) {
      return showToast('Please add cover image', 'error')
    }
    const categories = data?.categories?.map((category: { label: string; value: string }) => category.value)
    try {
      const values = { ...data, categories, published, coverImage } as IAddBlog
      const response = await updateBlog(blogDetails?.id, values)
      if (response) {
        showToast(response?.message, 'success')
        if (published) {
          router.push('/admin/blogs')
        }
      }
    } catch (error: any) {
      showToast(error, 'error')
    }
  }

  let imageUrl = ''

  if (coverImage && typeof coverImage !== 'string') {
    imageUrl = URL.createObjectURL(coverImage)
  } else {
    imageUrl = coverImage as string
  }

  const deleteHandler = () => {
    deleteBlog(blogDetails?.id as string)
      .then((res) => {
        showToast(res, 'success')
        router.push('/admin/blogs')
      })
      .catch((error) => showToast(error, 'error'))
  }

  const categoriesFormatted = categories?.map((category: ICategory) => ({
    value: category.id,
    label: category.name
  }))

  return (
    <MainLayout>
      <Box>
        <Flex justifyContent="space-between" alignItems="center">
          <Box>
            <Text fontSize="lg" fontWeight="500" color="#1814F3">
              Edit Blog
            </Text>
            <Divider mt={3} borderColor="#1814F3" w={10} borderWidth={2} />
          </Box>
          <Flex gap={5}>
            <Button bg="red.500" color="white" fontWeight="normal" onClick={onOpen}>
              Delete
            </Button>
            <Button
              bg="#4880FF"
              color="white"
              fontWeight="normal"
              onClick={handleSubmit((data) => submitHandler(data, false))}
              display={blogDetails?.published ? 'none' : 'block'}
            >
              Save (Update Draft)
            </Button>
            <Button bg="#4880FF" color="white" fontWeight="normal" onClick={handleSubmit((data) => submitHandler(data, true))}>
              {blogDetails?.published ? 'Update' : 'Publish'}
            </Button>
          </Flex>
        </Flex>
        <Box mt={7} bg="white" pt={10} pb={16} borderRadius={14}>
          <Box px={20} gap={16} mx="auto">
            <Box>
              {imageUrl ? (
                <Image borderRadius="full" w={20} h={20} src={imageUrl} alt="placeholder" mx="auto" />
              ) : (
                <ImageUploader setCoverImage={setCoverImage} />
              )}
            </Box>
            <Flex my={10} alignItems="center" gap={20}>
              <FormControl mx="auto">
                <FormLabel color="#232323" fontSize="md" mb={3}>
                  Title
                </FormLabel>
                <Input
                  type="text"
                  borderColor="#DFEAF2"
                  borderRadius={12}
                  bg="#F5F6FA"
                  _placeholder={{ color: '#718EBF' }}
                  placeholder="Enter title"
                  {...register('title')}
                />
                {errors?.title && <ErrorText message={errors?.title?.message} />}
              </FormControl>
              <FormControl>
                <FormLabel color="#232323" fontSize="md" mb={3}>
                  Category
                </FormLabel>
                <Controller
                  control={control}
                  name="categories"
                  render={({ field: { onChange, value, name, ref } }) => (
                    <Select
                      ref={ref}
                      isMulti
                      size="sm"
                      colorScheme="purple"
                      options={categoriesFormatted}
                      placeholder="Select Category (mutiple)"
                      selectedOptionColorScheme="blue"
                      onChange={onChange}
                      value={value}
                      name={name}
                      instanceId="categories"
                    />
                  )}
                />
                {errors?.categories && <ErrorText message={errors?.categories?.message} />}
              </FormControl>
            </Flex>
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <ReactQuill
                  id="content"
                  theme="snow"
                  modules={modules}
                  placeholder="Write Content Here"
                  onChange={(text) => {
                    field.onChange(text)
                  }}
                  className="react-quill"
                  value={field?.value as string}
                />
              )}
            />
            {errors?.content && <ErrorText message={errors?.content?.message} />}
          </Box>
        </Box>
      </Box>
      <LazyLoadedDeleteModal type="blog" isOpen={isOpen} onClose={onClose} action={deleteHandler} />
    </MainLayout>
  )
}

export default BlogDetails

export async function getServerSideProps(context: any) {
  const { id } = context.params
  try {
    const blogDetails = await getBlogDetails(id)

    if (blogDetails) {
      return {
        props: {
          blogDetails
        }
      }
    } else {
      return {
        props: {
          blogDetails: []
        }
      }
    }
  } catch (error) {
    return {
      props: {
        blogDetails: []
      }
    }
  }
}
