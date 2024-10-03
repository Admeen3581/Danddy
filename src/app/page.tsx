"use client"

import useLocalStore from "@/utils/store";
import Footer from "../../components/Footer/Footer";
import Hero from "../../components/Hero/Hero";
import NavBar from "../../components/NavigationBar/NavBar";
import { useEffect } from "react";

export default function Home() {

  const {roomId, setRoomId} = useLocalStore()

  useEffect(() => {
    setRoomId("123");
  }, [setRoomId]);
  
  console.log(roomId)

  return (
    <>
    <NavBar />
    <Hero />
    <Footer/>
    </>
  );
}
