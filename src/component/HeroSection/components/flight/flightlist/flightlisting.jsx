"use client";

import { useState, useEffect } from "react";
import { useGlobalContext } from "@/app/context/GlobalContext";
import FlightSearchForm from "../../FlightSearchForm";
import Link from "next/link";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Paper,
  Chip,
  Divider,
  Collapse,
  Menu,
  MenuItem
} from "@mui/material";
import FlightDetails from "./FlightDetails";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightIcon from "@mui/icons-material/Flight";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import LuggageIcon from "@mui/icons-material/Luggage";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FlightFilters from "./FlightFilters";



// Main flights data array
const flightsData = [
  {
    id: 1,
    airline: "Qatar Airways",
    airlineShort: "QA",
    flightNumber: "0552",
    departureTime: "05:42 pm",
    arrivalTime: "08:35 pm",
    from: "LAS",
    to: "SEA",
    duration: "2:53",
    stops: 1,
    price: "USD 925.98",
    cabin: "economy",
    baggage: "7 kg",
    checkinBaggage: "23 kg",
    departureDate: "09-01-2026",
    arrivalDate: "09-01-2026",
    departureAirport: "Harry Reid International Airport",
    arrivalAirport: "Seattle-Tacoma International Airport",
    fareRules: {
      cancellation: "Non-refundable",
      changes: "Date changes subject to availability and fees"
    }
  },
  {
    id: 2,
    airline: "Emirates ",
    airlineShort: "EK",
    flightNumber: "203",
    departureTime: "10:30 am",
    arrivalTime: "11:45 pm",
    from: "DXB",
    to: "JFK",
    duration: "14:15",
    stops: 0,
    price: "USD 1200.50",
    cabin: "business",
    baggage: "12 kg",
    checkinBaggage: "40 kg",
    departureDate: "15-01-2026",
    arrivalDate: "15-01-2026",
    departureAirport: "Dubai International Airport",
    arrivalAirport: "John F. Kennedy International Airport",
    fareRules: {
      cancellation: "Partially refundable",
      changes: "Changes allowed with fee"
    }
  },
  {
    id: 3,
    airline: "Qatar Airways",
    airlineShort: "QR",
    flightNumber: "701",
    departureTime: "02:15 pm",
    arrivalTime: "08:30 am",
    from: "DOH",
    to: "LHR",
    duration: "7:15",
    stops: 0,
    price: "USD 850.75",
    cabin: "premium-economy",
    baggage: "10 kg",
    checkinBaggage: "30 kg",
    departureDate: "12-01-2026",
    arrivalDate: "13-01-2026",
    departureAirport: "Hamad International Airport",
    arrivalAirport: "Heathrow Airport",
    fareRules: {
      cancellation: "Refundable with penalty",
      changes: "Free changes up to 24 hours before departure"
    }
  }
];

// ✅ Function to format date for input fields
const formatDateForInput = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};

export default function Flightlisting({ slug = [] }) {
  const { flightSearchData, setSelectedFlight } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(true);
  const [expandedCardId, setExpandedCardId] = useState(null);
  const [selectedFlightData, setSelectedFlightData] = useState(null);
  const [localStorageData, setLocalStorageData] = useState(null);
  const [showFlightSearchForm, setShowFlightSearchForm] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [sortLabel, setSortLabel] = useState("Price: Low to High");

  const openSort = Boolean(anchorEl);
  const handleSortClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleSortClose = (option) => {
    if (typeof option === 'string') {
      setSortLabel(option);
    }
    setAnchorEl(null);
  };

  // ✅ Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('flightSearchData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setLocalStorageData(parsedData);
        console.log("✅ Data loaded from localStorage:", parsedData);
        
        // Automatically show flight search form if data exists
        if (parsedData) {
          setShowFlightSearchForm(true);
        }
      } catch (error) {
        console.error("❌ Error parsing localStorage data:", error);
      }
    }
    setIsLoading(false); // ✅ IMPORTANT: Loading false kar do
  }, []);

  // Use data from global state
  useEffect(() => {
    if (flightSearchData) {
      console.log("Global state data:", flightSearchData);
    }
  }, [flightSearchData]);

  const handleToggleDetails = (flight) => {
    if (expandedCardId === flight.id) {
      setExpandedCardId(null);
      setSelectedFlightData(null);
      setSelectedFlight(null);
    } else {
      setExpandedCardId(flight.id);
      setSelectedFlightData(flight);
      setSelectedFlight(flight);
    }
  };

  // Loading State - Animated Loader
  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
          gap: 3
        }}
      >
        <CircularProgress size={60} thickness={4} />
        <Typography
          variant="h6"
          sx={{ color: "primary.main", fontWeight: 500 }}
        >
          ✈️ Searching for best flights...
        </Typography>
      </Box>
    );
  }

  // Handle case when slug is undefined or empty
  if (!slug || slug.length === 0) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h5">No Search Criteria Provided</Typography>
        <Typography sx={{ mt: 1 }}>
          Please use the flight search form to find flights.
        </Typography>
        <Link 
          href="/" 
          style={{ 
            marginTop: "16px", 
            display: "inline-block",
            color: "#1976d2",
            textDecoration: "underline"
          }}
        >
          Go back to search
        </Link>
      </Box>
    );
  }

  // Extract data from slug array
  const from = slug[0] || "";
  const to = slug[1] || "";
  const trip = slug[2] || "oneway";
  const cabin = slug[3] || "economy";
  const departDate = slug[4] || "";
  const returnDate = slug[5] || "no-return";
  const adults = Number(slug[6] || 1);
  const children = Number(slug[7] || 0);
  const infants = Number(slug[8] || 0);

  return (
    <Box sx={{ 
      maxWidth: { xs: "100%", sm: "100%", md: "820px", lg: "910px" }, 
      mx: "auto", 
      px: { xs: 1.5, sm: 2, md: 3, lg: 3 },
      pb: { xs: 4, sm: 6, md: 8, lg: 8 },
      fontFamily: "'Inter', sans-serif",
      "& .MuiTypography-root": { fontFamily: "inherit" } 
    }}>
     
      {/* ✅ Flight Search Form Component (Top of Page) */}
      <Box sx={{ 
        mb: { xs: 1.5, sm: 2, md: 2, lg: 2 }, 
        mt: { xs: 1.5, sm: 2, md: 2, lg: 2 }, 
        p: { xs: 0, sm: 0, md: 0, lg: 1 },
        border: "1px solid #e0e0e0", 
        borderRadius: { xs: 1, sm: 1.5, md: 2, lg: 2 },
        maxWidth: { xs: "100%", sm: "100%", md: "820px", lg: "910px" }, 
        mx: "auto",
        bgcolor: "white",   
      }}>
        <FlightSearchForm  />
      </Box>

      {/* Main Layout: Filters (Left) + Cards (Right) */}
      <Box sx={{ 
        display: "flex", 
        alignItems: "flex-start",
        flexDirection: { xs: "column", sm: "row", md: "row", lg: "row" },
        gap: { xs: 0, sm: 2, md: 2, lg: 2 }
      }}>
        
        {/* Left: Filters Sidebar  */}
        <Box sx={{ 
          width: { xs: "92%", sm: "20%", md: "20%", lg: "22%" }, 
          display: { xs: "block", sm: "block", md: "block", lg: "block" },
          flexShrink: 0,
          mb: { xs: 2, sm: 0, md: 0, lg: 0 }
        }}>
          <FlightFilters />
        </Box>

      
      <Box
  sx={{
    flex: 1,
    minWidth: 0,
    width: "100%",          // 🔥 THIS IS THE FIX
  }}
>

          {/* Results Header */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "row", sm: "row", md: "row", lg: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "center", sm: "center", md: "center", lg: "center" },
              mb: { xs: 1.5, sm: 2, md: 2, lg: 2 },
              gap: { xs: 1, sm: 0, md: 0, lg: 0 },
              px: { xs: 0, sm: 0, md: 0, lg: 0 },
              maxWidth: { xs: "92%", sm: "94%", md: "605px", lg: "660px" },
              mx: { xs: "auto", sm: 0 },
              ml: { xs: "auto", sm: 4, md: 4, lg: 4 },
              width: "100%"
            }}
          >
            <Box sx={{ 
              alignItems: "center", 
              gap: 1 
            }}>
              <Typography sx={{ fontSize: { xs: "0.65rem", sm: "0.7rem", md: "0.7rem", lg: "0.7rem" }, fontWeight: 700, color:"#1F2937" }}>
                {flightsData.length} Flights
              </Typography>
              <Typography variant="caption" sx={{ color: "rgb(75 85 99 / var(--tw-text-opacity, 1))", fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.8rem", lg: "0.8rem" } }}>
                Found from 2 Supplier(s)
              </Typography>
            </Box>

            <Box sx={{ 
              display: "flex", 
              alignItems: "center", 
              gap: 1,
              width: { xs: "auto", sm: "auto", md: "auto", lg: "auto" },
              justifyContent: { xs: "space-between", md: "flex-end", lg: "flex-end" }
            }}>
              <Typography variant="body2" sx={{ color: "#9CA3AF", fontSize: "0.7rem" }}>
                Sort:
              </Typography>
              <Box
                onClick={handleSortClick}
                sx={{
                  bgcolor: "white",
                  color: "#1F2937",
                  borderRadius: 1.5,
                  px: 1.5,
                  py: 0.8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  fontSize: "0.7rem",
                  fontWeight: 400,
                  border: "1px solid #2368f1ff",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                  width: "113px" // Fixed width matching the menu
                }}
              >
                {sortLabel}
                <ExpandMoreIcon sx={{ fontSize: 14, color: "#6B7280", transform: openSort ? "rotate(180deg)" : "none", transition: "0.2s" }} />
              </Box>
              <Menu
                anchorEl={anchorEl}
                open={openSort}
                onClose={() => handleSortClose()}
                sx={{
                  "& .MuiPaper-root": {
                    borderRadius: 1,
                    mt: 0.5,
                    minWidth: 137,
                    "& .MuiMenuItem-root": {
                      fontSize: "0.7rem",
                      fontWeight: 400,
                      py: 1,
                      "&:hover": {
                        bgcolor: "#0058e6",
                        color: "white",
                      },
                    },
                  }
                }}
              >
                <MenuItem onClick={() => handleSortClose("Price: Low to High")}>
                  Price: Low to High
                </MenuItem>
                <MenuItem onClick={() => handleSortClose("Price: High to Low")}>
                  Price: High to Low
                </MenuItem>
                <MenuItem onClick={() => handleSortClose("Duration")}>
                  Duration
                </MenuItem>
                <MenuItem onClick={() => handleSortClose("Departure Time")}>
                  Departure Time
                </MenuItem>
              </Menu>
            </Box>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column" }}>
            {/* Map through flights data */}
            {flightsData.map((flight) => (
              <Paper
                key={flight.id}
                elevation={0}
                sx={{
                  bgcolor: "white",
                  borderRadius: { xs: 1, sm: 1.5, md: 2, lg: 2 },
                  p: { xs: 1.5, sm: 2, md: 2, lg: 2 },
                  color: "black",
                  mb: { xs: 1.5, sm: 2, md: 2, lg: 2 },
                  maxWidth: { xs: "92%", sm: "500px", md: "580px", lg: "630px" },
                  width: "92%",
                  mx: { xs: "auto", sm: 0 },
                  ml: { xs: "auto", sm: "auto", md: "auto", lg: "auto" },
                  border: "1px solid #e0e0e0",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  }
                }}
              >

            {/* Main Content Row */}
            <Box
              sx={{
                display: "flex",
                alignItems: { xs: "flex-start", sm: "center", md: "center", lg: "center" },
                justifyContent: "space-between",
                flexDirection: { xs: "column", sm: "row", md: "row", lg: "row" },
                flexWrap: { xs: "nowrap", sm: "wrap", md: "wrap", lg: "wrap" },
                gap: { xs: 1, sm: 1.5, md: 1.5, lg: 1.5 }
              }}
            >
              {/* Airline Info */}
              <Box sx={{ 
                display: "flex", 
                flexDirection: { xs: "column", sm: "column", md: "column", lg: "column" }, 
                alignItems: { xs: "center", sm: "flex-start", md: "flex-start", lg: "flex-start" }, 
                gap: 1, 
                minWidth: { xs: "auto", sm: 80, md: 80, lg: 80 },
                width: { xs: "100%", sm: "auto", md: "auto", lg: "auto" },
                justifyContent: { xs: "center", sm: "flex-start", md: "flex-start", lg: "flex-start" }
              }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      bgcolor: "#F3F4F6",
                      borderRadius: 1.5,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid #E5E7EB"
                    }}
                  >
                  <Typography variant="caption" sx={{ color: "#0c2e57ff", fontStyle: "italic", fontSize: "0.7rem"}}>
                    {flight.airlineShort}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: { xs: "center", sm: "left" } }}>
                  <Typography sx={{ fontWeight: 600, fontSize: "0.75rem", lineHeight: 1.2, color:"rgb(17 24 39 / var(--tw-text-opacity, 1))" }}>
                    {flight.airline}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#6B7280", fontWeight: 600,fontSize: "0.6rem", display: "block", textAlign: "left"  }}>
                    {flight.flightNumber}
                  </Typography>
                </Box>
              </Box>

              {/* Flight Route & Times */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: { xs: 1, sm: 2, md: 2, lg: 2 },
                  flex: 1,
                  justifyContent: "center",
                  width: { xs: "100%", sm: "auto", md: "auto", lg: "auto" },
                  flexWrap: { xs: "nowrap", sm: "nowrap", md: "nowrap", lg: "nowrap" },
                  my: { xs: 1, sm: 0, md: 0, lg: 0 }
                }}
              >
                {/* Departure */}
                <Box sx={{ textAlign: "center" }}>
                  <Typography sx={{ fontSize: "0.7rem",color:"#1F2937" }}>
                    {flight.departureTime}
                  </Typography>
                  <Typography sx={{ my: 0, color:"rgb(55 65 81 / var(--tw-text-opacity, 1))",fontWeight:"600", fontSize: "0.7rem" }}>{flight.from}</Typography>
                  <Typography variant="caption" sx={{ color: "#6B7280", fontSize: "0.6rem" }}>
                    {flight.departureDate}
                  </Typography>
                </Box>

                {/* Arrow & Duration */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, position: "relative", minWidth: "130px" }}>
                  <FlightTakeoffIcon sx={{ color: "#9CA3AF", fontSize: 16, zIndex: 1 }} />
                  
                  {/* Connecting Line */}
                  <Box 
                    sx={{ 
                      position: "absolute", 
                      left: "21px", 
                      right: "21px", 
                      top: "53%", 
                      height: "1px", 
                      bgcolor: "#E5E7EB", 
                      zIndex: 0 
                    }} 
                  />

                  <Box sx={{ textAlign: "center", flex: 1, zIndex: 1 }}>
                    <Typography variant="caption" sx={{ color: "#6B7280", px: 0.5, fontSize:"0.5rem" }}>
                      {flight.duration}
                    </Typography>
                    <Box
                      sx={{
                        width: 18,
                        height: 18,
                        bgcolor: "#0b66f9",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "1px solid #1976d2",
                        my: 0.25,
                        mx: "auto"
                      }}
                    >
                      <FlightIcon sx={{ fontSize: "0.8rem", color: "white", transform: "rotate(0deg)" }} />
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0.25 }}>
                      <AccessTimeIcon sx={{ fontSize: "0.5rem", color: "#EA580C" }} />
                      <Typography variant="caption" sx={{ color: "#EA580C", fontSize: "0.5rem"}}>
                        {flight.stops === 0 ? '1 Stop' : `${flight.stops} Stop${flight.stops > 1 ? 's' : ''}`}
                      </Typography>
                    </Box>
                  </Box>
                  <FlightLandIcon sx={{ color: "#9CA3AF", fontSize: 16, zIndex: 1 }} />
                </Box>

                {/* Arrival */}
                <Box sx={{ textAlign: "center" }}>
                  <Typography sx={{fontSize: "0.7rem",color:"#1F2937" }}>
                    {flight.arrivalTime}
                  </Typography>
                  <Typography sx={{ color:"rgb(55 65 81 / var(--tw-text-opacity, 1))",fontWeight:"600", fontSize: "0.7rem"  }}>{flight.to}</Typography>
                  <Typography variant="caption" sx={{ color: "#6B7280", fontSize: "0.6rem" }}>
                    {flight.arrivalDate}
                  </Typography>
                </Box>
              </Box>

              {/* Price & Book Button */}
              <Box sx={{ 
                textAlign: { xs: "center", sm: "right", md: "right", lg: "right" }, 
                minWidth: { xs: "100%", sm: 120, md: 120, lg: 120 },
                display: "flex",
                flexDirection: { xs: "column", sm: "column", md: "column", lg: "column" },
                justifyContent: { xs: "center", sm: "flex-start", md: "flex-start", lg: "flex-start" },
                alignItems: { xs: "center", sm: "flex-end", md: "flex-end", lg: "flex-end" },
                gap: { xs: 1, sm: 0, md: 0, lg: 0 }
              }}>
                <Typography variant="caption" sx={{ color: "#6B7280", display: "block", fontSize: { xs: "0.65rem", sm: "0.7rem", md: "0.7rem", lg: "0.7rem" } }}>
                  Total
                </Typography>
                <Typography sx={{ fontSize: { xs: "0.9rem", sm: "1rem", md: "1rem", lg: "1rem" }, fontWeight: 600, mb:1 }}>
                  {flight.price}
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<FlightTakeoffIcon sx={{ fontSize: 16 }} />}
                  sx={{ borderRadius: 1.5,background:"#0b66f9", fontSize: "0.8rem", textTransform: "none", py: 0.5 }}
                >
                  Book Now
                </Button>
              </Box>
            </Box>

            {/* Bottom Tags Row */}
            <Divider sx={{ my: { xs: 1, sm: 1.5, md: 1.5, lg: 1.5 }, borderColor: "#9CA3AF", opacity: 0.2 }} />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: { xs: "column", sm: "row", md: "row", lg: "row" },
                gap: { xs: 1, sm: 0, md: 0, lg: 0 },
                alignItems: { xs: "flex-start", sm: "center", md: "center", lg: "center" }
              }}
            >
              <Box sx={{ 
                display: "flex", 
                alignItems: "center", 
                gap: 1,
                flexWrap: { xs: "wrap", sm: "nowrap", md: "nowrap", lg: "nowrap" }
              }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <WorkOutlineIcon sx={{ fontSize: 16, color: "#4B5563" }} />
                  <Typography variant="caption" sx={{ color: "#4B5563" }}>
                    {flight.baggage}
                  </Typography>
                  <LuggageIcon sx={{ fontSize: 14, color: "#4B5563 !important" }} />
                </Box>
                <Chip
                  label={flight.cabin}
                  size="small"
                  sx={{ bgcolor: "#EFF6FF", color: "#1D4ED8", height: 20, fontSize: "0.7rem", borderRadius: 1 }}
                />
                <Chip
                  label="DUFFEL"
                  size="xs"
                  icon={<LuggageIcon sx={{ fontSize: 12, color: "#7E22CE !important" }} />}
                  sx={{ bgcolor: "#FAF5FF", color: "#7E22CE", height: 18, fontSize: "0.6rem", borderRadius: 1}}
                />
              </Box>
              <Button
                size="small"
                endIcon={<ExpandMoreIcon sx={{ fontSize: 16, transform: expandedCardId === flight.id ? "rotate(180deg)" : "rotate(0deg)", transition: "0.3s" }} />}
                sx={{ color: "#2563EB", textTransform: "none", fontSize: "0.8rem", p: 0 }}
                onClick={() => handleToggleDetails(flight)}
              >
                {expandedCardId === flight.id ? "Hide" : "Details"}
              </Button>
            </Box>
            <Collapse in={expandedCardId === flight.id} timeout="auto" unmountOnExit>
              <FlightDetails 
                onClose={() => setExpandedCardId(null)} 
                selectedFlightData={selectedFlightData}
              />
            </Collapse>
          </Paper>
        ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}