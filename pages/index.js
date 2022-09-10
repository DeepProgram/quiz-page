import Link from "next/link";
import Navbar from "../components/Header/Navbar";
import Head from "next/head";
import {Fragment} from "react";
import Script from "next/script";
import HomeComponent from "../components/Home/Home";
export default function Home() {
    return (
        <Fragment>
            <Script src="https://kit.fontawesome.com/5b61822651.js" crossOrigin="anonymous"></Script>
            <Navbar></Navbar>
            <HomeComponent></HomeComponent>
        </Fragment>
    )
}
