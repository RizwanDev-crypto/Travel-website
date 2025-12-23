"use client";

import React from "react";
import { 
  Box, 
  Grid, 
  Typography, 
  Container, 
  Paper 
} from "@mui/material";
import FlightIcon from "@mui/icons-material/Flight";

const flights = [
  // First Row
  [
    { fromCity: "Lahore", fromCountry: "Pakistan Internatio...", toCity: "Dubai", price: 100 },
    { fromCity: "Kuala Lumpur", fromCountry: "Malaysia Airlines", toCity: "Dubai", price: 620 },
    { fromCity: "Berlin", fromCountry: "Turkish Airlines", toCity: "Istanbul", price: 600 }
  ],
  // Second Row
  [
    { fromCity: "Dubai", fromCountry: "Emirates", toCity: "Sharjah", price: 460 },
    { fromCity: "Dhaka", fromCountry: "Australian Airlines", toCity: "Jeddah", price: 385 },
    { fromCity: "Delhi", fromCountry: "Air India Limited", toCity: "Moscow", price: 760 }
  ],
  // Third Row
  [
    { fromCity: "Manila", fromCountry: "Air Philippines", toCity: "Dubai", price: 450 },
    { fromCity: "Surabaya", fromCountry: "American Airlines", toCity: "New York", price: 900 },
    { fromCity: "Berlin", fromCountry: "Air Arabia", toCity: "Dubai", price: 240 }
  ],
  
];

const FlightCard = ({ fromCity, fromCountry, toCity, price }) => {
  return (
    <Paper
      sx={{
        width: "260px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: 2,
        borderRadius: "10px",
        height: "40px",
        backgroundColor: "#ffffff",
        border: "1px solid #e0e0e0",
        boxShadow: "0px 1px 3px rgba(0,0,0,0.05)",
        transition: "all 0.3s ease",
        cursor: "pointer",
        fontFamily: "'Inter', sans-serif", // Inter font added

        "&:hover": {
          borderColor: "#1976d2",
          boxShadow: "0px 4px 12px rgba(25,118,210,0.15)",

          "& .flight-icon": {
            color: "#1976d2",
          },
        },
      }}
    >
      {/* Left Side */}
      <Box sx={{ flex: 1 }}>
        <Typography fontWeight="700" fontSize="14px" color="text.primary" fontFamily="'Inter', sans-serif">
          {fromCity}
        </Typography>
        <Typography fontSize="10px" color="text.secondary" fontWeight="600" pt={0.5} fontFamily="'Inter', sans-serif">
          {fromCountry}
        </Typography>
      </Box>

      {/* Middle Icon */}
      <Box sx={{ mx: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Box sx={{ width: "1px", height: "10px", backgroundColor: "#bdbdbd", mb: 0.5 }} />
        <Box
          sx={{
            width: "24px",
            height: "24px",
            backgroundColor: "#e3f2fd",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 0.5,
          }}
        >
          <FlightIcon sx={{ fontSize: "14px", color: "#1976d2", transform: "rotate(45deg)" }} />
        </Box>
        <Box sx={{ width: "1px", height: "10px", backgroundColor: "#bdbdbd" }} />
      </Box>

      {/* Right Side */}
      <Box sx={{ flex: 1, textAlign: "right" }}>
        <Typography fontWeight="600" fontSize="14px" color="text.primary" fontFamily="'Inter', sans-serif">
          {toCity}
        </Typography>
        <Typography fontSize="11px" color="text.secondary" pt={0.5} fontFamily="'Inter', sans-serif">
          From USD {price}.00
        </Typography>
      </Box>
    </Paper>
  );
};

const FeaturedFlights = () => {
  return (
    <Container maxWidth="lg" 
      sx={{ 
        py: 4, 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center",
        fontFamily: "'Inter', sans-serif", // Inter font added
      }}
    >
      <Box
        sx={{
          mb: 3,
          width: "79%",
          textAlign: "left",
        }}
      >
        <Typography fontWeight="700" sx={{ fontSize:"20px" }} fontFamily="'Inter', sans-serif">
          Featured Flights
        </Typography>
        <Typography color="black" sx={{fontSize:"12px"}} fontFamily="'Inter', sans-serif">
          These alluring destinations are picked just for you.
        </Typography>
      </Box>

      {/* 3x3 Grid */}
      {flights.map((row, rowIndex) => (
        <Grid 
          container 
          spacing={2} 
          key={rowIndex}
          sx={{ mb: rowIndex < 2 ? 2 : 0 }}
        >
          {row.map((flight, colIndex) => (
            <Grid item xs={12} md={4} key={`${rowIndex}-${colIndex}`}>
              <FlightCard {...flight} />
            </Grid>
          ))}
        </Grid>
      ))}
    </Container>
  );
};

export default FeaturedFlights;