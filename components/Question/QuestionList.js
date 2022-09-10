import {useEffect, useState} from "react";
import Question from "./Question";
import {console} from "next/dist/compiled/@edge-runtime/primitives/console";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentQuestionNo, setIsAnswerCorrect} from "../../store/slices/questionListSlice";
import question from "./Question";

const QuestionList = (props) => {
    const questionList = useSelector(state => state.questionSlice.questionList)
    const currentQuestion = useSelector(state => state.questionSlice.currentQuestion)
    const currentQuestionNo = useSelector(state => state.questionSlice.currentQuestionNo)
    const totalQuestionNo = useSelector(state => state.questionSlice.totalQuestionNo)
    const dispatch = useDispatch()

    // console.log(questionList)

    const showNextQuestionHandler = ()=>{
        if (currentQuestionNo+1 < totalQuestionNo){
            dispatch(setCurrentQuestionNo(currentQuestionNo+1))
        }
    }

    const showPreviousQuestion = () => {
        if (currentQuestionNo-1 >= 0){
            dispatch(setCurrentQuestionNo(currentQuestionNo-1))
        }
    }

    const updateScore = (increaseScore) => {
        if (increaseScore === 1) {
            dispatch(setIsAnswerCorrect(true))
        }
        else if (increaseScore === 0){
            dispatch(setIsAnswerCorrect(false))
        }
    }

    return (
        <Question id={currentQuestion.id} question={currentQuestion.question} isAnswerCorrect={currentQuestion.isAnswerCorrect}
                  choices={currentQuestion.choices}
                  answer={currentQuestion.answer} questionCount={currentQuestionNo} totalQuestionCount={totalQuestionNo}
                  nextQuestion={showNextQuestionHandler}
                  previousQuestion={showPreviousQuestion}
                  updateScore={updateScore}
        ></Question>
    )
    // return (
    //     <div>Something</div>
    // )
}
export default QuestionList