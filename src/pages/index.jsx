import Head from 'next/head'
import Header from "@/components/pageWraper/header";
import Main from "@/components/pageWraper/main";
import Footer from "@/components/pageWraper/footer";
import About from "@/components/about";
import {useSession} from "next-auth/react";
import {useRouter} from "next/router";
export default function Welcome() {
  const {status} = useSession()
  const router = useRouter()

  if (status === "authenticated") {
    router.push("/home")
  }

  return (
      <>
        <Head>
          <title>Info | Report Generator</title>
          <meta name="description" content="Info page"/>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <link rel="icon" href="/favicon.ico"/>
        </Head>
        <Header></Header>
        <Main>
          <About></About>
        </Main>
        <Footer></Footer>
      </>
  )
}
