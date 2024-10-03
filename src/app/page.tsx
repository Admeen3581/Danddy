"use client"

import { configDotenv } from "dotenv";
import Footer from "../../components/Footer/Footer";
import Hero from "../../components/Hero/Hero";
import NavBar from "../../components/NavigationBar/NavBar";

export default function Home() {

  return (
    <>
    <NavBar />
    <Hero />
    <Footer/>
    </>
  );
}
