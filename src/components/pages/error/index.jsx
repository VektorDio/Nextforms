import Header from "src/components/globalWrappers/header";
import Main from "src/components/globalWrappers/main";
import React from "react";
import SimpleMessage from "@/components/messages/simpleMessage";
import MetaHead from "@/components/metaHead";

const Error = ({error}) => {
    return (
        <>
            <MetaHead title={"Error Page | NextForms"} description={"Error page"}/>
            <Header/>
            <Main>
                <SimpleMessage>
                    An error occurred. <br/>
                    {error}
                </SimpleMessage>
            </Main>
        </>
    )
}

export default Error;