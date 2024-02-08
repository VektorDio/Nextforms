import React from 'react';
import styles from './constructorBlock.module.css'
import {Bar, Pie} from "react-chartjs-2";
import {Chart as ChartJS, ArcElement, BarElement, CategoryScale, Legend, LinearScale, Tooltip} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'top',
            labels: {
                font: {
                    size: 22
                }
            }
        },
    },
};

const StatisticBlock = ({question}) => {

    const colors = [
        "#192040",
        "#3c4c99",
        "#263162",
        "#5469d4",
        "#334182",
        "#6678d8",
        "#bec6ef",
        "#7d8dde",
        "#e7eaf9",
    ]

    const answers = (question.type === "checkbox") ? question.answers.flat() : question.answers

    const dataValue = answers.reduce((acc, val) => {
        acc[val] = acc[val] === undefined ? 1 : acc[val] += 1;
        return acc;
    }, {});

    const labels = question.options

    const data = {
        labels,
        datasets: [
            {
                label: labels.map(() => ""),
                data: labels.map((e) => dataValue[e]),
                backgroundColor: (question.type === "checkbox") ? 'rgba(84, 105, 212, 0.8)'
                    : labels.map((e, i) => (i > colors.length) ? "rgba(84, 105, 212, 0.8)" : colors[i]),
            },
        ],
    };

    let component
    switch (question.type){
        case "oneLineText":
            component = (
                <>
                    {
                        question.answers.map((answer, index) => ((answer[0] !== "") &&
                            <div key={index} className={styles.textContainer}>{answer}</div>
                        ))
                    }
                </>
            )
            break;
        case "paragraphText":
            component = (
                <>
                    {
                        question.answers.map((answer, index) => ((answer[0] !== "") &&
                            <div key={index} className={styles.textContainer}>{answer}</div>
                        ))
                    }
                </>
            )
            break;
        case "radio":
            component = (question.answers.length > 0) ? (
                <div className={styles.diagramContainer}>
                    <Pie options={options} data={data} />
                </div>
            ) : null
            break;
        case "checkbox":
            component = (question.answers.length > 0) ? (
                <div className={styles.diagramContainer}>
                    <Bar options={options} data={data} />
                </div>
            ) : null
            break;
        case "select":
            component = (question.answers.length > 0) ? (
                <div className={styles.diagramContainer}>
                    <Pie options={options} data={data} />
                </div>
            ) : null
            break;
        case "date":
            component = (
                <>
                    {
                        question.answers.map((answer, i) => ((answer[0] !== "") &&
                            <div key={i} className={styles.textContainer}>{answer}</div>
                        ))
                    }
                </>
            )
            break;
        case "time":
            component = (
                <>
                    {
                        question.answers.map((answer, i) => ((answer[0] !== "") &&
                            <div key={i} className={styles.textContainer}>{answer}</div>
                        ))
                    }
                </>
            )
            break;
        default:
            component = (<></>)
            break;
    }

    return (
        <div className={styles.container}>
            <div className={styles.blockHeader}>
                <div className={styles.text}>{question.question || "Questions"}</div>
            </div>
            <div className={styles.blockInput}>
                {component}
            </div>
        </div>
    )
}

export default StatisticBlock;