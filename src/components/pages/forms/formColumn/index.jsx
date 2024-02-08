import React, {useEffect, useState} from 'react';
import FormEntry from "@/components/pages/forms/formEntry";
import {useDeleteFormById, useGetFormsByCreatorId, useUpdateForm} from "@/queries/forms";
import {useSession} from "next-auth/react";
import LoadingMessage from "@/components/messages/loadingMessage";
import ErrorMessage from "@/components/messages/errorMessage";
import styles from './formsColumn.module.css'
import SimpleMessage from "@/components/messages/simpleMessage";
import Paginator from "@/components/paginator";
import {useRouter} from "next/router";

const FormColumn = () => {
    const {data:session} = useSession()
    const router = useRouter()
    const userId = session?.user.id

    const pageParam = parseInt(router.query.page)
    const pageSize = 10

    const [forms, setForms] = useState()
    const [formsCount, setFormsCount] = useState(0)
    const [page, setPage] = useState(pageParam !== null ? pageParam : 1)

    const {mutateAsync:deleteForm} = useDeleteFormById()
    const {mutateAsync:updateForm} = useUpdateForm()
    const {error, data, isLoading} = useGetFormsByCreatorId({
        userId: userId,
        pageSize: pageSize,
        currentPage: page
    })

    const maxPages = Math.ceil(formsCount /10)

    useEffect(() => {
        if(data) {
            setForms(data.forms)
            setFormsCount(data.count)
        }
    }, [data])

    function handlePageChange(value) {
        router.push(`/home/forms/${value}` )
        setPage(value)
    }

    async function handleEntryDelete(id) {
        await deleteForm({
            formId: id,
            userId: userId
        })
    }

    async function handleActivityToggle(id, isActive) {
        await updateForm({
            id: id,
            active: isActive,
            userId: userId
        })
    }

    return (
        <div className={styles.container}>
            {
                (isLoading) ? (
                    <LoadingMessage/>
                ) : (error) ? (
                    <ErrorMessage error={error.response.data.message}/>
                ) : (forms?.length > 0) ? (
                    forms?.map((entry,index) =>
                        <FormEntry
                            key={index}
                            formEntry={entry}
                            onDelete={handleEntryDelete}
                            onActivityToggle={handleActivityToggle}
                        />
                    )
                ) : (
                    <SimpleMessage>
                        There no forms yet
                    </SimpleMessage>
                )
            }
            <Paginator currentPage={page} setCurrentPage={handlePageChange} maxPages={maxPages}/>
        </div>
    )
}

export default FormColumn;