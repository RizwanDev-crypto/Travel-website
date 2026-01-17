"use client";
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
    
    <main>
         <HeroSection/>
     <FeaturedFlights/>
     <FeaturedHotels/>
     <FeaturedTours/>
<RecommendedCars/>
     <BottomCards />
     <AppStore/>
    </main>
    
    </div>
  );
}

