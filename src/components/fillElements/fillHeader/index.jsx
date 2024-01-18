import React from 'react';
import styles from "./fillHeader.module.css";
import SelectInput from "@/components/inputs/selectInput";
import SimpleButton from "@/components/buttons/simpleButton";
import Link from "next/link";

const FillHeader = ({reportId, onReportIdChange, reportNamesData, onFormIdChange, formNamesData, handlePrint, formId}) => {

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
                    <SelectInput defaultValue={reportId}
                                 options={reportOptions}
                                 onChange={(choice) => onReportIdChange(choice.value)}
                                 placeholder={"Select report"}
                                 isSearchable={false}
                    />
                </div>
                <div className={styles.selectContainer}>
                    <SelectInput defaultValue={formId}
                                 options={formOptions}
                                 onChange={(choice) => onFormIdChange(choice.value)}
                                 placeholder={"Select form"}
                                 isSearchable={false}
                    />

                </div>
            </div>

            <div className={styles.sideBlock}>
                <SimpleButton onClick={handlePrint} iconType={"print"} bgColor={"#399412"}/>
                <Link href={"/home"}>
                    <SimpleButton iconType={"xmark"} bgColor={"#d00c0c"}/>
                </Link>
            </div>
        </>
    );
};

export default FillHeader;