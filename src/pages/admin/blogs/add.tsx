import React, { useEffect, useMemo, useState } from 'react'
import { Box, Button, Divider, Flex, FormControl, FormLabel, Image, Input, Select, Text } from '@chakra-ui/react'
import MainLayout from '@components/Admin/Common/MainLayout'
import { getCategories } from '@/src/services/category'
import { useCustomToast } from '@/src/hooks/useCustomToast'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.core.css'
import 'react-quill/dist/quill.snow.css'

import { addBlog } from '@/src/services/blog'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
import ImageUploader from '@components/Admin/Common/ImageUploader'
import { useRouter } from 'next/router'

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],

  [{ list: 'ordered' }, { list: 'bullet' }],
  ['link'],
  [{ indent: '-1' }, { indent: '+1' }],

  [{ header: [1, 2, 3, false] }],

  [{ align: [] }]
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

const AddBlog = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [coverImage, setCoverImage] = useState<File | null | string>(null)
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  let imageUrl = ''
  const router = useRouter()

  const { showToast } = useCustomToast()
  const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), [])

  useEffect(() => {
    getCategories()
      .then((data) => {
        setCategories(data)
      })
      .catch((error) => {
        showToast(error, 'error')
      })
  }, [])

  const submitHandler = async (published: boolean) => {
    try {
      const response = await addBlog(title, coverImage as File, content, selectedCategory, published)
      if (response) {
        showToast(response?.message, 'success')
        if (!published) {
          router.push(`/admin/blogs/${response?.blog?.id}`)
        } else {
          router.push('/admin/blogs')
        }
      }
    } catch (error: any) {
      showToast(error, 'error')
    }
  }

  if (coverImage && typeof coverImage !== 'string') {
    imageUrl = URL.createObjectURL(coverImage)
  } else {
    imageUrl = coverImage as string
  }

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
            <Button bg="#4880FF" color="white" fontWeight="normal" onClick={() => submitHandler(false)}>
              Save As Draft
            </Button>
            <Button
              bg="#4880FF"
              color="white"
              fontWeight="normal"
              onClick={() => {
                submitHandler(true)
              }}
            >
              Publish
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
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel color="#232323" fontSize="md" mb={3}>
                  Category
                </FormLabel>
                <Select onChange={(e) => setSelectedCategory(e.target.value)} placeholder="Select Category" borderRadius={12} bg="#F5F6FA">
                  {categories.map((category: any, index: number) => (
                    <option key={index} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Flex>
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              modules={modules}
              style={{
                height: '250px'
              }}
            />
          </Box>
        </Box>
      </Box>
    </MainLayout>
  )
}

export default AddBlog
