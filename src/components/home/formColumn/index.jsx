import React from 'react';
import FormEntry from "@/components/home/formColumn/formEntry";

const FormColumn = () => {

    const test =[{
        id: "123",
        formName: "Form1",
        active: true,

    },
        {
            id: "123",
            formName: "Form2",
            active: true,

        },
        {
            id: "123",
            formName: "Form3",
            active: false,

        },
        {
            id: "123",
            formName: "Form4",
            active: false,

        }]

    return (
        <div>
            {
                test.map((entry) =>
                    <FormEntry
                        formEntry={entry}
                        onDelete={"123"}
                        onActivityToggle={"123"}
                        onGenerateLink={"123"}
                    />
                )
            }
        </div>
    );
};

export default FormColumn;