import classes from "./Question.module.css"
import {Fragment} from "react";
import {useDispatch} from "react-redux";
import {updateScore} from "../../store/slices/questionListSlice";

const Question = (props) => {
    const dispatch = useDispatch()
    const chosenOptionHandler = (event) => {
        if (props.isAnswerCorrect!== null) {
            return
        }
        if (event.target.id === props.answer) {
            props.updateScore(1)
            dispatch(updateScore(1))
        } else {
            props.updateScore(0)
        }
    }

    const nextButtonHandler = () => {
        props.nextQuestion()
    }

    const previousButtonHandler = () => {
        props.previousQuestion()
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
                    {props.questionCount>0 && <button onClick={previousButtonHandler} className={classes.button} type="click">Previous</button>}
                    {props.isAnswerCorrect!==null && <button onClick={nextButtonHandler} className={classes.button} type="click">Next</button>}
                </div>
            </div>
        </div>

    )
}

export default Question