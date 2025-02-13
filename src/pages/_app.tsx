import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import theme from '@/theme'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from '../context/authContext'
import AuthChecker from '@components/Common/AuthChecker'
import { Manrope, Inter } from 'next/font/google'
import dynamic from 'next/dynamic'

const manrope = Manrope({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] })
export const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] })
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false
    }
  }
})
const ChakraProvider = dynamic(() => import('@chakra-ui/react').then((mod) => mod.ChakraProvider))

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={manrope.className}>
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
