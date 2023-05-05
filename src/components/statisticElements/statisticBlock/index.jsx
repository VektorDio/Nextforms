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

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
    }

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']
    const data = {
        labels,
        datasets: [
            {
                label: '',
                data: labels.map(() => getRandomInt(0, 100)),
                backgroundColor: 'rgba(84, 105, 212, 0.8)',
            },
        ],
    };

    let component
    switch (question.type){
        case "oneLineText":
            component = (
                <>
                    {
                        question.answers.map((answer) => (
                            <div className={styles.textContainer}>{answer}</div>
                        ))
                    }
                </>
            )
            break;
        case "paragraphText":
            component = (
                <>
                    {
                        question.answers.map((answer) => (
                            <div className={styles.textContainer}>{answer}</div>
                        ))
                    }
                </>
            )
            break;
        case "radio":
            component = (
                <div className={styles.diagramContainer}>
                    <Pie options={options} data={data} />
                </div>
            )
            break;
        case "checkbox":
            component = (
                <div className={styles.diagramContainer}>
                    <Bar options={options} data={data} />
                </div>
            )
            break;
        case "select":
            component = (
                <div className={styles.diagramContainer}>
                    <Pie options={options} data={data} />
                </div>
            )
            break;
        case "date":
            component = (
                <>
                    {
                        question.answers.map((answer) => (
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
                        question.answers.map((answer) => (
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