import '@/styles/globals.css'
import { SessionProvider } from "next-auth/react";
import { SpeedInsights } from "@vercel/speed-insights/next"

import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function App({ Component, pageProps: { session, ...pageProps }}) {
  return (
      <QueryClientProvider client={queryClient}>
          <SessionProvider session={session}>
              <Component {...pageProps} />
          </SessionProvider>
          <SpeedInsights />
      </QueryClientProvider>
  )
}
