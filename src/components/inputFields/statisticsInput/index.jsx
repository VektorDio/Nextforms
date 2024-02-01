import React, {useState} from 'react';
import styles from "./statistics.module.css";
import SelectInput from "@/components/inputFields/selectInput";
import CheckboxInput from "@/components/inputFields/checkboxInput";

const StatisticsInput = ({answers}) => {
    const [question, setQuestion] = useState()
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
                <SelectInput
                    placeholder={"Select questions"}
                    instanceId={"select-questions"}
                    options={optionsArray}
                    onChange={(choice)=> setQuestion(answers[choice.value])}
                    isSearchable={false}
                />
            </div>
            <div className={styles.checkboxContainer}>
                {
                    (question) && (
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
                        <div> Answers given: {question.answers.length} </div>
                    )
                }
                <div>
                {
                    (options.amountByOptions) && (
                        question.options.map((e, i) => {
                            let counter = question.answers.flat().reduce((acc, el) => ((el === e)) ? acc + 1 : acc, 0)
                            return (
                                <div key={i}>
                                    {e} - {counter}
                                </div>
                            )
                        })
                    )
                }
                </div>
            </div>
        </div>
    );
};

export default StatisticsInput;