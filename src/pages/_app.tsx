import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '@/theme'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from '../context/authContext'
import AuthChecker from '@components/Common/AuthChecker'
import { Poppins } from 'next/font/google'

const poppins = Poppins({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] })

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false
    }
  }
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={poppins.className}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <AuthProvider>
            <AuthChecker />
            <Component {...pageProps} />
          </AuthProvider>
        </ChakraProvider>
      </QueryClientProvider>
    </main>
  )
}
