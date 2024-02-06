import Header from "@/components/globalWrappers/header";
import Main from "@/components/globalWrappers/main";
import Footer from "@/components/globalWrappers/footer";
import React from "react";
import styles from "./welcome.module.css"
import LogInGroup from "@/components/globalWrappers/header/logInGroup";
import MetaHead from "@/components/metaHead";

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
                  <p>NextForms - site for creating and maintaining forms.</p>
              </div>
          </Main>
          <Footer/>
      </>
  )
}
