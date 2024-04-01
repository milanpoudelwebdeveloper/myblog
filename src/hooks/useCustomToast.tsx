import { useToast } from '@chakra-ui/react'

export const useCustomToast = () => {
  const toast = useToast()

  const showToast = (title: string | object | any, status: 'info' | 'warning' | 'success' | 'error' | undefined, description?: string) => {
    let finalTitle = title
    if (typeof finalTitle === 'object') {
      finalTitle = Object.values(title).join('\n')
    }
    toast({
      title: finalTitle,
      description,
      status,
      duration: 3000,
      isClosable: true,
      position: 'top-left'
    })
  }

  return { showToast }
}
