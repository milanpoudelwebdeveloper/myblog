import React, { useContext, useMemo, useState } from 'react'
import { Box, Button, Divider, Flex, FormControl, FormLabel, Image, Input, Text, Select as ChakraSelect } from '@chakra-ui/react'
import MainLayout from '@components/Admin/Common/MainLayout'
import { getCategories } from '@/src/services/category'
import { useCustomToast } from '@/src/hooks/useCustomToast'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.core.css'
import 'react-quill/dist/quill.snow.css'
import { Select } from 'chakra-react-select'
import { addBlog, uploadBlogImage } from '@/src/services/blog'
import hljs from 'highlight.js'
import ImageUploader from '@components/Admin/Common/ImageUploaderComponent'
import { useRouter } from 'next/router'
import { Controller, FieldValues, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { blogSchema } from '@/src/validations/blogValidations'
import ErrorText from '@components/Common/ErrorText'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { AuthContext } from '@/src/context/authContext'

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block', 'color', 'background'],

  [{ list: 'ordered' }, { list: 'bullet' }],
  ['link'],
  [{ indent: '-1' }, { indent: '+1' }],

  [{ header: [1, 2, 3, false] }],

  [{ align: [] }],
  ['clean'],
  ['image']
]

hljs.configure({
  languages: ['javascript', 'HTML', 'css']
})

const AddBlog = () => {
  const [coverImage, setCoverImage] = useState<File | null | string>(null)
  const { user } = useContext(AuthContext)
  const router = useRouter()
  const client = useQueryClient()
  const { showToast } = useCustomToast()
  const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), [])

  const { data: categories } = useQuery({
    queryKey: ['getPopularPosts'],
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
      categories: [],
      featured: 'false'
    }
  })

  function imageHandler(this: any) {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.setAttribute('multiple', 'false')
    input.click()
    input.onchange = async function (this: any) {
      if (!input.files) return
      const file = input.files[0]
      const res = await uploadBlogImage(file)
      const range = this.quill.getSelection()
      const link = res?.imageUrl
      this.quill.insertEmbed(range.index, 'image', link)
    }.bind(this)
    input.value = ''
  }

  const modules = useMemo(
    () => ({
      syntax: {
        highlight: (text: string) => hljs.highlightAuto(text).value
      },
      toolbar: {
        container: toolbarOptions,
        clipboard: {
          matchVisual: false
        },
        handlers: {
          image: imageHandler
        }
      }
    }),
    []
  )

  const submitHandler = async (data: FieldValues, published: boolean) => {
    if (!user) {
      return showToast('Please login to add blog', 'error')
    }
    if (!coverImage) {
      return showToast('Please add cover image', 'error')
    }
    const categories = data?.categories?.map((category: { label: string; value: string }) => category.value)
    try {
      const values = { ...data, categories, published, coverImage, writtenBy: user?.id } as IAddBlog
      const response = await addBlog(values)
      if (response) {
        showToast(response?.message, 'success')
        if (!published) {
          router.push(`/admin/blogs/${response?.blog?.id}`)
        } else {
          router.push('/admin/blogs')
        }
        client.invalidateQueries({ queryKey: ['getRecentBlogsAdmin', 'getBlogsListAdmin'] })
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
              Add Blog
            </Text>
            <Divider mt={3} borderColor="#1814F3" w={10} borderWidth={2} />
          </Box>

          <Flex gap={5}>
            <Button bg="#4880FF" color="white" fontWeight="normal" onClick={handleSubmit((data) => submitHandler(data, false))}>
              Save As Draft
            </Button>
            <Button bg="#4880FF" color="white" fontWeight="normal" onClick={handleSubmit((data) => submitHandler(data, true))}>
              Publish
            </Button>
          </Flex>
        </Flex>
        <form>
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
                <FormControl mx="auto">
                  <FormLabel color="#232323" fontSize="md" mb={3}>
                    Featured?
                  </FormLabel>
                  <ChakraSelect
                    borderColor="#DFEAF2"
                    borderRadius={12}
                    bg="#F5F6FA"
                    _placeholder={{ color: '#718EBF' }}
                    placeholder="Enter featured status"
                    {...register('featured')}
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </ChakraSelect>
                  {errors?.featured && <ErrorText message={errors?.featured?.message} />}
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
                  />
                )}
              />
              {errors?.content && <ErrorText message={errors?.content?.message} />}
            </Box>
          </Box>
        </form>
      </Box>
    </MainLayout>
  )
}

export default AddBlog
