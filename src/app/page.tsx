"use client";

import { useEffect } from 'react'; //to delete
import Footer from "../components/footer/Footer";
import Hero from "../components/hero/Hero";
import NavBar from "../components/navBar/NavBar";
import homeStyle from './homeStyle.module.css';
import useLocalStore from '@/utils/store'; // Import the Zustand store

export default function Home() {

  return (
    <>
      <div className={homeStyle['sticky-container']}>
        <NavBar />
      </div>
      <Hero />
      <Footer />
    </>
  );
}
