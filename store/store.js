import {configureStore} from "@reduxjs/toolkit";
import questionListSlice from "./slices/questionListSlice";

const store = configureStore({
    reducer: {
        questionSlice: questionListSlice
    }
})

export default store