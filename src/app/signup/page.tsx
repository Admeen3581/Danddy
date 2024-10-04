"use client"
import InputField from "../../../components/SignUp/InputField";

export default function Home() {

  return (
    <>
      <InputField type={""} placeholder={""} value={""} onChange={function (value: string): void {
           throw new Error("Function not implemented.");
        } }/>
    </>
  );
}
