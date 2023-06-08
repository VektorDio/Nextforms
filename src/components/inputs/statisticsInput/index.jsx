import React, {useState} from 'react';
import styles from "./statistics.module.css";
import Select from "@/components/inputs/selectInput";
import CheckboxInput from "@/components/inputs/checkboxInput";

const StatisticsInput = ({answers}) => {
    const [answer, setAnswer] = useState(answers[0])
    const [options, setOptions] = useState({
        amountOfAnswers: false,
        amountByOptions: false,
        //sumOfAnswers: false,
    })

    return (
        <div>
            <div className={styles.selectContainer}>
                <Select defaultValue={"placeholder"} onChange={(e)=> setAnswer(answers[e.target.value])}>
                    {
                        (answer === undefined) ? <option key={"placeholder"} value={"placeholder"}>Виберіть питання</option> : null
                    }
                    {
                        answers?.map((ans, i) => (
                            <option key={i} value={i}>{ans.question}</option>
                        ))
                    }
                </Select>
            </div>
            <div className={styles.checkboxContainer}>
                {
                    (answer) ? (
                        <>
                            <CheckboxInput
                                text={"Кількість відповідей"}
                                onChange={() => setOptions({...options, amountOfAnswers: !options.amountOfAnswers})}
                            />
                            <CheckboxInput
                                text={"Кількість обраних варіантів"}
                                onChange={() => setOptions({...options, amountByOptions: !options.amountByOptions})}
                            />
                        </>
                    ) : null
                }
            </div>
            <div className={styles.statisticsContainer}>
                {
                    (options.amountOfAnswers) ? (
                        <div>
                            Надано відповідей: {answer.answers.length}
                        </div>
                    ) : null
                }
                {
                    (options.amountByOptions) ? (
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
                    ) : null
                }
            </div>
        </div>
    );
};

export default StatisticsInput;