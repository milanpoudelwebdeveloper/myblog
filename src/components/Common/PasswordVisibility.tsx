import { Button } from '@chakra-ui/react'
import dynamic from 'next/dynamic'

const DynamicAiFillEye = dynamic(() => import('react-icons/ai').then((icon) => icon.AiFillEye), {
  ssr: false
})
const DynamicAiFillEyeInvisible = dynamic(() => import('react-icons/ai').then((icon) => icon.AiFillEyeInvisible), {
  ssr: false
})

const PasswordVisibilty = ({
  visibility,
  toggle
}: {
  visibility: boolean
  toggle: React.Dispatch<React.SetStateAction<boolean>>
  top?: number | string | object
}) => {
  const toggleVisibility = () => {
    toggle((prev) => !prev)
  }
  return (
    <Button variant="unstyled" position="absolute" right={-2} top={8} zIndex={50}>
      {visibility ? (
        <DynamicAiFillEye color="gray" size={20} onClick={toggleVisibility} />
      ) : (
        <DynamicAiFillEyeInvisible color="gray" size={20} onClick={toggleVisibility} />
      )}
    </Button>
  )
}

export default PasswordVisibilty
