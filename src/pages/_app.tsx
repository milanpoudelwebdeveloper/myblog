import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '@/theme'

import '@fontsource/poppins/400.css'
import '@fontsource/poppins/500.css'
import '@fontsource/poppins/600.css'
import '@fontsource/poppins/700.css'
import { AuthProvider } from '../context/authContext'
import AuthChecker from '@components/Common/AuthChecker'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <AuthChecker />
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  )
}
