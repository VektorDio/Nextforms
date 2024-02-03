import React, {useState} from 'react';
import {useRouter} from "next/router";
import Head from "next/head";
import ConstructorHeader from "src/components/pages/reportRedact/constructorHeader";
import Main from "src/components/globalWrappers/main";
import ConstructorColumn from "src/components/globalWrappers/constructorColumn";
import ConstructorBlock from "src/components/pages/reportRedact/constructorBlock";
import {useUpdateReport} from "@/queries/reports";
import styles from "./reportRedact.module.css";
import TextParagraph from "@/components/inputFields/textParagraph";
import Header from "src/components/globalWrappers/header";
import FormAlert from "@/components/messages/formAlert";
import useBeforeUnload from "@/hooks/useBeforeUnload";

const ReportRedact = ({ data }) => {
    const router = useRouter()
    const {mutateAsync: updateReport} = useUpdateReport()
    const [reportObject, setReportObject] = useState(data.report)

    const [emptyBlockNameCheck, setEmptyBlockNameCheck] = useState(false)
    const [duplicateBlockNameCheck, setDuplicateBlockNameCheck] = useState(false)
    const [emptyReportNameCheck, setEmptyReportNameCheck] = useState(false)

    const [isDirty, setIsDirty] = useState(false)
    useBeforeUnload(isDirty)

    const [selectedBlockId, setSelectedBlockId] = useState("head")

    async function handleReportSubmit() {

        let emptyBlockCheck = !reportObject.blocks.every((e) => e.name.length > 0)
        setEmptyBlockNameCheck(emptyBlockCheck) //just to make sure

        if (emptyBlockNameCheck || duplicateBlockNameCheck || emptyReportNameCheck) {
            return
        }

        try {
            await updateReport({
                userId: reportObject.userId,
                id: reportObject.id,
                description: reportObject.description,
                name: reportObject.name,
                blocks: reportObject.blocks.map(e => ({
                    type: e.type,
                    name: e.name,
                })),
            })
        } catch (e) {
            await router.push(`/errorPage/${e}`)
            return
        }

        router.back()
    }

    function handleNameChange(text){
        setReportObject(prev => ({
            ...prev,
            name: text
        }))
        setEmptyReportNameCheck(!text > 0)
        setIsDirty(true)
    }

    function handleDescriptionChange(text){
        setReportObject(prev => ({
            ...prev,
            description: text
        }))
        setIsDirty(true)
    }

    const handleAddBlock = (index) => {

        if (reportObject.blocks.length >= 20) {
            return //cant create more than that blocks
        }

        let buf = [...reportObject.blocks]
        buf.splice((index + 1), 0, {
            type: "oneLineText",
            name: "Text",
        })
        setReportObject(prev => ({
            ...prev,
            blocks: [...buf]
        }))
        setIsDirty(true)
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
            setIsDirty(true)
        }
    }

    const handleTypeChange = (index, value) => {
        let buf = [...reportObject.blocks]
        buf[index].type = value
        setReportObject(prev => ({
            ...prev,
            blocks: [...buf]
        }))
        setIsDirty(true)
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

        setIsDirty(true)
    }

    function setSelectedBlock(e, id){
        e.stopPropagation()
        setSelectedBlockId(id)
    }

    const constructorBlockHandlers = {
        handleAdd:handleAddBlock,
        handleDelete:handleDelete,
        handleBlockTypeChange:handleTypeChange,
        handleNameChange:handleBlockNameChange,
        setSelectedBlockId:setSelectedBlock
    }

    return (
        <>
            <Head>
                <title>{`${reportObject.name || "Report"} | NextForms`}</title>
                <meta name="description" content="Report create page" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="manifest" href="/manifest.json" />
                <meta name="theme-color" content="#272e3a"/>
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
                                maxLength={80}
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
                                key={index}
                                block={block}
                                index={index}
                                handlers={constructorBlockHandlers}
                                selectedBlockId={selectedBlockId}
                            />
                        ))
                    }
                </ConstructorColumn>
            </Main>
        </>
    );
};

export default ReportRedact;