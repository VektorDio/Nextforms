import Head from 'next/head'
import Header from "@/components/globalWrappers/header";
import Main from "@/components/globalWrappers/main";
import Footer from "@/components/globalWrappers/footer";
import React from "react";
import styles from "./welcome.module.css"
import LogInGroup from "@/components/globalWrappers/header/logInGroup";

export default function Welcome() {
  return (
      <>
          <Head>
              <title>Info | NextForms</title>
              <meta name="description" content="Info page"/>
              <meta name="viewport" content="width=device-width, initial-scale=1"/>
              <link rel="icon" href="/favicon.ico"/>
              <link rel="manifest" href="/manifest.json" />
              <meta name="theme-color" content="#272e3a"/>
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
