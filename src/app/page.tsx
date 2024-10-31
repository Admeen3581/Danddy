"use client";

import { useEffect } from 'react'; //to delete
import Footer from "../../components/Footer/Footer";
import Hero from "../../components/Hero/Hero";
import NavBar from "../../components/NavigationBar/NavBar";
import homeStyle from './homeStyle.module.css';
import useLocalStore from '@/utils/store'; // Import the Zustand store

export default function Home() {
  const { userId } = useLocalStore(); // Access the userId state from the store //to delete 

  // Log the userId to the console whenever it changes
  useEffect(() => { //to delete
    console.log('Current userId:', userId); //to delete
  }, [userId]); //to delete
 
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
