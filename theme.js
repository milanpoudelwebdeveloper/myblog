import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const theme = extendTheme({
  breakpoints: {
    '1xl': '1440px'
  },
  styles: {
    global: (props) => ({
      body: {
        bg: mode('white', '#141414')(props),
        color: mode('black', 'white')(props)
      }
    })
  }
})

export default theme
