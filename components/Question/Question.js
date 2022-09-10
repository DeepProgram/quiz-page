import classes from "./Question.module.css"
import {Fragment, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {updateScore} from "../../store/slices/questionListSlice";

const ScoreComponent = () => {
    const score = useSelector(state => state.questionSlice.score)
    return (
        <div className={classes["score-viz"]}>
            <div className={classes["acme-score"]}>
                <span className={classes["score-label"]}>Your Score</span>
                <span className={classes["user-score"]}>{score}</span>
            </div>
        </div>
    )
}

const Question = (props) => {
    const [isOptionAlreadySelected, setIsOptionAlreadySelected] = useState(false)
    const dispatch = useDispatch()
    const chosenOptionHandler = (event) => {
        if (isOptionAlreadySelected || props.isAnswerCorrect!== null) {
            return
        }
        setIsOptionAlreadySelected(true)
        if (event.target.id === props.answer) {
            props.updateScore(1)
            dispatch(updateScore(1))
        } else {
            props.updateScore(0)
        }
    }

    const nextButtonHandler = () => {
        setIsOptionAlreadySelected(false)
        props.nextQuestion()
    }

    const previousButtonHandler = () => {
        props.previousQuestion()
    }

    if (props.questionCount+1 === props.totalQuestionCount) {
        return <ScoreComponent></ScoreComponent>
    }
    let content = ""
    if (props.isAnswerCorrect !== null) {
        content = <Fragment>
            <div className={classes["response-div"]}>
                {props.isAnswerCorrect && <div className={classes["success-msg"]}>
                    <i className={`${classes.fa} ${classes["fa-check"]}`}></i>
                    Correct Answer
                </div>}
                {!props.isAnswerCorrect && <div className={classes["error-msg"]}>
                    <i className={`${classes.fa} ${classes["fa-times-circle"]}`}></i>
                    Wrong Answer
                </div>}
            </div>
        </Fragment>
    }
    // console.log(props.question)
    return (
        <div className={classes.container}>
            <div className={classes["flexbox-container"]}>
                <p className={classes["question-count"]}>{`Question ${props.questionCount + 1} / ${props.totalQuestionCount}`}</p>
                <h3 className={classes["question"]}>{props.question}</h3>
                <div className={classes["option-flex-container"]}>
                    {Object.keys(props.choices).map(key => {
                        return (
                            <div key={key} id={key} onClick={chosenOptionHandler}
                                 className={classes["option-item"]}>{props.choices[key]}</div>
                        )
                    })}
                </div>
                {content}
                <div className={classes["navigation-button"]}>
                    <button onClick={previousButtonHandler} className={classes.button} type="click">Previous</button>
                    <button onClick={nextButtonHandler} className={classes.button} type="click">Next</button>
                </div>
            </div>
        </div>

    )
}

// const Question = (props) => {
//     return (
//         <div className={classes.container}>
//             <div className={classes["flexbox-container"]}>
//                 <p className={classes["question-count"]}>Question 1 / 10</p>
//                 <h3 className={classes["question"]}>What is this question about can you tell?vum bam who are you</h3>
//                 <div className={classes["option-flex-container"]}>
//                     <div className={classes["option-item"]}>OP1</div>
//                     <div className={classes["option-item"]}>OP2</div>
//                     <div className={classes["option-item"]}>OP3</div>
//                     <div className={classes["option-item"]}>OP4 Something More</div>
//                 </div>
//             </div>
//
//         </div>
//
//     )
// }

export default Question