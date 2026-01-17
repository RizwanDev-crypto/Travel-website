"use client";

import { useState } from "react";
import { useGlobalContext } from "@/app/context/GlobalContext"; // Import context
import { Box, Typography, Button, Divider } from "@mui/material";
import FlightIcon from "@mui/icons-material/Flight";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import LuggageIcon from "@mui/icons-material/Luggage";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import LoopIcon from "@mui/icons-material/Loop";

export default function FlightDetails({ onClose, selectedFlightData }) {
  const { selectedFlight } = useGlobalContext(); // Get selected flight from global context
  const [activeTab, setActiveTab] = useState(0);

  // Default flight data if nothing is selected
  const defaultFlight = {
    from: "BOM",
    to: "LHE",
    stops: 1,
    duration: "2:53",
    airline: "Alaska Airlines",
    airlineShort: "Alaska",
    flightNumber: "0552",
    departureTime: "05:42 pm",
    arrivalTime: "08:35 pm",
    departureAirport: "Harry Reid International Airport",
    arrivalAirport: "Seattle-Tacoma International Airport",
    departureDate: "09-01-2026",
    arrivalDate: "09-01-2026",
    cabin: "economy",
    baggage: "7 kg",
    checkinBaggage: "23 kg",
    fareRules: {
      cancellation: "Non-refundable",
      changes: "Date changes subject to availability and fees"
    }
  };

  // Priority: 1. Props data, 2. Global context data, 3. Default data
  const flight = selectedFlightData || selectedFlight || defaultFlight;

  return (
    <Box sx={{ mt: 2, bgcolor: "white", borderRadius: 2, overflow: "hidden", border: "1px solid #e0e0e0" }}>
      {/* Header Tabs Row */}
      <Box sx={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        px: 3, 
        pt: 2,
        borderBottom: "1px solid #e0e0e0"
      }}>
        <Box sx={{ display: "flex", gap: { xs: 1.5, sm: 3 }, overflowX: "auto" }}>
          <Typography 
            onClick={() => setActiveTab(0)}
            sx={{ 
              color: activeTab === 0 ? "#3B82F6" : "#6B7280", 
              fontWeight: activeTab === 0 ? 600 : 500, 
              fontSize: "0.7rem", 
              cursor: "pointer", 
              borderBottom: activeTab === 0 ? "2px solid #3B82F6" : "none", 
              pb: "calc(0.5rem - 1px)",
              whiteSpace: "nowrap",
              transition: "all 0.2s ease",
              "&:hover": {
                color: activeTab === 0 ? "#3B82F6" : "#9CA3AF"
              }
            }}
          >
            Flight Details
          </Typography>
          <Typography 
            onClick={() => setActiveTab(1)}
            sx={{ 
              color: activeTab === 1 ? "#3B82F6" : "#6B7280", 
              fontWeight: activeTab === 1 ? 600 : 500, 
              fontSize: "0.7rem", 
              cursor: "pointer",
              borderBottom: activeTab === 1 ? "2px solid #3B82F6" : "none", 
              pb: "calc(0.5rem - 1px)",
              whiteSpace: "nowrap",
              transition: "all 0.2s ease",
              "&:hover": {
                color: activeTab === 1 ? "#3B82F6" : "#9CA3AF"
              }
            }}
          >
            Baggage
          </Typography>
          <Typography 
            onClick={() => setActiveTab(2)}
            sx={{ 
              color: activeTab === 2 ? "#3B82F6" : "#6B7280", 
              fontWeight: activeTab === 2 ? 600 : 500, 
              fontSize: "0.7rem", 
              cursor: "pointer",
              borderBottom: activeTab === 2 ? "2px solid #3B82F6" : "none", 
              pb: "calc(0.5rem - 1px)",
              whiteSpace: "nowrap",
              transition: "all 0.2s ease",
              "&:hover": {
                color: activeTab === 2 ? "#3B82F6" : "#9CA3AF"
              }
            }}
          >
            Fare Rules
          </Typography>
        </Box>

      </Box>

      {/* Content Area */}
      <Box sx={{ p: 1.5, minHeight: 400 }}>
        {activeTab === 0 && (
          <>
            {/* Route Header Box */}
            <Box sx={{ 
              bgcolor: "#F0F7FF", 
              p: 2, 
              borderRadius: 2, 
              display: "flex", 
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between", 
              alignItems: { xs: "flex-start", sm: "center" },
              mb: 3,
              border: "1px solid #BFDBFE",
              gap: 2
            }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <FlightTakeoffIcon sx={{ fontSize: "1.5rem", color: "#0b66f9" }} />
                <Box>
                  <Typography sx={{ color: "#1F2937", fontWeight: 600, fontSize: "0.7rem" }}>
                    Outbound: {flight.from} → {flight.to}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#6B7280", fontSize: "0.7rem" }}>
                    {flight.stops === 0 ? '1 Stop' : `${flight.stops} Stop${flight.stops > 1 ? 's' : ''}`} 
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ textAlign: { xs: "left", sm: "right" }, width: { xs: "100%", sm: "auto" } }}>
                <Typography variant="caption" sx={{ color: "#6B7280", display: "block", fontSize: "0.6rem" }}>Duration</Typography>
                <Typography sx={{ color: "#1F2937", fontSize: "0.7rem", fontWeight: 600 }}>{flight.duration}</Typography>
              </Box>
            </Box>

            {/* Flight Badge */}
            <Box sx={{ mb: 3, display: "flex", alignItems: "center", gap: 2 }}>
              <Typography sx={{ 
                bgcolor: "#0b66f9", 
                color: "white", 
                display: "inline-block", 
                px: 2, 
                py: 0.5, 
                borderRadius: 10,
                fontSize: "0.75rem",
                fontWeight: 500
              }}>
                {flight.airline} • {flight.flightNumber}
              </Typography>
              <Box sx={{ flex: 1, height: "1px", bgcolor: "#E5E7EB" }} />
            </Box>

            {/* Timeline Section */}
            <Box sx={{ position: "relative", pl: 0 }}>
              {/* Vertical Line */}
              <Box sx={{ 
                position: "absolute", 
                left: 9, 
                top: "2px", 
                bottom: "20px", 
                width: "2px", 
                bgcolor: "#0b66f9",
                zIndex: 0
              }} />

              {/* Departure */}
              <Box sx={{ display: "flex", gap: 2, mb: 1.5, position: "relative", zIndex: 1 }}>
                <Box sx={{ 
                  width: 16, 
                  height: 16, 
                  borderRadius: "50%", 
                  bgcolor: "#0b66f9", 
                  border: "3px solid white"
                }} />
                <Box sx={{ flex: 1, bgcolor: "#F9FAFB", p: 1.5, borderRadius: 2, border: "1px solid #E5E7EB" }}>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.5 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <FlightTakeoffIcon sx={{ fontSize: "1rem", color: "#0b66f9" }} />
                        <Typography sx={{ color: "#6B7280", fontSize: "0.6rem", fontWeight: 600 }}>DEPARTURE</Typography>
                      </Box>
                      <Box sx={{ 
                      bgcolor: "#EFF6FF",
                        color: "#0b66f9", 
                        px: 1.2,
                        py: 0.5, 
                        borderRadius: 1, 
                        display: "flex", 
                        alignItems: "center", 
                        gap: 0.5,
                        fontSize: "0.5rem",
                        fontWeight: 600,
                      }}>
                        <CalendarTodayIcon sx={{ fontSize: "0.6rem" }} />
                        {flight.departureDate}
                      </Box>
                    </Box>
                    <Box>
                      <Typography sx={{ color: "#1F2937", fontSize: "1.2rem", fontWeight: 700,lineHeight:"2rem",  }}>
                        {flight.departureTime}
                      </Typography>
                      <Typography sx={{ color: "#374151", fontSize: "0.7rem", fontWeight: 600,  lineHeight:1.25 }}>
                        {flight.departureAirport}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "#6B7280", fontSize: "0.6rem" }}>
                        {flight.from} • {flight.departureDate}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>

              {/* Airline Info Box */}
              <Box sx={{ display: "flex", gap: 3, mb: 1.5, position: "relative", zIndex: 1, ml: 4.5 }}>
                <Box sx={{ 
                  flex: 1, 
                  background: "linear-gradient(to right, #F9FAFB, #F3F4F6)", 
                  p: 1.5, 
                  borderRadius: 2, 
                  border: "1px dashed #D1D5DB",
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1.5fr 1fr" },
                  gap: 2
                }}>
                  {/* Left Column */}
                  <Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                      <Box sx={{ width: 25, height: 25, bgcolor: "#F3F4F6", display: "flex", borderRadius: 1.4, border: "1px solid #E5E7EB", alignItems: "center", justifyContent: "center" }}>
                        <Typography variant="caption" sx={{ color: "#0c2e57ff", fontStyle: "italic", fontSize: "0.4rem"}}>
                          {flight.airlineShort}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography sx={{ color: "#111827", fontSize: "0.7em", fontWeight: 600}}>{flight.airline}</Typography>
                        <Typography variant="caption" sx={{ color: "#6B7280", fontSize: "0.6rem" }}>Flight {flight.flightNumber}</Typography>
                      </Box>
                    </Box>
                    <Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1, }}>
                        <AccessTimeIcon sx={{ color: "#6B7280", fontSize: "0.8rem" }} />
                        <Box>
                          <Typography variant="caption" sx={{ color: "#6B7280", display: "block",fontSize: "0.6rem" }}>Duration</Typography>
                          <Typography sx={{ color: "#111827", fontSize: "0.7em", fontWeight: 600 }}>{flight.duration}</Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <WorkOutlineIcon sx={{ color: "#6B7280", fontSize: "0.8rem" }} />
                        <Box>
                          <Typography variant="caption" sx={{ color: "#6B7280", display: "block", fontSize: "0.6rem" }}>Cabin Bag</Typography>
                          <Typography sx={{ color: "#111827", fontSize: "0.7em", fontWeight: 600 }}>{flight.baggage}</Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  
                  {/* Right Column */}
                  <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <EventSeatIcon sx={{ color: "#6B7280", fontSize: "0.8rem" }} />
                      <Box>
                        <Typography variant="caption" sx={{ color: "#6B7280", display: "block" }}>T</Typography>
                        <Typography sx={{ color: "#1F2937", fontSize: "0.7rem", fontWeight: 600 }}>{flight.cabin}</Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <LuggageIcon sx={{ color: "#6B7280", fontSize: "0.8rem" }} />
                      <Typography sx={{ color: "#6B7280", fontSize: "0.6rem" }}>Check-in </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>

              {/* Arrival */}
              <Box sx={{ display: "flex", gap: 2, position: "relative", zIndex: 1 ,}}>
                <Box sx={{ 
                  width: 16, 
                  height: 16, 
                  borderRadius: "50%", 
                  bgcolor: "#0b66f9", 
                  mt: 13,
                  border: "3px solid white",
                }} />
                <Box sx={{ flex: 1, bgcolor: "#F9FAFB", p: 1.5, borderRadius: 2, border: "1px solid #E5E7EB" }}>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 0.5 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <FlightLandIcon sx={{ fontSize: "1rem", color: "#0b66f9" }} />
                        <Typography sx={{ color: "#6B7280", fontSize: "0.6rem", fontWeight: 600 }}>ARRIVAL</Typography>
                      </Box>
                      <Box sx={{ 
                        bgcolor: "#EFF6FF", 
                        color: "#0b48f0d4", 
                        px: 1.2, 
                        py: 0.5, 
                        borderRadius: 1, 
                        display: "flex", 
                        alignItems: "center", 

                        gap: 0.5,
                        fontSize: "0.5rem",
                        fontWeight: 600,
                      }}>
                        <CalendarTodayIcon sx={{ fontSize: "0.6rem" }} />
                        {flight.arrivalDate}
                      </Box>
                    </Box>
                    <Box>
                      <Typography sx={{ color: "#1F2937", fontSize: "1.2rem", fontWeight: 700,lineHeight:"2rem", }}>
                        {flight.arrivalTime}
                      </Typography>
                      <Typography sx={{  color: "#374151", fontSize: "0.7rem", fontWeight: 600,  lineHeight:1.25 }}>
                        {flight.arrivalAirport}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "#6B7280", fontSize: "0.6rem" }}>
                        {flight.to} • {flight.arrivalDate}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </>
        )}

        {activeTab === 1 && (
          <Box sx={{ bgcolor: "#F9FAFB", borderRadius: 2, p: 2, border: "1px solid #E5E7EB" }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <LuggageIcon sx={{ color: "#3B82F6", fontSize: "1.2rem" }} />
                <Typography sx={{ color: "#1F2937", fontSize: "0.8rem", fontWeight: 500 }}>
                  Checked Baggage: {flight.checkinBaggage}
                </Typography>
              </Box>
              <Box sx={{ ml: 0.5 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <WorkOutlineIcon sx={{ color: "#10B981", fontSize: "1.2rem" }} />
                  <Typography sx={{ color: "#1F2937", fontSize: "0.8rem", fontWeight: 500 }}>
                    Cabin Baggage
                  </Typography>
                </Box>
                <Typography sx={{ color: "#6B7280", fontSize: "0.75rem", ml: 4, mt: 0.5 }}>
                  {flight.baggage}
                </Typography>
              </Box>
            </Box>
          </Box>
        )}

        {activeTab === 2 && (
          <Box sx={{ bgcolor: "#F9FAFB", borderRadius: 2, p: 2, border: "1px solid #E5E7EB" }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <HighlightOffIcon sx={{ color: "#EF4444", fontSize: "1.2rem" }} />
                  <Typography sx={{ color: "#1F2937", fontSize: "0.8rem", fontWeight: 600 }}>
                    Cancellation
                  </Typography>
                </Box>
                <Typography sx={{ color: "#6B7280", fontSize: "0.7rem", ml: 4, mt: 0.5 }}>
                  {flight.fareRules?.cancellation || "Non-refundable"}
                </Typography>
              </Box>
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <LoopIcon sx={{ color: "#F59E0B", fontSize: "1.2rem" }} />
                  <Typography sx={{ color: "#1F2937", fontSize: "0.8rem", fontWeight: 600 }}>
                    Changes
                  </Typography>
                </Box>
                <Typography sx={{ color: "#6B7280", fontSize: "0.7rem", ml: 4, mt: 0.5 }}>
                  {flight.fareRules?.changes || "Date changes subject to availability and fees"}
                </Typography>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}