import Header from "@/components/globalWrappers/header";
import Main from "@/components/globalWrappers/main";
import Footer from "@/components/globalWrappers/footer";
import React from "react";
import styles from "./welcome.module.css"
import LogInGroup from "@/components/globalWrappers/header/logInGroup";
import MetaHead from "@/components/metaHead";
import Image from "next/image";

export default function Welcome() {
  return (
      <>
          <MetaHead title={"Info | NextForms"} description={"Info page"}/>
          <Header>
              <LogInGroup authenticated={false}/>
          </Header>
          <Main>
              <div className={styles.about}>
                  <h1>About us</h1>
                  <p>NextForms - fast and simple forms for surveys and reports.</p>
              </div>
              <div className={styles.container}>
                  <div className={styles.column}>
                      <div className={styles.textUpper}>
                          Create forms with sections
                      </div>
                      <div className={styles.block}>
                          <Image className={styles.image} src={"/formSetup.png"} alt={"formSetup"} width={860} height={845} quality={100}/>
                      </div>
                      <div className={styles.textUnder}>
                          Use different options to customize your questions
                      </div>
                  </div>
                  <div className={styles.column}>
                      <div className={styles.textUpper}>
                          Monitor statistics and answers
                      </div>
                      <div className={styles.block}>
                          <Image className={styles.image} src={"/statisticsSetup.png"} alt={"statisticsSetup"} width={860} height={845} quality={100}/>
                      </div>
                      <div className={styles.textUnder}>
                          All the data presented in a form of diagrams and lists
                      </div>
                  </div>
                  <div className={styles.column}>
                      <div className={styles.textUpper}>
                          Generate reports based on form replies
                      </div>
                      <div className={styles.block}>
                          <Image className={styles.image} src={"/reportSetup.png"} alt={"formSetup"} width={860} height={845} quality={100}/>
                      </div>
                      <div className={styles.textUnder}>
                          You can print or save reports in PDF
                      </div>
                  </div>
              </div>
          </Main>
          <Footer/>
      </>
  )
}
