import '@/styles/globals.css'
import {SessionProvider} from "next-auth/react";

import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function App({ Component, pageProps: { session, ...pageProps }}) {
  return (
      <SessionProvider session={session}>
          <QueryClientProvider client={queryClient}>
              <Component {...pageProps} />
          </QueryClientProvider>
      </SessionProvider>
  )
}
