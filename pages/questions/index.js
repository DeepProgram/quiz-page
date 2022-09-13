import {Fragment, useEffect, useState} from "react";
import QuestionList from "../../components/Question/QuestionList";
import axios from "axios";
import {console} from "next/dist/compiled/@edge-runtime/primitives/console";
import Navbar from "../../components/Header/Navbar";
import Script from "next/script";
import {useDispatch, useSelector} from "react-redux";
import {updateInitialState} from "../../store/slices/questionListSlice";

const QuestionsHome = (props) => {
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(updateInitialState({
            questionList: props.questionList
        }))
    })
    return (
        <Fragment>
            <Script src="https://kit.fontawesome.com/5b61822651.js" crossOrigin="anonymous"></Script>
            <Navbar></Navbar>
            <QuestionList></QuestionList>
        </Fragment>
    )
}

export async function getStaticProps() {
    const questionList = []
    try {
        const responseData = (await axios.get("https://johnmeade-webdev.github.io/chingu_quiz_api/trial.json")).data
        for (const question of responseData) {
            if (question["topic"] === "html") questionList.push(question)

        }
    } catch (err) {
        console.log("Error Fetching Question Data From API On GetStaticProps Fro")
    }
    return {
        props: {
            questionList: questionList,
        },
        revalidate: 1,
    }
}

export default QuestionsHome