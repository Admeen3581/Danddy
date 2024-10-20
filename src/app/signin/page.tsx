//@Author: Adam Long
//Date: 10/20/24
//Danddy - SCRUM-105

"use client"
import SignInLogic from "../../../components/authorization/SignInLogic";

export default function Home() {

    return (
        <div className="flex-center size-full max-sm:px-6 min-h-screen">
            <SignInLogic/>
        </div>
    );
}
