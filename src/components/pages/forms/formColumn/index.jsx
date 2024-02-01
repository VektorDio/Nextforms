import React, {useEffect, useState} from 'react';
import FormEntry from "@/components/pages/forms/formEntry";
import {useDeleteFormById, useGetFormsByCreatorId, useUpdateForm} from "@/queries/forms";
import {useSession} from "next-auth/react";
import LoadingMessage from "@/components/messages/loadingMessage";
import ErrorMessage from "@/components/messages/errorMessage";
import styles from './formsColumn.module.css'
import SimpleMessage from "@/components/messages/simpleMessage";

const FormColumn = () => {
    const {data:session} = useSession()
    const userId = session?.user.id

    const {mutateAsync:deleteForm} = useDeleteFormById()
    const {mutateAsync:updateForm} = useUpdateForm()
    const {error, data, isLoading} = useGetFormsByCreatorId({
        userId: userId,
    })

    const [forms, setForms] = useState()

    useEffect(() => {
        if(data) {
            setForms(data.forms)
        }
    }, [data])

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
                    <ErrorMessage error={error}/>
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
        </div>
    );
};

export default FormColumn;