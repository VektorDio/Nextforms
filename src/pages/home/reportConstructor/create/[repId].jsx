import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import {useSession} from "next-auth/react";
import {v4 as uuidv4} from "uuid";
import Head from "next/head";
import ConstructorHeader from "@/components/reportConstructorElements/constructorHeader";
import Main from "@/components/pageWraper/main";
import ConstructorColumn from "src/components/constructorColumn";
import ConstructorBlock from "@/components/reportConstructorElements/constructorBlock";
import {useGetReportById, useUpdateReport} from "@/queries/reports";
import LoadingMessage from "@/components/messages/loadingMessage";
import ErrorMessage from "@/components/messages/errorMessage";
import styles from "./reportRedact.module.css";
import TextParagraph from "@/components/inputs/textParagraph";

const ReportConstructor = () => {
    const router = useRouter()
    const [selectedBlockId, setSelectedBlockId] = useState("head")
    const {repId} = router.query

    const {mutateAsync} = useUpdateReport()

    useSession({
        required: true,
        onUnauthenticated() {
            router.push("/")
        },
    })

    const {error, data, isLoading} = useGetReportById({
        id: repId,
    })

    const [reportObject, setReportObject] = useState()

    useEffect(() => {
        if(data) {
            setReportObject(data.report)
        }
    }, [data])

    async function handleReportSubmit() {
        await mutateAsync({
            id: reportObject?.id,
            description: reportObject?.description,
            name: reportObject?.name,
            blocks: reportObject?.blocks.map(e => ({
                type: e.type,
                name: e.name,
            })),
        })
        router.push("/home")
    }

    function handleNameChange(text){
        if (text.length < 1){
            //display error
            return
        }
        setReportObject(prev => ({
            ...prev,
            name: text
        }))
    }
    function handleDescriptionChange(text){
        if (text.length < 1){
            //display error
            return
        }
        setReportObject(prev => ({
            ...prev,
            description: text
        }))
    }

    const handleAddBlock = (id) => {
        let buf = [...reportObject?.blocks]
        let index = buf.findIndex(e => e.id === id)
        buf.splice((index + 1), 0, {
            id: uuidv4(),
            type: "radio",
            name: "Текст",
        })
        setReportObject(prev => ({
            ...prev,
            blocks: [...buf]
        }))
    }

    const handleDelete = (id) => {
        let buf = [...reportObject?.blocks]
        let index = buf.findIndex(e => e.id === id)
        if(buf.length > 1){
            buf.splice(index, 1)
        }
        setReportObject(prev => ({
            ...prev,
            blocks: [...buf]
        }))
    }

    const handleTypeChange = (id, value) => {
        let buf = [...reportObject?.blocks]
        let index = buf.findIndex(e => e.id === id)
        buf[index].type = value
        setReportObject(prev => ({
            ...prev,
            blocks: [...buf]
        }))
    }

    const handleBlockNameChange = (id, text) => {
        if (text.length < 1){
            //display error
            return
        }
        let buf = [...reportObject?.blocks]
        let index = buf.findIndex(e => e.id === id)
        buf[index].name = text
        setReportObject(prev => ({
            ...prev,
            blocks: [...buf]
        }))
    }

    return (
        <>
            <Head>
                <title>{reportObject?.name} | Report Generator</title>
                <meta name="description" content="Report create page" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ConstructorHeader onReportSubmit={handleReportSubmit}/>
            <Main>
                <ConstructorColumn>
                    {
                        (isLoading) ? (
                            <LoadingMessage/>
                        ) : (error) ? (
                            <ErrorMessage error={error}/>
                        ) : (reportObject) && (
                            <>
                                <div className={styles.container} onClick={() => setSelectedBlockId("head")}>
                                    <div className={styles.formName}>
                                        <TextParagraph
                                            onBlur={(e) => handleNameChange(e.currentTarget.textContent || "")}
                                            placeholder={"Report name film"}
                                            defaultValue={reportObject?.name}
                                        />
                                    </div>
                                    <div className={styles.formDescription}>
                                        <TextParagraph
                                            onBlur={(e) => handleDescriptionChange(e.currentTarget.textContent || "")}
                                            placeholder={"Report description"}
                                            defaultValue={reportObject?.description}
                                        />
                                    </div>
                                </div>
                                {
                                    reportObject?.blocks.map((q) => (
                                        <ConstructorBlock
                                            key={q.id}
                                            block={q}
                                            handleAdd={handleAddBlock}
                                            handleDelete={handleDelete}
                                            handleBlockTypeChange={handleTypeChange}
                                            handleNameChange={handleBlockNameChange}
                                            selectedBlockId={selectedBlockId}
                                            setSelectedBlockId={setSelectedBlockId}
                                        />
                                    ))
                                }
                            </>
                        )
                    }
                </ConstructorColumn>
            </Main>
        </>
    );
};

export default ReportConstructor;