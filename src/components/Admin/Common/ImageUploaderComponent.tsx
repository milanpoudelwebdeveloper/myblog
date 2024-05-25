import { Center, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'

interface ImageUploaderProps {
  setCoverImage: React.Dispatch<React.SetStateAction<File | string | null | undefined>>
}

const ImageUploaderComponent = ({ setCoverImage }: ImageUploaderProps) => {
  const fileInput = React.createRef<HTMLInputElement>()
  const handleOndragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const handleOndrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    let imageFile = event.dataTransfer.files[0]
    setCoverImage(imageFile)
  }

  return (
    <Center>
      <Flex
        onDragOver={handleOndragOver}
        onDrop={handleOndrop}
        onClick={() => fileInput?.current?.click()}
        direction="column"
        align="center"
      >
        <Image src="/images/uploadphoto.png" alt="file-upload" w={20} h="auto" />
        <Flex gap={1} fontSize="sm" cursor="pointer" color="#4379EE">
          <Text>Click to upload</Text>
          <Text>or drag and drop cover photo</Text>
          <input
            type="file"
            accept="image/*"
            ref={fileInput}
            hidden
            multiple={false}
            onChange={(e) => {
              if (!e.target.files) return
              setCoverImage(e?.target?.files[0])
            }}
          />
        </Flex>
      </Flex>
    </Center>
  )
}

export default ImageUploaderComponent
