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

    const [page, setPage] = useState(pageParam !== null ? pageParam : 1)
    const [forms, setForms] = useState()
    const [formsCount, setFormsCount] = useState(0)

    const maxPages = Math.ceil(formsCount / pageSize)

    const {error, data, isLoading} = useGetFormsByCreatorId({
        userId: userId,
        pageSize: pageSize,
        currentPage: page
    })

    const {mutateAsync:deleteForm} = useDeleteFormById()
    const {mutateAsync:updateForm} = useUpdateForm()

    useEffect(() => {
        if(data) {
            setForms(data.forms)
            setFormsCount(data.count)
        }
    }, [data])

    function handlePageChange(value) {
        setPage(value)
        router.push(`/home/forms/${page}`, null, { shallow: true})
    }

    async function handleEntryDelete(id) {
        await deleteForm({
            formId: id,
            userId: userId
        }, {
            onSuccess: () => {
                if (Math.ceil((formsCount - 1) /10) < page) {
                    handlePageChange(page - 1)
                }
            }
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
                    <>
                        {
                            forms?.map((entry,index) =>
                                <FormEntry
                                    key={index}
                                    formEntry={entry}
                                    onDelete={handleEntryDelete}
                                    onActivityToggle={handleActivityToggle}
                                />
                            )
                        }
                        <Paginator currentPage={page} setCurrentPage={handlePageChange} maxPages={maxPages}/>
                    </>
                ) : (
                    <SimpleMessage>
                        There no forms yet
                    </SimpleMessage>
                )
            }
        </div>
    )
}

export default FormColumn;