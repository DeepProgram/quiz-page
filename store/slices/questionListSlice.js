import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    questionList: [],
    currentQuestion: {},
    currentQuestionNo: null,
    totalQuestionNo:null,
    score: null
}

const questionListSlice = createSlice({
    name: "question",
    initialState,
    reducers: {
        updateInitialState: (state, action)=>{
            state.questionList = action.payload.questionList.map(questionObj =>{
                return {...questionObj, isAnswerCorrect: null}
            })
            state.currentQuestion = {...action.payload.questionList[0], isAnswerCorrect: null}
            state.currentQuestionNo = 0
            state.score = 0
            state.totalQuestionNo = action.payload.questionList.length
        },
        setIsAnswerCorrect: (state, action)=>{
            const isAnswerCorrect = action.payload
            state.questionList[state.currentQuestionNo].isAnswerCorrect = isAnswerCorrect
            state.currentQuestion.isAnswerCorrect = isAnswerCorrect
        },
        setCurrentQuestionNo: (state, action)=>{
            state.currentQuestionNo = action.payload
            state.currentQuestion = state.questionList[action.payload]
        },
        updateScore: (state, action) => {
            state.score += action.payload
        }
    }
})

export default questionListSlice.reducer
export const {updateInitialState, setIsAnswerCorrect, setCurrentQuestionNo, updateScore} = questionListSlice.actions