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
import { useRouter } from "next/navigation";


    const flights = [
  // First Row
  [
    { id: 1, fromCity: "Lahore", fromCountry: "Pakistan Internatio...", toCity: "Dubai", price: 100 },
    { id: 2, fromCity: "Kuala Lumpur", fromCountry: "Malaysia Airlines", toCity: "Dubai", price: 620 },
    { id: 3, fromCity: "Berlin", fromCountry: "Turkish Airlines", toCity: "Istanbul", price: 600 }
  ],
  // Second Row
  [
    { id: 4, fromCity: "Dubai", fromCountry: "Emirates", toCity: "Sharjah", price: 460 },
    { id: 5, fromCity: "Dhaka", fromCountry: "Australian Airlines", toCity: "Jeddah", price: 385 },
    { id: 6, fromCity: "Delhi", fromCountry: "Air India Limited", toCity: "Moscow", price: 760 }
  ],
  // Third Row
  [
    { id: 7, fromCity: "Manila", fromCountry: "Air Philippines", toCity: "Dubai", price: 450 },
    { id: 8, fromCity: "Surabaya", fromCountry: "American Airlines", toCity: "New York", price: 900 },
    { id: 9, fromCity: "Berlin", fromCountry: "Air Arabia", toCity: "Dubai", price: 240 }
  ],
];


const FlightCard = ({ id, fromCity, fromCountry, toCity, price }) => {
  const router = useRouter(); // navigation control

  return (
  <Paper
  onClick={() => router.push(`/flights/${id}`)}
  sx={{

        width: {xs:"490px", sm:650,md:"230px" ,lg:"260px"},
       
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
        background:"#f8f9fb",

        "&:hover": {
          borderColor: "#1976d2",
          boxShadow: "0px 4px 12px rgba(25,118,210,0.15)",

          // ✅ Yeh line change karni hai - airplane icon ke liye
          "& .flight-icon-container": {
            backgroundColor: "#116af9",
          },
          
          "& .flight-icon": {
            color: "#ffffff", // White color for airplane icon
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
          className="flight-icon-container" // ✅ Class name add kiya
          sx={{
            width: "24px",
            height: "24px",
            backgroundColor: "#e3f2fd",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 0.5,
            transition: "background-color 0.3s ease", // Smooth transition
          }}
        >
          <FlightIcon 
            className="flight-icon" // ✅ Class name add kiya
            sx={{ fontSize: "14px", color: "#1976d2", transform: "rotate(45deg)" }} 
          />
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
    <Container 
      maxWidth="lg" 
      sx={{ 
        py: 4, 
        mt: { xs: 0, sm: 4, md: 0 }, // ✅ Added margin top for sm to push it down
        px: { xs: 2, sm: 3, md: 4 }, // ✅ Padding responsive
        // ... rest of the code
      }}
    >
      <Box
        sx={{
          mb: 3,
          width: { xs: "100%", md: "90%", lg: "79%" },
          textAlign: { xs: "start", md: "left" },
          mx: { xs: 0, md: "auto" },
          position: "relative",
          left: { xs: "4px", sm: "14px",md: "24px", lg: "0" },
        
        }}
      >
        <Typography 
          fontSize={{ xs: "16px", sm: "18px" }} 
          fontWeight="700" 
          sx={{ 
            fontFamily: "'Inter', sans-serif",
            mb: 0.5 
          }}
        >
          Featured Flights
        </Typography>
        <Typography 
          fontSize={{ xs: "12px", sm: "14px" }} 
          color="black" 
          sx={{ 
            fontFamily: "'Inter', sans-serif" 
          }}
        >
          These alluring destinations are picked just for you.
        </Typography>
      </Box>

      {/* 3x3 Grid with improved spacing */}
      {flights.map((row, rowIndex) => (
        <Grid 
          container 
          spacing={{ xs: 1, sm: 2 }} // ✅ Responsive spacing
          key={rowIndex}
          sx={{ 
            mb: rowIndex < 2 ? 2 : 0,
            justifyContent: "center" // ✅ Center cards on mobile
          }}
        >
          {row.map((flight, colIndex) => (
            <Grid 
              item 
              xs={12} 
              sm={6} 
              md={4} 
              key={`${rowIndex}-${colIndex}`}
              sx={{ 
                display: "flex", 
                justifyContent: "center" 
              }}
            >
              <FlightCard {...flight} />
            </Grid>
          ))}
        </Grid>
      ))}
    </Container>
  );
};

export default FeaturedFlights;