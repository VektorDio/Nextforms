import Head from 'next/head'
import Header from "src/components/globalWrappers/header";
import Main from "src/components/globalWrappers/main";
import Footer from "@/components/globalWrappers/footer";
import React from "react";
import styles from "./welcome.module.css"
import LogInGroup from "@/components/globalWrappers/header/logInGroup";
import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";

export async function getServerSideProps(context) {
    const session = await getServerSession(context.req, context.res, authOptions)
    if (session) {
        return {
            redirect: {
                permanent: false,
                destination: `/home`
            }
        }
    } else return { props: { }}
}

export default function WelcomePage() {
  return (
      <>
          <Head>
              <title>Info | NextForms</title>
              <meta name="description" content="Info page"/>
              <meta name="viewport" content="width=device-width, initial-scale=1"/>
              <link rel="icon" href="/favicon.ico"/>
          </Head>
          <Header>
              <LogInGroup authenticated={false}/>
          </Header>
          <Main>
              <div className={styles.about}>
                  <h1>About us</h1>
                  <p>NextForms - site for creating and maintaining forms.</p>
              </div>
          </Main>
          <Footer/>
      </>
  )
}
