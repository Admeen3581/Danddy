//@Author: Adam Long
//Date: 10/20/24
//Danddy - SCRUM-105

"use client"
import SignUpLogic from "../../../components/authorization/SignUpLogic";

export default function Home() {

    return (
        <div className="flex-center size-full max-sm:px-6 min-h-screen">
            <SignUpLogic/>
        </div>
    );
}
