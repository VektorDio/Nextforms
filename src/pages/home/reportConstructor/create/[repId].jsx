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
import FormAlert from "@/components/messages/formAlert";

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

    if (data.report === null) {
        return {
            redirect: {
                permanent: false,
                destination: `/errorPage`
            }
        }
    }

    return { props: { data } }
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

    const [emptyBlockNameCheck, setEmptyBlockNameCheck] = useState(false)
    const [duplicateBlockNameCheck, setDuplicateBlockNameCheck] = useState(false)
    const [emptyReportNameCheck, setEmptyReportNameCheck] = useState(false)

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

        let emptyBlockCheck = !reportObject.blocks.every((e) => e.name.length > 0)
        setEmptyBlockNameCheck(emptyBlockCheck) //just to make sure

        if (emptyBlockNameCheck || duplicateBlockNameCheck || emptyReportNameCheck) {
            return
        }

        try {
            await mutateAsync({
                id: reportObject.id,
                description: reportObject.description,
                name: reportObject.name,
                blocks: reportObject.blocks.map(e => ({
                    type: e.type,
                    name: e.name,
                })),
            })
        } catch (e) {
            router.push(`/errorPage/${e}`)
            return
        }

        router.push("/home")
    }

    function handleNameChange(text){
        setReportObject(prev => ({
            ...prev,
            name: text
        }))
        setEmptyReportNameCheck(!text > 0)
    }

    function handleDescriptionChange(text){
        setReportObject(prev => ({
            ...prev,
            description: text
        }))
    }

    const handleAddBlock = (index) => {

        if (reportObject.blocks.length >= 20) {
            return //cant create more than that blocks
        }

        let buf = [...reportObject.blocks]
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
        if(reportObject.blocks.length > 1){
            let buf = [...reportObject.blocks]
            buf.splice(index, 1)
            setReportObject(prev => ({
                ...prev,
                blocks: [...buf]
            }))
            setEmptyBlockNameCheck(!reportObject.blocks.every((e) => e.name.length > 0))
        }
    }

    const handleTypeChange = (index, value) => {
        let buf = [...reportObject.blocks]
        buf[index].type = value
        setReportObject(prev => ({
            ...prev,
            blocks: [...buf]
        }))
    }

    const handleBlockNameChange = (index, text) => {
        let buf = [...reportObject.blocks]
        buf[index].name = text
        setReportObject(prev => ({
            ...prev,
            blocks: [...buf]
        }))

        setDuplicateBlockNameCheck(reportObject.blocks.some((block, i) => block.name === text && i !== index))
        setEmptyBlockNameCheck(!reportObject.blocks.every((e) => e.name.length > 0))
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
                                placeholder={"Report name"}
                                defaultValue={reportObject.name}
                                maxLength={126}
                            />
                        </div>
                        <div className={styles.formDescription}>
                            <TextParagraph
                                onBlur={(e) => handleDescriptionChange(e.currentTarget.textContent || "")}
                                placeholder={"Report description"}
                                defaultValue={reportObject.description}
                                maxLength={350}
                            />
                        </div>
                    </div>
                    {
                        (emptyBlockNameCheck) && (
                            <FormAlert>Report has empty block names!</FormAlert>
                        )
                    }
                    {
                        (duplicateBlockNameCheck) && (
                            <FormAlert>Report has duplicated blocks!</FormAlert>
                        )
                    }
                    {
                        (emptyReportNameCheck) && (
                            <FormAlert>Report has empty name!</FormAlert>
                        )
                    }
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