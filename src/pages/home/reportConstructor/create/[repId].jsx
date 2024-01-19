import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import {useSession} from "next-auth/react";
import {v4 as uuidv4} from "uuid";
import Head from "next/head";
import ConstructorHeader from "@/components/reportConstructorElements/constructorHeader";
import Main from "@/components/pageWraper/main";
import ConstructorColumn from "src/components/constructorColumn";
import ConstructorBlock from "@/components/reportConstructorElements/constructorBlock";
import {useUpdateReport} from "@/queries/reports";
import styles from "./reportRedact.module.css";
import TextParagraph from "@/components/inputs/textParagraph";
import Header from "@/components/pageWraper/header";
import axios from "axios";

export async function getServerSideProps(context) {
    const id = context.params.repId
    let data

    try {
        data = (await axios.get('http://localhost:3000/api/report', {
            params: {
                id: id,
            }
        })).data
    } catch (e){
        return {
            redirect: {
                permanent: false,
                destination: `/errorPage/${e}`
            }
        }
    }

    return { props: { data} }
}

const ReportConstructor = ({data}) => {
    const router = useRouter()
    const [selectedBlockId, setSelectedBlockId] = useState("head")

    const {mutateAsync} = useUpdateReport()

    useSession({
        required: true,
        onUnauthenticated() {
            router.push("/")
        },
    })

    const [reportObject, setReportObject] = useState(data.report)

    useEffect(() => {
        const beforeunloadHandler = (e) => {
            e.preventDefault()
            e.returnValue = true
        }

        window.addEventListener("beforeunload", beforeunloadHandler)

        return () => {
            window.removeEventListener("beforeunload", beforeunloadHandler)
        }
    }, [reportObject])

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

    const handleAddBlock = (index) => {
        let buf = [...reportObject?.blocks]
        buf.splice((index + 1), 0, {
            id: uuidv4(),
            type: "radio",
            name: "Text",
        })
        setReportObject(prev => ({
            ...prev,
            blocks: [...buf]
        }))
    }

    const handleDelete = (index) => {
        if(reportObject?.blocks.length > 1){
            let buf = [...reportObject?.blocks]
            buf.splice(index, 1)
            setReportObject(prev => ({
                ...prev,
                blocks: [...buf]
            }))
        }
    }

    const handleTypeChange = (index, value) => {
        let buf = [...reportObject?.blocks]
        buf[index].type = value
        setReportObject(prev => ({
            ...prev,
            blocks: [...buf]
        }))
    }

    const handleBlockNameChange = (index, text) => {
        if (text.length < 1){
            //display error
            return
        }
        let buf = [...reportObject?.blocks]
        buf[index].name = text
        setReportObject(prev => ({
            ...prev,
            blocks: [...buf]
        }))
    }

    function setSelectedBlock(e, id){
        e.stopPropagation()
        setSelectedBlockId(id)
    }

    return (
        <>
            <Head>
                <title>{reportObject.name || "Report"} | NextForms</title>
                <meta name="description" content="Report create page" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header movable={true}>
                <ConstructorHeader onReportSubmit={handleReportSubmit}/>
            </Header>
            <Main onClick={(e) => setSelectedBlock(e, "head")}>
                <ConstructorColumn>
                    <div className={styles.container} onClick={(e) => setSelectedBlock(e, "head")}>
                        <div className={styles.formName}>
                            <TextParagraph
                                onBlur={(e) => handleNameChange(e.currentTarget.textContent || "")}
                                placeholder={"Report name film"}
                                defaultValue={reportObject.name}
                            />
                        </div>
                        <div className={styles.formDescription}>
                            <TextParagraph
                                onBlur={(e) => handleDescriptionChange(e.currentTarget.textContent || "")}
                                placeholder={"Report description"}
                                defaultValue={reportObject.description}
                            />
                        </div>
                    </div>
                    {
                        reportObject.blocks.map((block, index) => (
                            <ConstructorBlock
                                key={block.id}
                                block={block}
                                index={index}

                                handleAdd={handleAddBlock}
                                handleDelete={handleDelete}
                                handleBlockTypeChange={handleTypeChange}
                                handleNameChange={handleBlockNameChange}

                                selectedBlockId={selectedBlockId}
                                setSelectedBlockId={setSelectedBlock}
                            />
                        ))
                    }
                </ConstructorColumn>
            </Main>
        </>
    );
};

export default ReportConstructor;