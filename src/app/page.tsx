"use client";

import React, { useEffect } from 'react';
import Footer from "../components/footer/Footer";
import Hero from "../components/hero/Hero";
import NavBar from "../components/navBar/NavBar";
import homeStyle from './homeStyle.module.css';
import useLocalStore from '@/utils/store';
import { useRouter } from "next/navigation";

export default function Home() {
    const { userId, setRoomId } = useLocalStore();
    const router = useRouter();

    useEffect(() => {
        setRoomId("");
    }, [setRoomId]);

    if (!userId) {
        router.push("./signin");
    }

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
