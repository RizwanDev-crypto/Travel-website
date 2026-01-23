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
import BaggageSelection from "./BaggageSelection";
import FlightBooking from "../FlightBooking/FlightBooking";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightIcon from "@mui/icons-material/Flight";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import LuggageIcon from "@mui/icons-material/Luggage";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FlightFilters from "./FlightFilters";



export default function Flightlisting({ slug = [] }) {
  const { flightSearchData, setSelectedFlight } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(true);
  const [flights, setFlights] = useState([]);
  const [flightNumberFilter, setFlightNumberFilter] = useState("");
  const [priceRange, setPriceRange] = useState([425, 10000]);
  const [selectedStops, setSelectedStops] = useState([]);
  const [selectedAirlines, setSelectedAirlines] = useState([]);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]); // ✅ Added time slots state
  const [expandedCardId, setExpandedCardId] = useState(null);
  const [selectedFlightData, setSelectedFlightData] = useState(null);
  const [localStorageData, setLocalStorageData] = useState(null);
  const [showFlightSearchForm, setShowFlightSearchForm] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [sortLabel, setSortLabel] = useState("Price: Low to High");
  const [showBaggageSelection, setShowBaggageSelection] = useState(null); // Track which flight shows baggage selection
  const [showBookingForm, setShowBookingForm] = useState(false); // Track if booking form should be shown
  const [selectedBaggageOption, setSelectedBaggageOption] = useState(null); // Track selected baggage option
  const [visibleFlights, setVisibleFlights] = useState(10); // ✅ Added pagination state

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

  // ✅ Fetch flights from API
  useEffect(() => {
    const fetchFlights = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/flights');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setFlights(data);
      } catch (error) {
        console.error("Error fetching flights:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFlights();
  }, []);

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
      setShowBaggageSelection(null); // Hide baggage selection when collapsing
    } else {
      setExpandedCardId(flight.id);
      setSelectedFlightData(flight);
      setSelectedFlight(flight);
      setShowBaggageSelection(null); // Reset baggage selection to show FlightDetails first
    }
  };

  const handleBookNow = (flight) => {
    setExpandedCardId(flight.id);
    setSelectedFlightData(flight);
    setSelectedFlight(flight);
    setShowBaggageSelection(flight.id); // Show baggage selection for this flight
  };

  const handleBaggageSelect = (option) => {
    console.log("Selected baggage option:", option);
    setSelectedBaggageOption(option);
    setShowBookingForm(true);
    // Hide other sections
    setShowBaggageSelection(null);
    setExpandedCardId(null);
  };

  // ✅ Combined Filtering & Sorting Logic
  const filteredFlights = flights
    .filter(flight => {
      // Flight Number Filter
      const matchesFlightNumber = flight.flightNumber.toLowerCase().includes(flightNumberFilter.toLowerCase());
      
      // Price Filter
      const priceValue = parseFloat(flight.price.replace(/[^\d.]/g, ''));
      const matchesPrice = priceValue >= priceRange[0] && priceValue <= priceRange[1];

      // Stops Filter
      const matchesStops = selectedStops.length === 0 || 
        (selectedStops.includes("Direct") && flight.stops === 0) ||
        (selectedStops.includes("1 Stop") && flight.stops === 1) ||
        (selectedStops.includes("2+ Stops") && flight.stops >= 2);

      // Airlines Filter
      const matchesAirline = selectedAirlines.length === 0 || selectedAirlines.includes(flight.airline);

      // Time Slot Filter
      const matchesTime = selectedTimeSlots.length === 0 || selectedTimeSlots.some(slot => {
        const time = flight.departureTime.toLowerCase();
        const isPM = time.includes('pm');
        let [hours] = time.replace(/[^\d:]/g, '').split(':').map(Number);
        if (isPM && hours < 12) hours += 12;
        if (!isPM && hours === 12) hours = 0;

        if (slot === "Early Morning") return hours >= 0 && hours < 6;
        if (slot === "Morning") return hours >= 6 && hours < 12;
        if (slot === "Afternoon") return hours >= 12 && hours < 18;
        if (slot === "Evening") return hours >= 18 && hours < 24;
        return false;
      });

      return matchesFlightNumber && matchesPrice && matchesStops && matchesAirline && matchesTime;
    })
    .sort((a, b) => {
      // Apply sorting based on sortLabel
      const priceA = parseFloat(a.price.replace(/[^\d.]/g, ''));
      const priceB = parseFloat(b.price.replace(/[^\d.]/g, ''));
      
      if (sortLabel === "Price: Low to High") return priceA - priceB;
      if (sortLabel === "Price: High to Low") return priceB - priceA;
      // You can add more sorting logic for Duration and Departure Time here
      return 0;
    });

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
        <FlightSearchForm calendarWidth={{ xs: "100%", md: 172, lg: 233, xl: 232 }} />
      </Box>

      {/* Main Layout: Filters (Left) + Cards (Right) OR Booking Form */}
      {showBookingForm ? (
        <FlightBooking 
          flight={selectedFlightData}
          selectedBaggage={selectedBaggageOption}
          adults={adults}
          children={children}
          infants={infants}
          onBack={() => setShowBookingForm(false)}
        />
      ) : (
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
          <FlightFilters 
            flightCount={filteredFlights.length} 
            flightNumberFilter={flightNumberFilter}
            onFlightNumberChange={setFlightNumberFilter}
            priceRange={priceRange}
            onPriceChange={setPriceRange}
            selectedStops={selectedStops}
            onStopsChange={setSelectedStops}
            selectedAirlines={selectedAirlines}
            onAirlinesChange={setSelectedAirlines}
            airlinesList={[...new Set(flights.map(f => f.airline))]}
            selectedTimeSlots={selectedTimeSlots}
            onTimeSlotChange={setSelectedTimeSlots}
          />
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
                {flights.length} Flights
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
            {/* Map through filtered flights data */}
            {filteredFlights.slice(0, visibleFlights).map((flight) => (
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
                alignItems: { xs: "center", sm: "center", md: "center", lg: "center" },
                justifyContent: "space-between",
                flexDirection: { xs: "column", sm: "row", md: "row", lg: "row" },
                gap: { xs: 4, sm: 2, md: 2, lg: 2 }
              }}
            >
              {/* Airline Info */}
              <Box sx={{ 
                display: "flex", 
                flexDirection: { xs: "column", sm: "row" },
                alignItems: "center", 
                gap: 1.5, 
                width: { xs: "100%", sm: 130, md: 130, lg: 150 }, // Fixed width across all cards
                flexShrink: 0,
                justifyContent: { xs: "center", sm: "flex-start" }
              }}>
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      bgcolor: "#F3F4F6",
                      borderRadius: 1.5,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid #E5E7EB",
                      flexShrink: 0
                    }}
                  >
                  <Typography variant="caption" sx={{ color: "#0c2e57ff", fontStyle: "italic", fontSize: "0.65rem"}}>
                    {flight.airlineShort}
                  </Typography>
                </Box>
                <Box sx={{ minWidth: 0 }}>
                  <Typography sx={{ 
                    fontWeight: 600, 
                    fontSize: "0.75rem", 
                    lineHeight: 1.2, 
                    color: "rgb(17 24 39)",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis" // Prevents shifting
                  }}>
                    {flight.airline}
                  </Typography>
                  <Typography sx={{ color: "#6B7280", fontWeight: 600, fontSize: "0.6rem", display: "block" }}>
                    {flight.flightNumber}
                  </Typography>
                </Box>
              </Box>

              {/* Flight Route & Times */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: { xs: 1, sm: 2, md: 2, lg: 3 },
                  flex: 1,
                  justifyContent: "center", // This stays perfectly centered
                  minWidth: 0,
                }}
              >
                {/* Departure */}
                <Box sx={{ textAlign: "right", minWidth: 60 }}>
                  <Typography sx={{ fontSize: "0.75rem", fontWeight: 700, color: "#1F2937" }}>
                    {flight.departureTime}
                  </Typography>
                  <Typography sx={{ color: "#4B5563", fontWeight: 600, fontSize: "0.7rem" }}>{flight.from}</Typography>
                </Box>

                {/* Arrow & Duration */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, position: "relative", minWidth: { xs: 80, sm: 100, md: 100, lg: 120 } }}>
                  {/* Connecting Line */}
                  <Box 
                    sx={{ 
                      position: "absolute", 
                      left: 0, 
                      right: 0, 
                      top: "50%", 
                      height: "1px", 
                      bgcolor: "#E5E7EB", 
                      zIndex: 0 
                    }} 
                  />

                  <Box sx={{ textAlign: "center", flex: 1, zIndex: 1, position: "relative" }}>
                    <Typography variant="caption" sx={{ 
                      color: "#6B7280", 
                      fontSize: "0.55rem", 
                      bgcolor: "white", 
                      px: 0.5,
                      display: "inline-block",
                      mb: 0.2
                    }}>
                      {flight.duration}
                    </Typography>
                    
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "white", width: "fit-content", mx: "auto", px: 0.5 }}>
                      <Box
                        sx={{
                          width: 18,
                          height: 18,
                          bgcolor: "#0b66f9",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        <FlightIcon sx={{ 
                          fontSize: "0.7rem", 
                          color: "white", 
                          display: "block", // Removes baseline spacing
                          transform: "rotate(0deg)", // Makes it look like it's taking off
                          margin: "auto" 
                        }} />
                      </Box>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0.25, bgcolor: "white", px: 0.5, width: "fit-content", mx: "auto", mt: 0.2 }}>
                      <AccessTimeIcon sx={{ fontSize: "0.6rem", color: "#EA580C" }} />
                      <Typography variant="caption" sx={{ color: "#EA580C", fontSize: "0.6rem", fontWeight: 500 }}>
                        {flight.stops === 0 ? 'Non-stop' : `${flight.stops} Stop${flight.stops > 1 ? 's' : ''}`}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Arrival */}
                <Box sx={{ textAlign: "left", minWidth: 60 }}>
                  <Typography sx={{ fontSize: "0.75rem", fontWeight: 700, color: "#1F2937" }}>
                    {flight.arrivalTime}
                  </Typography>
                  <Typography sx={{ color: "#4B5563", fontWeight: 600, fontSize: "0.7rem" }}>{flight.to}</Typography>
                </Box>
              </Box>

              {/* Price & Book Button */}
              <Box sx={{ 
                textAlign: "right",
                width: { xs: "100%", sm: 110, md: 110, lg: 120 },
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "center", sm: "flex-end" }
              }}>
                {/* <Typography variant="caption" sx={{ color: "#6B7280", fontSize: "0.65rem", display: "block" }}>
                  Starting from
                </Typography> */}
                <Typography sx={{ fontSize: "0.95rem", fontWeight: 700, color: "#111827", mb: 0.5 }}>
                  {flight.price}
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleBookNow(flight)}
                  sx={{ 
                    borderRadius: 1.5,
                    bgcolor: "#0b66f9", 
                    fontSize: "0.75rem", 
                    textTransform: "none", 
                    py: 0.5,
                    px: 2,
                    boxShadow: "none",
                    "&:hover": { bgcolor: "#0052cc", boxShadow: "none" }
                  }}
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
              {showBaggageSelection === flight.id ? (
                <BaggageSelection 
                  flight={selectedFlightData}
                  onSelect={handleBaggageSelect}
                  onClose={() => {
                    setShowBaggageSelection(null);
                    setExpandedCardId(null);
                  }}
                />
              ) : (
                <FlightDetails 
                  onClose={() => setExpandedCardId(null)} 
                  selectedFlightData={selectedFlightData}
                />
              )}
            </Collapse>
          </Paper>
        ))}

        {/* ✅ See More Button */}
        {visibleFlights < filteredFlights.length && (
          <Box sx={{ 
            display: "flex", 
            justifyContent: "center", 
            mt: 2,
            mb: 4,
            maxWidth: { xs: "92%", sm: "500px", md: "580px", lg: "630px" },
            width: "92%",
            mx: { xs: "auto", sm: 0 },
            ml: { xs: "auto", sm: "auto", md: "auto", lg: "auto" },
          }}>
            <Button
              variant="outlined"
              onClick={() => setVisibleFlights(prev => prev + 8)}
              sx={{
                borderRadius: 1.5,
                textTransform: "none",
                fontSize: "0.85rem",
                fontWeight: 600,
                color: "#0b66f9",
                borderColor: "#0b66f9",
                px: 4,
                // py: 1,
                "&:hover": {
                  bgcolor: "#f0f7ff",
                  borderColor: "#0052cc",
                }
              }}
            >
              See More
            </Button>
          </Box>
        )}
          </Box>
        </Box>
      </Box>
      )}
    </Box>
  );
}
