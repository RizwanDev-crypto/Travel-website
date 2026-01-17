"use client";

import { useState, useEffect } from "react";
import { 
  Box, 
  Container, 
  Typography, 
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import TravelTabs from "./TravelTabs";
import FlightSearchForm from "./components/FlightSearchForm";
import HotelSearchForm from "./components/HotelSearchForm";
import TourSearchForm from "./components/TourSearchForm";
import CarSearchForm from "./components/CarSearchForm";
import VisaSearchForm from "./components/VisaSearchForm";

const HeroSection = () => {
  const [activeTab, setActiveTab] = useState("flights");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isXs = useMediaQuery(theme.breakpoints.down("sm")); // mobile: 0-600px
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "md")); // tablet: 600-900px

  return (
    <Box
      sx={{
        position: "relative",
        height: (isMobile || isSm) ? "auto" : 372,
        bgcolor: "grey.900",
        color: "white",
        pb: (isMobile || isSm) ? 3 : 0,
      }}
    >
      {/* Background Image */}
      <Box
        component="img"
        src="/styles/HeroSectionImg2.jpeg"
        alt="Travel Background"
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "bottom",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          bgcolor: "rgba(0,0,0,0.6)",
          zIndex: 2,
        }}
      />

      <Container sx={{ 
        position: "relative", 
        zIndex: 3, 
        pt: (isMobile || isSm) ? 4 : 6,
        pb: (isMobile || isSm) ? 0 : 0,
        
      }}>
        
        {/* Desktop View Text - Hide on mobile and tablet */}
        {!isXs && !isSm && (
          <Box maxWidth="md" mx="auto" textAlign="center" mb={1}>
            <Typography 
              variant="h4" 
              fontWeight="bold" 
              gutterBottom  
              sx={{
                letterSpacing: -3,   // ✅ letters ke beech zero space
              }}
            >
              Your Trip Starts Here!
            </Typography>
            <Typography variant="body1" color="grey.400">
              Let us help you plan your next journey — the one that will leave a
              lifetime of memories.
            </Typography>
          </Box>
        )}

        {/* Tabs */}
        <TravelTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Search Form Box */}
        <Paper
          elevation={6}
          sx={{
            margin: "auto",
            mt:3,
            borderRadius: 3,
            backdropFilter: "blur(10px)",
            maxWidth: {xs: "100%", sm: "100%", md: 896,lg: 896},
            backgroundColor: isMobile ? "rgba(255, 255, 255, 0.98)" : "rgba(255, 255, 255, 0.95)",
          }}
        >
          {activeTab === "flights" && <FlightSearchForm />}
          {activeTab === "hotels" && <HotelSearchForm />}
          {activeTab === "tours" && <TourSearchForm />}
          {activeTab === "cars" && <CarSearchForm />}
          {activeTab === "visa" && <VisaSearchForm />}
        </Paper>
      </Container>
    </Box>
  );
};

export default HeroSection;