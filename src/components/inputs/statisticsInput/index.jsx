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
                <Select defaultValue={"Placeholder"} onChange={(e)=> setAnswer(answers[e.target.value])}>
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
                                text={"Show answers given"}
                                onChange={() => setOptions({...options, amountOfAnswers: !options.amountOfAnswers})}
                            />
                            <CheckboxInput
                                text={"Show options chosen"}
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
                            Answers provided: {answer.answers.length}
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
                                            Option {e} selected {counter} time(s)
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