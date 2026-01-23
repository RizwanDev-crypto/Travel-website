"use client";

import { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, MenuItem, Select, FormControl, InputLabel, Radio, RadioGroup, FormControlLabel, InputAdornment } from "@mui/material";
import FlightIcon from "@mui/icons-material/Flight";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

export default function FlightBooking({ flight, selectedBaggage, adults, children, infants, onBack }) {
  const [contactDetails, setContactDetails] = useState({
    email: "",
    phoneNumber: "",
  });

  const [travelerDetails, setTravelerDetails] = useState(() => {
    const travelers = [];
    // Adults
    for (let i = 1; i <= (adults || 1); i++) {
      travelers.push({
        type: "adult",
        index: i,
        title: "Mr",
        firstName: "",
        lastName: "",
        country: "Select",
        dateOfBirth: "",
        passportNumber: "",
        passportExpiry: "",
      });
    }
    // Children
    for (let i = 1; i <= (children || 0); i++) {
      travelers.push({
        type: "child",
        index: i,
        title: "Mr",
        firstName: "",
        lastName: "",
        country: "Select",
        dateOfBirth: "",
        passportNumber: "",
        passportExpiry: "",
      });
    }
    // Infants
    for (let i = 1; i <= (infants || 0); i++) {
      travelers.push({
        type: "infant",
        index: i,
        title: "Mr",
        firstName: "",
        lastName: "",
        country: "Select",
        dateOfBirth: "",
        passportNumber: "",
        passportExpiry: "",
      });
    }
    return travelers;
  });

  // Sync travelerDetails when props change
  useEffect(() => {
    setTravelerDetails((prev) => {
      const newTravelers = [];
      const types = [
        { type: "adult", count: adults || 1 },
        { type: "child", count: children || 0 },
        { type: "infant", count: infants || 0 },
      ];

      types.forEach(({ type, count }) => {
        for (let i = 1; i <= count; i++) {
          // Try to find existing data for this traveler type and index
          const existing = prev.find((t) => t.type === type && t.index === i);
          if (existing) {
            newTravelers.push(existing);
          } else {
            newTravelers.push({
              type,
              index: i,
              title: "Mr",
              firstName: "",
              lastName: "",
              country: "Select",
              dateOfBirth: "",
              passportNumber: "",
              passportExpiry: "",
            });
          }
        }
      });
      return newTravelers;
    });
  }, [adults, children, infants]);

  const handleContactChange = (field, value) => {
    setContactDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleTravelerChange = (idx, field, value) => {
    setTravelerDetails((prev) => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], [field]: value };
      return updated;
    });
  };

  const handleContinue = () => {
    console.log("Contact Details:", contactDetails);
    console.log("Traveler Details:", travelerDetails);
    // Add navigation or next step logic here
  };

  return (
    <Box
      sx={{
        maxWidth: { xs: "100%", sm: "100%", md: "820px", lg: "910px" },
        mx: "auto",
        // px: { xs: 1.5, sm: 2, md: 3, lg: 3 },
        // pb: { xs: 4, sm: 6, md: 8, lg: 8 },
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Flight Summary Card - Same as Flight Listing */}
      <Box
        sx={{
          bgcolor: "white",
          borderRadius: 2,
          p: 2,
          mb: 2,
          border: "1px solid #E5E7EB",
        }}
      >
        {/* Main Content Row */}
        <Box
          sx={{
            display: "flex",
            alignItems: { xs: "center", sm: "center", md: "center", lg: "center" },
            justifyContent: "space-between",
            flexDirection: { xs: "column", sm: "row", md: "row", lg: "row" },
            gap: { xs: 4, sm: 2, md: 2, lg: 2 },
          }}
        >
          {/* Airline Info */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
              gap: 1.5,
              width: { xs: "100%", sm: 130, md: 130, lg: 150 },
              flexShrink: 0,
              justifyContent: { xs: "center", sm: "flex-start" },
            }}
          >
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
                flexShrink: 0,
              }}
            >
              <Typography variant="caption" sx={{ color: "#0c2e57ff", fontStyle: "italic", fontSize: "0.65rem" }}>
                {flight?.airlineShort || "EK"}
              </Typography>
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  lineHeight: 1.2,
                  color: "rgb(17 24 39)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {flight?.airline || "Emirates"}
              </Typography>
              <Typography sx={{ color: "#6B7280", fontWeight: 600, fontSize: "0.6rem", display: "block" }}>
                {flight?.flightNumber || "EK-625"}
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
              justifyContent: "center",
              minWidth: 0,
            }}
          >
            {/* Departure */}
            <Box sx={{ textAlign: "right", minWidth: 60 }}>
              <Typography sx={{ fontSize: "0.75rem", fontWeight: 700, color: "#1F2937" }}>
                {flight?.departureTime || "10:00 AM"}
              </Typography>
              <Typography sx={{ color: "#4B5563", fontWeight: 600, fontSize: "0.7rem" }}>
                {flight?.from || "LHE"}
              </Typography>
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
                  zIndex: 0,
                }}
              />

              <Box sx={{ textAlign: "center", flex: 1, zIndex: 1, position: "relative" }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: "#6B7280",
                    fontSize: "0.55rem",
                    bgcolor: "white",
                    px: 0.5,
                    display: "inline-block",
                    mb: 0.2,
                  }}
                >
                  {flight?.duration || "3h 30m"}
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
                      justifyContent: "center",
                    }}
                  >
                    <FlightIcon
                      sx={{
                        fontSize: "0.7rem",
                        color: "white",
                        display: "block",
                        transform: "rotate(0deg)",
                        margin: "auto",
                      }}
                    />
                  </Box>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0.25, bgcolor: "white", px: 0.5, width: "fit-content", mx: "auto", mt: 0.2 }}>
                  <AccessTimeIcon sx={{ fontSize: "0.6rem", color: "#EA580C" }} />
                  <Typography variant="caption" sx={{ color: "#EA580C", fontSize: "0.6rem", fontWeight: 500 }}>
                    {flight?.stops === 0 ? "Non-stop" : `${flight?.stops} Stop${flight?.stops > 1 ? "s" : ""}`}
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Arrival */}
            <Box sx={{ textAlign: "left", minWidth: 60 }}>
              <Typography sx={{ fontSize: "0.75rem", fontWeight: 700, color: "#1F2937" }}>
                {flight?.arrivalTime || "1:30 PM"}
              </Typography>
              <Typography sx={{ color: "#4B5563", fontWeight: 600, fontSize: "0.7rem" }}>
                {flight?.to || "DXB"}
              </Typography>
            </Box>
          </Box>

          {/* Price */}
          <Box
            sx={{
              textAlign: "right",
              width: { xs: "100%", sm: 110, md: 110, lg: 120 },
              flexShrink: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "center", sm: "flex-end" },
            }}
          >
            <Typography sx={{ fontSize: "0.95rem", fontWeight: 700, color: "#111827", mb: 0.5 }}>
              {selectedBaggage?.price || flight?.price || "USD 88.62"}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Main Content Layout */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
        }}
      >
        {/* Left Side - Forms */}
        <Box sx={{ flex: 1 }}>
          {/* Contact Details Section */}
          <Box
            sx={{
              bgcolor: "white",
              borderRadius: 2,
              p: 2.5,
              mb: 2,
              border: "1px solid #E5E7EB",
            }}
          >
            <Typography sx={{ fontSize: "0.95rem", fontWeight: 700, color: "#111827", mb: 2 }}>
              Contact Details
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontSize: "0.85rem", fontWeight: 600, color: "#374151", mb: 0.5 }}>Email *</Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={contactDetails.email}
                  onChange={(e) => handleContactChange("email", e.target.value)}
                  placeholder="Youremail@gmail.com"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      fontSize: "0.85rem",
                      "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#1976d2" },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#1976d2" },
                      "&:hover": { backgroundColor: "#f0f7ff" },
                    },
                  }}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontSize: "0.85rem", fontWeight: 600, color: "#374151", mb: 0.5 }}>Phone Number *</Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={contactDetails.phoneNumber}
                  onChange={(e) => handleContactChange("phoneNumber", e.target.value)}
                  placeholder="+92 3xx xxxxxxx"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      fontSize: "0.85rem",
                      "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#1976d2" },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#1976d2" },
                      "&:hover": { backgroundColor: "#f0f7ff" },
                    },
                  }}
                />
              </Box>
            </Box>
          </Box>

          {travelerDetails.map((traveler, idx) => (
            <Box
              key={`${traveler.type}-${traveler.index}`}
              sx={{
                bgcolor: "white",
                borderRadius: 2,
                p: 2.5,
                border: "1px solid #E5E7EB",
                mb: 2,
              }}
            >
              <Typography sx={{ fontSize: "0.95rem", fontWeight: 700, color: "#111827", mb: 2, textTransform: "capitalize" }}>
                Traveler details for {traveler.type} {traveler.index}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {/* Title */}
                <Box>
                  <Typography sx={{ fontSize: "0.85rem", fontWeight: 600, color: "#374151", mb: 1 }}>Title *</Typography>
                  <RadioGroup
                    row
                    value={traveler.title}
                    onChange={(e) => handleTravelerChange(idx, "title", e.target.value)}
                    sx={{ gap: 2 }}
                  >
                    <FormControlLabel 
                      value="Mr" 
                      control={<Radio size="small" sx={{ color: "#D1D5DB", '&.Mui-checked': { color: '#0b66f9' } }} />} 
                      label={<Typography sx={{ fontSize: "0.85rem", color: "#374151" }}>Mr</Typography>} 
                    />
                    <FormControlLabel 
                      value="Mrs" 
                      control={<Radio size="small" sx={{ color: "#D1D5DB", '&.Mui-checked': { color: '#0b66f9' } }} />} 
                      label={<Typography sx={{ fontSize: "0.85rem", color: "#374151" }}>Mrs</Typography>} 
                    />
                    <FormControlLabel 
                      value="Ms" 
                      control={<Radio size="small" sx={{ color: "#D1D5DB", '&.Mui-checked': { color: '#0b66f9' } }} />} 
                      label={<Typography sx={{ fontSize: "0.85rem", color: "#374151" }}>Ms</Typography>} 
                    />
                  </RadioGroup>
                </Box>

                {/* First Name and Last Name */}
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ fontSize: "0.85rem", fontWeight: 600, color: "#374151", mb: 0.5 }}>First Name *</Typography>
                    <TextField
                      fullWidth
                      size="small"
                      value={traveler.firstName}
                      onChange={(e) => handleTravelerChange(idx, "firstName", e.target.value)}
                      sx={{
                        "& .MuiOutlinedInput-root": { 
                          fontSize: "0.85rem",
                          "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#1976d2" },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#1976d2" },
                          "&:hover": { backgroundColor: "#f0f7ff" },
                        },
                      }}
                    />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ fontSize: "0.85rem", fontWeight: 600, color: "#374151", mb: 0.5 }}>Last Name *</Typography>
                    <TextField
                      fullWidth
                      size="small"
                      value={traveler.lastName}
                      onChange={(e) => handleTravelerChange(idx, "lastName", e.target.value)}
                      sx={{
                        "& .MuiOutlinedInput-root": { 
                          fontSize: "0.85rem",
                          "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#1976d2" },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#1976d2" },
                          "&:hover": { backgroundColor: "#f0f7ff" },
                        },
                      }}
                    />
                  </Box>
                </Box>

                {/* Country and Date of Birth */}
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ fontSize: "0.85rem", fontWeight: 600, color: "#374151", mb: 0.5 }}>Country *</Typography>
                    <FormControl fullWidth size="small">
                      <Select
                        value={traveler.country}
                        onChange={(e) => handleTravelerChange(idx, "country", e.target.value)}
                        sx={{ 
                          fontSize: "0.85rem",
                          "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#1976d2" },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#1976d2" },
                          "&:hover": { backgroundColor: "#f0f7ff" },
                        }}
                      >
                        <MenuItem value="Select" sx={{ fontSize: "0.85rem" }}>Select</MenuItem>
                        <MenuItem value="Pakistan" sx={{ fontSize: "0.85rem" }}>Pakistan  </MenuItem>
                        <MenuItem value="United Arab Emirates" sx={{ fontSize: "0.85rem" }}>United Arab Emirates</MenuItem>
                        <MenuItem value="Saudi Arabia" sx={{ fontSize: "0.85rem" }}>Saudi Arabia</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ fontSize: "0.85rem", fontWeight: 600, color: "#374151", mb: 0.5 }}>Date of Birth *</Typography>
                    <TextField
                      type="text"
                      placeholder="../../...."
                      fullWidth
                      size="small"
                      value={traveler.dateOfBirth}
                      onChange={(e) => handleTravelerChange(idx, "dateOfBirth", e.target.value)}
                      inputProps={{
                        onFocus: (e) => {
                          e.target.type = "date";
                          if (e.target.showPicker) e.target.showPicker();
                        },
                        onClick: (e) => {
                          e.target.type = "date";
                          if (e.target.showPicker) e.target.showPicker();
                        },
                        onBlur: (e) => {
                          if (!e.target.value) e.target.type = "text";
                        },
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end" sx={{ pointerEvents: 'none' }}>
                            <CalendarMonthIcon sx={{ fontSize: "1rem", color: "#9CA3AF" }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": { 
                          fontSize: "0.85rem",
                          "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#1976d2" },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#1976d2" },
                          "&:hover": { backgroundColor: "#f0f7ff" },
                        },
                        "& input::-webkit-calendar-picker-indicator": {
                          display: "none",
                          WebkitAppearance: "none",
                        },
                      }}
                    />
                  </Box>
                </Box>

                {/* Passport and Expiry Date */}
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ fontSize: "0.85rem", fontWeight: 600, color: "#374151", mb: 0.5 }}>CNIC | Passport *</Typography>
                    <TextField
                      fullWidth
                      size="small"
                      value={traveler.passportNumber}
                      onChange={(e) => handleTravelerChange(idx, "passportNumber", e.target.value)}
                      sx={{
                        "& .MuiOutlinedInput-root": { 
                          fontSize: "0.85rem",
                          "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#1976d2" },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#1976d2" },
                          "&:hover": { backgroundColor: "#f0f7ff" },
                        },
                      }}
                    />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ fontSize: "0.85rem", fontWeight: 600, color: "#374151", mb: 0.5 }}>Expiry Date *</Typography>
                    <TextField
                      type="text"
                      placeholder="../../...."
                      fullWidth
                      size="small"
                      value={traveler.passportExpiry}
                      onChange={(e) => handleTravelerChange(idx, "passportExpiry", e.target.value)}
                      inputProps={{
                        onFocus: (e) => {
                          e.target.type = "date";
                          if (e.target.showPicker) e.target.showPicker();
                        },
                        onClick: (e) => {
                          e.target.type = "date";
                          if (e.target.showPicker) e.target.showPicker();
                        },
                        onBlur: (e) => {
                          if (!e.target.value) e.target.type = "text";
                        },
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end" sx={{ pointerEvents: 'none' }}>
                            <CalendarMonthIcon sx={{ fontSize: "1rem", color: "#9CA3AF" }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": { 
                          fontSize: "0.85rem",
                          "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#1976d2" },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#1976d2" },
                          "&:hover": { backgroundColor: "#f0f7ff" },
                        },
                        "& input::-webkit-calendar-picker-indicator": {
                          display: "none",
                          WebkitAppearance: "none",
                        },
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Right Side - Price Summary */}
        <Box
          sx={{
            width: { xs: "100%", md: "320px" },
            flexShrink: 0,
          }}
        >
          <Box
            sx={{
              bgcolor: "white",
              borderRadius: 2,
              p: 2.5,
              border: "1px solid #E5E7EB",
            }}
          >
            <Typography sx={{ fontSize: "0.95rem", fontWeight: 700, color: "#111827", mb: 2 }}>
              Price Summary
            </Typography>

            {/* Price Breakdown */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mb: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography sx={{ fontSize: "0.8rem", color: "#6B7280" }}>Travelers</Typography>
                <Typography sx={{ fontSize: "0.8rem", color: "#111827", fontWeight: 600 }}>
                  {adults || 1} Adult{adults > 1 ? 's' : ''}
                  {children > 0 ? `, ${children} Child${children > 1 ? 'ren' : ''}` : ''}
                  {infants > 0 ? `, ${infants} Infant${infants > 1 ? 's' : ''}` : ''}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography sx={{ fontSize: "0.8rem", color: "#6B7280" }}>Base Fare</Typography>
                <Typography sx={{ fontSize: "0.8rem", color: "#111827", fontWeight: 600 }}>
                  USD {((selectedBaggage?.priceValue || 88.62) * 0.85)?.toFixed(2)}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography sx={{ fontSize: "0.8rem", color: "#6B7280" }}>Taxes & Fees</Typography>
                <Typography sx={{ fontSize: "0.8rem", color: "#111827", fontWeight: 600 }}>
                  USD {((selectedBaggage?.priceValue || 88.62) * 0.15)?.toFixed(2)}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography sx={{ fontSize: "0.8rem", color: "#6B7280" }}>Total Price</Typography>
                <Typography sx={{ fontSize: "0.8rem", color: "#111827", fontWeight: 600 }}>
                  USD {(selectedBaggage?.priceValue || 88.62)?.toLocaleString()}
                </Typography>
              </Box>
            </Box>

            {/* Total Price Highlight */}
            <Box
              sx={{
                bgcolor: "#F3F4F6",
                borderRadius: 1.5,
                p: 2,
                mb: 2,
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography sx={{ fontSize: "0.9rem", fontWeight: 700, color: "#111827" }}>
                  Price you Pay
                </Typography>
                <Typography sx={{ fontSize: "1.1rem", fontWeight: 700, color: "#111827" }}>
                  USD {(selectedBaggage?.priceValue || 88.62)?.toLocaleString()}
                </Typography>
              </Box>
            </Box>

            {/* Payment Icons */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <Box
                sx={{
                  bgcolor: "#FF9900",
                  color: "white",
                  px: 1,
                  py: 0.5,
                  borderRadius: 0.5,
                  fontSize: "0.7rem",
                  fontWeight: 700,
                }}
              >
                MasterCard
              </Box>
              <Box
                sx={{
                  bgcolor: "#0052CC",
                  color: "white",
                  px: 1,
                  py: 0.5,
                  borderRadius: 0.5,
                  fontSize: "0.7rem",
                  fontWeight: 700,
                }}
              >
                VISA
              </Box>
              <Typography sx={{ fontSize: "0.7rem", color: "#6B7280" }}>
                Pay in 3 split-free inst
              </Typography>
            </Box>

            {/* Continue Button */}
            <Button
              variant="contained"
              fullWidth
              onClick={handleContinue}
              sx={{
                bgcolor: "#0b66f9",
                color: "white",
                py: 1.2,
                borderRadius: 1.5,
                fontSize: "0.9rem",
                fontWeight: 700,
                textTransform: "none",
                "&:hover": {
                  bgcolor: "#0052cc",
                },
              }}
            >
              Continue
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
