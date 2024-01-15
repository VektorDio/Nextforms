import React, {useEffect, useState} from 'react';
import FormEntry from "@/components/home/formColumn/formEntry";
import {useDeleteFormById, useGetFormsByCreatorId, useUpdateForm} from "@/queries/forms";
import {useSession} from "next-auth/react";
import LoadingMessage from "@/components/messages/loadingMessage";
import ErrorMessage from "@/components/messages/errorMessage";
import styles from './formsColumn.module.css'
const FormColumn = () => {
    const {status, data:session} = useSession()
    const {mutateAsync:deleteForm, isLoading:isUpdating} = useDeleteFormById()
    const {mutateAsync:updateForm, } = useUpdateForm()
    const [forms, setForms] = useState()

    let userId = ""

    if (status !== 'loading'){
        const {id} = session.user
        userId = id
    }

    const {error, data, isLoading} = useGetFormsByCreatorId({
        id: userId,
    })

    useEffect(() => {
        if(data) {
            setForms(data.forms)
        }
    }, [data])

    async function handleEntryDelete(id) {
        await deleteForm({
            id: id,
        })
    }

    async function handleActivityToggle(id, isActive) {
        await updateForm({
            id: id,
            active: isActive,
        })
    }

    return (
        <div className={styles.container}>
            {
                (isLoading) ? (
                    <LoadingMessage/>
                ) : (error) ? (
                    <ErrorMessage error={error}/>
                ) : (
                    forms?.map((entry,index) =>
                        <FormEntry
                            key={index}
                            formEntry={entry}
                            onDelete={handleEntryDelete}
                            onActivityToggle={handleActivityToggle}
                        />
                    )
                )
            }
        </div>
    );
};

export default FormColumn;