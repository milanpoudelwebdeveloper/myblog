import { extendTheme } from '@chakra-ui/react'
import '@fontsource/poppins'
import { mode } from '@chakra-ui/theme-tools'

const theme = extendTheme({
  breakpoints: {
    '1xl': '1440px'
  },
  fonts: {
    heading: `'Poppins', sans-serif`,
    body: `'Poppins', sans-serif`
  },
  styles: {
    global: (props) => ({
      body: {
        bg: mode('white', '#141414')(props)
      }
    })
  }
})

export default theme
