import React from 'react';
import styles from "./fillHeader.module.css";
import SelectInput from "@/components/inputs/selectInput";
import SimpleButton from "@/components/buttons/simpleButton";
import {useRouter} from "next/router";

const FillHeader = ({reportId, onReportIdChange, reportNamesData, onFormIdChange, formNamesData, handlePrint, formId}) => {
    const router = useRouter()

    let reportOptions = []
    let formOptions = []

    reportNamesData?.reports.map((e, i) => (
        reportOptions.push({value: e.id, label: e.name, key: i})
    ))

    formNamesData?.forms.map((e, i) => (
        formOptions.push({value: e.id, label: e.name, key: i})
    ))

    return (
        <>
            <div className={styles.centerBlock}>
                <div className={styles.selectContainer}>
                    <SelectInput defaultValue={reportOptions.find((e) => e.value === reportId)}
                                 options={reportOptions}
                                 onChange={(choice) => onReportIdChange(choice.value)}
                                 placeholder={"Select report"}
                                 isSearchable={false}
                                 instanceId={"select-report"}
                    />
                </div>
                <div className={styles.selectContainer}>
                    <SelectInput defaultValue={formOptions.find((e) => e.value === formId)}
                                 options={formOptions}
                                 onChange={(choice) => onFormIdChange(choice.value)}
                                 placeholder={"Select form"}
                                 isSearchable={false}
                                 instanceId={"select-form"}
                    />

                </div>
            </div>

            <div className={styles.sideBlock}>
                <SimpleButton onClick={handlePrint} iconType={"print"} bgColor={"#399412"}/>
                <SimpleButton onClick={() => router.back()} iconType={"xmark"} bgColor={"#d00c0c"} />
            </div>
        </>
    );
};

export default FillHeader;