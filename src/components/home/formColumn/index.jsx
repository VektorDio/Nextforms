import React, {useEffect, useState} from 'react';
import FormEntry from "@/components/home/formColumn/formEntry";
import {useDeleteFormById, useGetFormsByCreatorId, useUpdateForm} from "@/queries/forms";
import {useSession} from "next-auth/react";
import LoadingMessage from "@/components/messages/loadingMessage";
import ErrorMessage from "@/components/messages/errorMessage";
import styles from './formsColumn.module.css'
import SimpleMessage from "@/components/messages/simpleMessage";

const FormColumn = () => {
    const {data:session} = useSession()
    const {mutateAsync:deleteForm} = useDeleteFormById()
    const {mutateAsync:updateForm, } = useUpdateForm()
    const [forms, setForms] = useState()

    const {id} = session.user

    const {error, data, isLoading} = useGetFormsByCreatorId({
        id: id,
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