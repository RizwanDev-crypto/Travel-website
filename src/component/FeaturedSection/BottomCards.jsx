"use client";

import {
  Box,
  Typography,
  Container,
  Card,
} from "@mui/material";
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import PsychologyIcon from '@mui/icons-material/Psychology';

/* ======================
   DATA
====================== */
const features = [
  {
    icon: <EmojiPeopleIcon sx={{ fontSize: 40, color: "#1767e8" }} />,
    title: "You'll never roam alone",
    description: "Find best travel services and book them instantly",
  },
  {
    icon: <TravelExploreIcon sx={{ fontSize: 40, color: "#1767e8" }} />,
    title: "Travel to anytime, anywhere",
    description: "No limits and boundaries for your next destination",
  },
  {
    icon: <PsychologyIcon sx={{ fontSize: 40, color: "#1767e8" }} />,
    title: "Ease of mind, search and book",
    description: "Let's help you find best travel deals and offers today",
  },
];

/* ======================
   FEATURE CARD COMPONENT
====================== */
const FeatureCard = ({ icon, title, description }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "80%",
          maxWidth: "225px",
          borderRadius: "12px",
          overflow: "hidden",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          p: 4,
         mt:{xs:"20px"},
          border: "1px solid #e0e0e0",
          fontFamily: "'Inter', sans-serif", // Inter font added
        }}
      >
        {/* Icon */}
        <Box sx={{ mb: 2 }}>
          {icon}
        </Box>

        {/* Title */}
        <Typography
          variant="h6"
          fontWeight="700"
          sx={{
            mb: 0.5,
            fontSize: "14px",
            color: "#222",
            lineHeight: 1.3,
            fontFamily: "'Inter', sans-serif", // Inter font added
          }}
        >
          {title}
        </Typography>

        {/* Description */}
        <Typography
          sx={{
            color: "#666",
            fontSize: "12px",
            fontWeight: "500",
            lineHeight: 1.5,
            fontFamily: "'Inter', sans-serif", // Inter font added
          }}
        >
          {description}
        </Typography>
      </Box>
    </Box>
  );
};

/* ======================
   MAIN SECTION
====================== */
const BottomCards = () => {
  return (
    <Container maxWidth="lg" 
      sx={{ 
        py: 6,
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center",
        fontFamily: "'Inter', sans-serif", // Inter font added
      }}
    >
      {/* Flex container for three cards */}
      <Box sx={{ 
        display: "flex", 
        flexDirection: { xs: "column", sm: "row" },
        justifyContent: "space-between",
        alignItems: "stretch",
        width: {xs:"100%", sm:"100%",md:"85%", lg:"79%"},
        gap: {xs:2, lg:4}
      }}>
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </Box>
    </Container>
  );
};

export default BottomCards;