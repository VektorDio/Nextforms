import Head from 'next/head'
import Header from "@/components/pageWraper/header";
import Main from "@/components/pageWraper/main";
import Footer from "@/components/pageWraper/footer";
import {useSession} from "next-auth/react";
import {useRouter} from "next/router";
import React, {useEffect} from "react";
import styles from "./welcome.module.css"

export default function Welcome() {
  const {status} = useSession()
  const router = useRouter()

    useEffect(() => {
        if (status === "authenticated") {
            router.push("/home")
        }
    }, [status])

  return (
      <>
        <Head>
          <title>Info | NextForms</title>
          <meta name="description" content="Info page"/>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <link rel="icon" href="/favicon.ico"/>
        </Head>
          {(status === "loading" || status === "authenticated") ? null : (
              <>
                  <Header/>
                  <Main>
                      <div className={styles.about}>
                          <h1>About us</h1>
                          <p>NextForms - site for creating and maintaining forms.</p>
                      </div>
                  </Main>
                  <Footer/>
              </>
          )}
      </>
  )
}
