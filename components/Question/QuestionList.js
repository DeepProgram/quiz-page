import Question from "./Question";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentQuestionNo, setIsAnswerCorrect} from "../../store/slices/questionListSlice";
import {Fragment} from "react";
import classes from "./QuestionList.module.css";

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

const QuestionList = () => {
    const currentQuestion = useSelector(state => state.questionSlice.currentQuestion)
    const currentQuestionNo = useSelector(state => state.questionSlice.currentQuestionNo)
    const totalQuestionNo = useSelector(state => state.questionSlice.totalQuestionNo)
    const dispatch = useDispatch()

    const showNextQuestionHandler = () => {
        if (currentQuestionNo + 1 <= totalQuestionNo) {
            dispatch(setCurrentQuestionNo(currentQuestionNo + 1))
        }
    }

    const showPreviousQuestion = () => {
        if (currentQuestionNo - 1 >= 0) {
            dispatch(setCurrentQuestionNo(currentQuestionNo - 1))
        }
    }

    const updateScore = (increaseScore) => {
        if (increaseScore === 1) {
            dispatch(setIsAnswerCorrect(true))
        } else if (increaseScore === 0) {
            dispatch(setIsAnswerCorrect(false))
        }
    }

    if (currentQuestionNo === totalQuestionNo) {
        return <ScoreComponent></ScoreComponent>
    }

    return (
        <Fragment>
            {totalQuestionNo !== 0 && <Question id={currentQuestion.id} question={currentQuestion.question}
                                                isAnswerCorrect={currentQuestion.isAnswerCorrect}
                                                choices={currentQuestion.choices}
                                                answer={currentQuestion.answer} questionCount={currentQuestionNo}
                                                totalQuestionCount={totalQuestionNo}
                                                nextQuestion={showNextQuestionHandler}
                                                previousQuestion={showPreviousQuestion}
                                                updateScore={updateScore}
            ></Question>}
        </Fragment>
    )
}
export default QuestionList