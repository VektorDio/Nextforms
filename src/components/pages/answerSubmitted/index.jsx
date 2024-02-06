import React from 'react';
import Main from "src/components/globalWrappers/main";
import Header from "src/components/globalWrappers/header";
import SimpleMessage from "@/components/messages/simpleMessage";
import MetaHead from "@/components/metaHead";

const AnswerSubmit = () => {
    return (
        <>
            <MetaHead title={"Answer Submitted | NextForms"} description={"Answer submitted page"}/>
            <Header/>
            <Main>
                <SimpleMessage>
                    Answer has been submitted
                </SimpleMessage>
            </Main>
        </>
    );
};

export default AnswerSubmit;