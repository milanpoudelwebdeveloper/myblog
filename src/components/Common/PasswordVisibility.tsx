import { Button } from '@chakra-ui/react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

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
        <AiFillEye color="gray" size={20} onClick={toggleVisibility} />
      ) : (
        <AiFillEyeInvisible color="gray" size={20} onClick={toggleVisibility} />
      )}
    </Button>
  )
}

export default PasswordVisibilty
