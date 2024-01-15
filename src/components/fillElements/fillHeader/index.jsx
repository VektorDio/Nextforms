import React from 'react';
import styles from "./fillHeader.module.css";
import Icon from "@/components/icon";
import SelectInput from "@/components/inputs/selectInput";
import SimpleButton from "@/components/buttons/simpleButton";
import Link from "next/link";

const FillHeader = ({reportId, onReportIdChange, reportNamesData, onFormIdChange, formNamesData, handlePrint, formId}) => {
    return (
        <div className={styles.header}>
            <div className={styles.iconBlock}>
                <Icon/>
                <div className={styles.siteName}>
                    NextForms
                </div>
            </div>

            <div className={styles.centerBlock}>
                <div className={styles.selectContainer}>
                    <SelectInput defaultValue={reportId} onChange={(e) => onReportIdChange(e.target.value)}>
                        {
                            (reportId === undefined) ? <option
                                key={"placeholder"}
                                value={"placeholder"}
                                selected={true}
                                disabled={true}
                                hidden={true}
                            >
                                Select report
                            </option> : null
                        }
                        {
                            reportNamesData?.reports.map((e, i) => (
                                <option key={i} value={e.id} label={e.name}>{e.name}</option>
                            ))
                        }
                    </SelectInput>
                </div>
                <div className={styles.selectContainer}>
                    <SelectInput defaultValue={formId} onChange={(e) => {onFormIdChange(e.target.value)}}>
                        {
                            (formId === undefined) ? <option
                                key={"placeholder"}
                                value={"placeholder"}
                                selected={true}
                                disabled={true}
                                hidden={true}
                            >
                                Select form
                            </option> : null
                        }
                        {
                            formNamesData?.forms.map((e, i) => (
                                <option key={i} value={e.id} label={e.name}>{e.name}</option>
                            ))
                        }
                    </SelectInput>
                </div>
            </div>

            <div className={styles.sideBlock}>
                <SimpleButton onClick={handlePrint} iconType={"print"} bgColor={"#399412"}/>
                <Link href={"/home"}>
                    <SimpleButton iconType={"xmark"} bgColor={"#d00c0c"}/>
                </Link>
            </div>
        </div>
    );
};

export default FillHeader;