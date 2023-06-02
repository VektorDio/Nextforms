import React from 'react';
import styles from './constructorBlock.module.css'
import {Bar, Pie} from "react-chartjs-2";
import {ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

ChartJS.register(ArcElement, Tooltip, Legend);
export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
    },
};
const StatisticBlock = ({question}) => {

    // function getRandomInt(min, max) {
    //     min = Math.ceil(min);
    //     max = Math.floor(max);
    //     return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
    // }
    // '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')

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
                label: '',
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
                        question.answers.map((answer) => ((answer[0] !== "") &&
                            <div className={styles.textContainer}>{answer}</div>
                        ))
                    }
                </>
            )
            break;
        case "time":
            component = (
                <>
                    {
                        question.answers.map((answer) => ((answer[0] !== "") &&
                            <div className={styles.textContainer}>{answer}</div>
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
                <div className={styles.text}>{question.question || "Question"}</div>
            </div>
            <div className={styles.blockInput}>
                {component}
            </div>
        </div>
    );
};

export default StatisticBlock;