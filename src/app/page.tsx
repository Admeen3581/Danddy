"use client"

import Footer from "../../components/Footer/Footer";
import Hero from "../../components/Hero/Hero";
import NavBar from "../../components/NavigationBar/NavBar";
import homeStyle from './homeStyle.module.css'

export default function Home() {

  return (
    <>
    <div className={homeStyle['sticky-container']}>
      <NavBar />
    </div>
    <Hero />
    <Footer/>
    </>
  );
}
