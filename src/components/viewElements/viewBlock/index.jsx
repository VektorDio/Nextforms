import React from 'react';
import styles from './viewBlock.module.css'
import {Form} from "formik";
import MyCheckbox from "@/components/forms/checkbox";
import MyRadio from "@/components/forms/radio";
import MyTextInput from "@/components/forms/textInput";
import MySelect from "@/components/forms/select";
import MyParagraphInput from "@/components/forms/paragraph";
import MyDate from "@/components/forms/date";
import MyTime from "@/components/forms/time";
const ViewBlock = ({question}) => {
    let component
    switch (question.type){
        case "oneLineText":
            component = (
                <div className={styles.oneLineText}>
                    <MyTextInput
                        name={question.id}
                        placeholder={"Answer"}
                    />
                </div>
            )
            break;
        case "paragraphText":
            component = (
                <div className={styles.paragraphText}>
                    <MyParagraphInput
                        name={question.id}
                        placeholder={"Answer"}
                    />
                </div>
            )
            break;
        case "radio":
            component = (
                <>
                    {question.options.map((e, index) =>(
                        <MyRadio
                            name={question.id}
                            value={e}
                            text={e}
                            key={index}
                        />
                        ))
                    }
                </>
            )
            break;
        case "checkbox":
            component = (
                <>
                    {question.options.map((e, index) =>(
                        <MyCheckbox
                            name={question.id}
                            value={e}
                            text={e}
                            key={index}
                        />
                        ))
                    }
                </>
            )
            break;
        case "select":
            let optionsArray = []
            question.options.map((e, index) =>(
                optionsArray.push({value: e, label: e, key: index})
            ))
            component = (
                <div className={styles.oneLineText}>
                    <MySelect name={question.id} options={optionsArray}/>
                </div>
            )
            break;
        case "date":
            component = (
                <MyDate
                    name={question.id}
                />
            )
            break;
        case "time":
            component = (
                <MyTime
                    name={question.id}
                />
            )
            break;
        default:
            component = (<></>)
            break;
    }

    return (
            <div className={styles.container}>
                <div className={styles.blockHeader}>
                    <div className={styles.unselectedText}>{question.question || "Questions"}</div>
                </div>
                <div className={styles.blockInput}>
                    <Form>
                        {component}
                    </Form>
                </div>
            </div>
    );
};

export default ViewBlock;