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
  const [tourSearchData, setTourSearchData] = useState(null);
  const [carSearchData, setCarSearchData] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);
  const [visaSearchData, setVisaSearchData] = useState(null);

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

    const savedTour = localStorage.getItem("tourSearchData");
    if (savedTour) {
      setTourSearchData(JSON.parse(savedTour));
    }

    const savedCar = localStorage.getItem("carSearchData");
    if (savedCar) {
      setCarSearchData(JSON.parse(savedCar));
    }

    const savedSelectedCar = localStorage.getItem("selectedCar");
    if (savedSelectedCar) {
      setSelectedCar(JSON.parse(savedSelectedCar));
    }

    const savedVisa = localStorage.getItem("visaSearchData");
    if (savedVisa) {
      setVisaSearchData(JSON.parse(savedVisa));
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

  // ✅ Sync tourSearchData to localStorage
  useEffect(() => {
    if (tourSearchData) {
      localStorage.setItem(
        "tourSearchData",
        JSON.stringify(tourSearchData)
      );
    }
  }, [tourSearchData]);

  // ✅ Sync carSearchData to localStorage
  useEffect(() => {
    if (carSearchData) {
      localStorage.setItem(
        "carSearchData",
        JSON.stringify(carSearchData)
      );
    }
  }, [carSearchData]);

  // ✅ Sync selectedCar to localStorage
  useEffect(() => {
    if (selectedCar) {
      localStorage.setItem(
        "selectedCar",
        JSON.stringify(selectedCar)
      );
    }
  }, [selectedCar]);

  // ✅ Sync visaSearchData to localStorage
  useEffect(() => {
    if (visaSearchData) {
      localStorage.setItem(
        "visaSearchData",
        JSON.stringify(visaSearchData)
      );
    }
  }, [visaSearchData]);

  return (
    <GlobalContext.Provider
      value={{
        flightSearchData,
        setFlightSearchData,
        selectedFlight,
        setSelectedFlight,
        hotelSearchData,
        setHotelSearchData,
        tourSearchData,
        setTourSearchData,
        carSearchData,
        setCarSearchData,
        selectedCar,
        setSelectedCar,
        visaSearchData,
        setVisaSearchData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
