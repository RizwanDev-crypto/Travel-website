"use client";
import Header from "@/component/Header";
import Footer from "@/component/Footer";
import HeroSection from "@/component/HeroSection";
import FeaturedFlights from "@/component/FeaturedSection/FeaturedFlights";
import FeaturedHotels from "@/component/FeaturedSection/FeaturedHotels";
import FeaturedTours from "@/component/FeaturedSection/FeaturedTours";
import RecommendedCars from "@/component/FeaturedSection/RecommendedCars";
import BottomCards from  "@/component/FeaturedSection/BottomCards";
import AppStore from "@/component/FeaturedSection/AppStore";

export default function Home() {
  return (

    <div> 
     <Header/>
    <main>
         <HeroSection/>
     <FeaturedFlights/>
     <FeaturedHotels/>
     <FeaturedTours/>
<RecommendedCars/>
     <BottomCards />
     <AppStore/>
    </main>
     <Footer/>
    </div>
  );
}

