"use client";

import React from "react";
import { Box, Button, useMediaQuery, useTheme } from "@mui/material";
import { Plane, Hotel, Globe, Car, FileText } from "lucide-react";

export default function TravelTabs({ activeTab, setActiveTab }) {
  // Add media query hooks
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const tabs = [
    { id: "flights", label: "Flights", icon: <Plane size={16} style={{ marginRight: 8 }} /> },
    { id: "hotels", label: "Hotels", icon: <Hotel size={16} style={{ marginRight: 8 }} /> },
    { id: "tours", label: "Tours", icon: <Globe size={16} style={{ marginRight: 8 }} /> },
    { id: "cars", label: "Cars", icon: <Car size={16} style={{ marginRight: 8 }} /> },
    { id: "visa", label: "Visa", icon: <FileText size={16} style={{ marginRight: 8 }} /> },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        flexWrap: "wrap",
        justifyContent: "center",
        maxWidth: 560,
        mx: "auto",
        p: 1.5,
        borderRadius: isMobile ? 3 : 99, // Fixed: isMobile is now defined
        backdropFilter: "blur(4px)",
        backgroundColor: "rgba(255,255,255,0.1)",
        boxShadow: 5,
        mt:{xs:4,sm:-4, md:0, lg:0}
      }}
    >
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          startIcon={tab.icon}
          variant="contained"
          disableElevation
          sx={{
            borderRadius: "999px",
            textTransform: "none",
            fontSize: "12px",
            fontWeight: "600",
            px: 2.5,
            py: 1.2,
            backgroundColor: activeTab === tab.id ? "white" : "transparent",
            color: activeTab === tab.id ? "black" : "white",
            boxShadow: activeTab === tab.id ? 3 : "none",

            "&:hover": {
              backgroundColor:
                activeTab === tab.id
                  ? "white"
                  : "rgba(255,255,255,0.2)",
            },
          }}
        >
          {tab.label}
        </Button>
      ))}
    </Box>
  );
}