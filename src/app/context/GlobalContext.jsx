"use client";

import { createContext, useContext, useEffect, useState } from "react";

// Create Context
const GlobalContext = createContext();

// Custom Hook
export const useGlobalContext = () => useContext(GlobalContext);

// Provider Component
export const GlobalProvider = ({ children }) => {
  const [flightSearchData, setFlightSearchData] = useState(null);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [hotelSearchData, setHotelSearchData] = useState(null);

  // ✅ Load data from localStorage when app starts (refresh safe)
  useEffect(() => {
    const savedSearch = localStorage.getItem("flightSearchData");
    if (savedSearch) {
      setFlightSearchData(JSON.parse(savedSearch));
    }

    const savedFlight = localStorage.getItem("selectedFlight");
    if (savedFlight) {
      setSelectedFlight(JSON.parse(savedFlight));
    }

    const savedHotel = localStorage.getItem("hotelSearchData");
    if (savedHotel) {
      setHotelSearchData(JSON.parse(savedHotel));
    }
  }, []);

  // ✅ Sync flightSearchData to localStorage
  useEffect(() => {
    if (flightSearchData) {
      localStorage.setItem(
        "flightSearchData",
        JSON.stringify(flightSearchData)
      );
    }
  }, [flightSearchData]);

  // ✅ Sync selectedFlight to localStorage
  useEffect(() => {
    if (selectedFlight) {
      localStorage.setItem(
        "selectedFlight",
        JSON.stringify(selectedFlight)
      );
    }
  }, [selectedFlight]);

  // ✅ Sync hotelSearchData to localStorage
  useEffect(() => {
    if (hotelSearchData) {
      localStorage.setItem(
        "hotelSearchData",
        JSON.stringify(hotelSearchData)
      );
    }
  }, [hotelSearchData]);

  return (
    <GlobalContext.Provider
      value={{
        flightSearchData,
        setFlightSearchData,
        selectedFlight,
        setSelectedFlight,
        hotelSearchData,
        setHotelSearchData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
