import { updatePlayerData } from "@/utils/httpRequester";
import Footer from "../../components/Footer/Footer";
import Hero from "../../components/Hero/Hero";
import NavBar from "../../components/NavigationBar/NavBar";

export default function Home() {

    const playerData = {
      name: "Sally",
      score: 120,
      isActive: true
  };

  updatePlayerData('123', playerData);

  return (
    <>
    <NavBar />
    <Hero />
    <Footer/>
    </>
  );
}
