"use client";

import { Box, Typography, Button } from "@mui/material";
import LuggageIcon from "@mui/icons-material/Luggage";
import LockIcon from "@mui/icons-material/Lock";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function BaggageSelection({ flight, onSelect, onClose }) {
  const baggageOptions = [
    {
      id: 1,
      type: "Economy Saver",
      checkIn: "1 Piece(s) (not more than 25 KG)",
      carryOn: "1 Piece(s) (not more than 7 KG)",
      price: "USD 88.62",
      priceValue: 88.62,
    },
    {
      id: 2,
      type: "Economy Flex",
      checkIn: "1 Piece(s) (not more than 30 KG)",
      carryOn: "1 Piece(s) (not more than 7 KG)",
      price: "USD 114.41",
      priceValue: 114.41,
    },
    {
      id: 3,
      type: "Economy Flex Plus",
      checkIn: "1 Piece(s) (not more than 35 KG)",
      carryOn: "1 Piece(s) (not more than 7 KG)",
      price: "USD 180.85",
      priceValue: 180.85,
    },
  ];

  return (
    <Box sx={{ mt: 2, bgcolor: "white", borderRadius: 2, overflow: "hidden" }}>
      {/* Baggage Options */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2 }}>
        {baggageOptions.map((option) => (
          <Box
            key={option.id}
            sx={{
              bgcolor: "#F9FAFB",
              border: "1px solid #E5E7EB",
              borderRadius: 2,
              p: 2,
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", sm: "center" },
              gap: 2,
              transition: "all 0.2s ease",
              "&:hover": {
                bgcolor: "#F3F4F6",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              },
            }}
          >
            {/* Left Side - Baggage Info */}
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 1}}>
              {/* Fare Type with Icon */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box
                  sx={{
                    width: 30,
                    height: 20,
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <LuggageIcon sx={{ fontSize: "1.5rem", color: "#0b3d91" }} />
                </Box>
                <Typography
                  sx={{
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: "#111827",
                
                  }}
                >
                  {option.type}
                </Typography>
              </Box>
  <Box sx={{pl:2}}>
              {/* Check-in Baggage */}
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1, ml: 0.5,  }}>
                <LockIcon sx={{ fontSize: "0.8rem", color: "#0b3d91", mt: 0.2 }} />
                <Box>
                  <Typography
                    sx={{
                      fontSize: "0.6rem",
                      fontWeight: 600,
                      color: "#0b3d91",
                      mb: 0.2,
                    }}
                  >
                    Check in baggage:
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "0.5rem",
                      color: "#4B5563",
                      lineHeight: 1.3,
                    }}
                  >
                    {option.checkIn}
                    <br />
                    for each Adult & Child.
                  </Typography>
                </Box>
              </Box>

              {/* Carry-on Baggage */}
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1, ml: 0.5 }}>
                <WorkOutlineIcon sx={{ fontSize: "1rem", color: "#0b3d91", mt: 0.2 }} />
                <Box>
                  <Typography
                    sx={{
                      fontSize: "0.6rem",
                      fontWeight: 600,
                      color: "#0b3d91",
                      mb: 0.2,
                    }}
                  >
                    Carry on baggage:
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "0.5rem",
                      color: "#4B5563",
                      lineHeight: 1.3,
                    }}
                  >
                    {option.carryOn}
                    <br />
                    for each Adult & Child.
                  </Typography>
                </Box>
              </Box>
            </Box>
              </Box>

            {/* Right Side - Price & Select Button */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: { xs: "flex-start", sm: "flex-end" },
                gap: 1.5,
                minWidth: { xs: "100%", sm: 140 },
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: "#111827",
                }}
              >
                {option.price}
              </Typography>
              <Button
                variant="contained"
                onClick={() => onSelect && onSelect(option)}
                sx={{
                  bgcolor: "#0b66f9",
                  color: "white",
                  px: 2,
                  py: 0.5,
                  borderRadius: 1.5,
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  textTransform: "none",
                  boxShadow: "none",
                  width: { xs: "100%", sm: "auto" },
                  "&:hover": {
                    bgcolor: "#0052cc",
                    boxShadow: "none",
                  },
                }}
              >
                Select
              </Button>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Collapse Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        
        }}
      >
        <KeyboardArrowUpIcon
          onClick={onClose}
          sx={{
            fontSize: "1.5rem",
            color: "#6B7280",
            cursor: "pointer",
            "&:hover": { color: "#111827" },
          }}
        />
      </Box>
    </Box>
  );
}
