import React, {useEffect, useState} from 'react';
import FormEntry from "@/components/home/formColumn/formEntry";
import {useDeleteFormById, useGetFormsByCreatorId, useUpdateForm} from "@/queries/forms";
import {useSession} from "next-auth/react";

const FormColumn = () => {
    const {status, data:session} = useSession({
        required: true,
    })
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

    if (isLoading) return (<div>Loading...</div>)
    if (error) return (<div>Error</div>)
    if (forms) return (
        <div>
            {
                forms?.map((entry,index) =>
                    <FormEntry
                        key={index}
                        formEntry={entry}
                        onDelete={handleEntryDelete}
                        onActivityToggle={handleActivityToggle}
                        onGenerateLink={"123"}
                    />
                )
            }
        </div>
    );
};

export default FormColumn;