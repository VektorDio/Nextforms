import Header from "src/components/globalWrappers/header";
import Main from "src/components/globalWrappers/main";
import React from "react";
import SimpleMessage from "@/components/messages/simpleMessage";
import MetaHead from "@/components/metaHead";

const ClosedForm = () => {
    return (
        <>
            <MetaHead title={"Closed Form | NextForms"} description={"Closed form message"}/>
            <Header/>
            <Main>
                <SimpleMessage>
                    This form no longer accepts answers
                </SimpleMessage>
            </Main>
        </>
    )
}

export default ClosedForm;