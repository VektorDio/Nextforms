import styles from "./fillHeader.module.css"
import Icon from "@/components/pageWraper/header/icon";
import Link from "next/link";
import DeleteButton from "@/components/buttons/deleteButton";
import PrintButton from "@/components/buttons/printButton";
import SelectInput from "@/components/inputs/selectInput";

export default function FillHeader({formId, formEntries, reportEntries, onFormChange, onReportChange, onPrint, reportId}) {
    return (
        <div className={styles.header}>
            <div className={styles.iconBlock}>
                <Icon></Icon>
                <div className={styles.siteName}>
                    ReportsGenerator.js
                </div>
            </div>

            <div className={styles.centerBlock}>
                <div className={styles.selectContainer}>
                    <SelectInput defaultValue={reportId} onChange={(e) => onReportChange(e.target.value)}>
                        {
                            (reportId === undefined) ? <option key={"placeholder"} value={"placeholder"}>Select report</option> : null
                        }
                        {
                            reportEntries?.map((e, i) => (
                                <option key={i} value={e.id} label={e.name}>{e.name}</option>
                            ))
                        }
                    </SelectInput>
                </div>
                <div className={styles.selectContainer}>
                    <SelectInput defaultValue={formId} onChange={(e) => {onFormChange(e.target.value)}}>
                        {
                            (formId === undefined) ? <option key={"placeholder"} value={"placeholder"} >Select form</option> : null
                        }
                        {
                            formEntries?.map((e, i) => (
                                <option key={i} value={e.id} label={e.name}>{e.name}</option>
                            ))
                        }
                    </SelectInput>
                </div>
            </div>

            <div className={styles.sideBlock}>
                <PrintButton onClick={onPrint}/>
                <Link href={"/home"}>
                    <DeleteButton></DeleteButton>
                </Link>
            </div>
        </div>
    )
}