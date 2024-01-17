import React, {useState} from 'react';
import styles from "./statistics.module.css";
import SelectInput from "@/components/inputs/selectInput";
import CheckboxInput from "@/components/inputs/checkboxInput";

const StatisticsInput = ({answers}) => {
    const [answer, setAnswer] = useState(answers[0])
    const [options, setOptions] = useState({
        amountOfAnswers: false,
        amountByOptions: false,
    })

    let optionsArray = []

    answers?.map((ans, i) => (
        optionsArray.push({value: i, label: ans.question, key: i})
    ))

    return (
        <div>
            <div className={styles.selectContainer}>
                <SelectInput placeholder={"Select questions"} options={optionsArray} onChange={(choice)=> setAnswer(answers[choice.value])}/>
            </div>
            <div className={styles.checkboxContainer}>
                {
                    (answer) && (
                        <>
                            <CheckboxInput
                                text={"Amount of answers"}
                                onChange={() => setOptions({...options, amountOfAnswers: !options.amountOfAnswers})}
                            />
                            <CheckboxInput
                                text={"Options selected"}
                                onChange={() => setOptions({...options, amountByOptions: !options.amountByOptions})}
                            />
                        </>
                    )
                }
            </div>
            <div className={styles.statisticsContainer}>
                {
                    (options.amountOfAnswers) && (
                        <div>
                            Answers given: {answer.answers.length}
                        </div>
                    )
                }
                {
                    (options.amountByOptions) && (
                        <div>
                            {
                                answer?.options.map((e, i) => {
                                    let counter = answer.answers.flat().reduce((acc, el) => ((el === e)) ? acc + 1 : acc, 0)
                                    return (
                                        <div key={i}>
                                            {e} - {counter}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default StatisticsInput;