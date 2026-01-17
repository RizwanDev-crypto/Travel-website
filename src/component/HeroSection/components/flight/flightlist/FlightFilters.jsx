"use client";

import {
  Box,
  Typography,
  Paper,
  IconButton,
  Chip,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Slider,
  Divider,
  Collapse
} from "@mui/material";
import {
  Tune as TuneIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  Flight as FlightIcon,
  LightModeOutlined as MorningIcon,
  WbTwilight as WbTwilightIcon,
  NightsStayOutlined as EveningIcon,
  ConnectingAirports as ConnectingAirportsIcon,
  PaymentsOutlined as PaymentsOutlinedIcon,
  AccessTimeRounded as AccessTimeRoundedIcon,
  Brightness2Outlined as Brightness2OutlinedIcon
} from "@mui/icons-material";

import { useState } from "react";

const FilterSection = ({ title, icon, defaultOpen = true, children, hasDivider = true }) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <Box sx={{ mb: hasDivider ? 0 : 0 }}>
      <Box
        onClick={() => setOpen(!open)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
          py: 1,
          "&:hover": {  opacity: 1 }
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {icon && <Box sx={{ color: "#9CA3AF", display: "flex" }}>{icon}</Box>}
          <Typography sx={{ fontWeight: 600, fontSize: "0.8rem", color: "#1F2937" }}>
            {title}
          </Typography>
        </Box>
        {open ? <KeyboardArrowUpIcon sx={{ fontSize: 18, color: "#9CA3AF" }} /> : <KeyboardArrowDownIcon sx={{ fontSize: 18, color: "#9CA3AF" }} />}
      </Box>
      <Collapse in={open}>
        <Box sx={{ pt: 1 }}>{children}</Box>
      </Collapse>
      {hasDivider && <Divider sx={{ mt: 0.5, borderColor: "#E5E7EB" }} />}
    </Box>
  );
};

export default function FlightFilters({ flightCount = 3 }) {
  const [priceRange, setPriceRange] = useState([425, 10000]);

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        bgcolor: "white",
        borderRadius: 2,
        p: 2,
        pb: 1,
        color: "black",
        border: "1px solid #E5E7EB",
        position: "sticky",
        top: 0,
        mb: 4,
      }}
    >
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <TuneIcon sx={{ color: "#1A53FF", fontSize: 20 }} />
          <Typography variant="h6" sx={{ fontSize: "0.9rem", fontWeight: 700, color: "#1F2937" }}>
            Filters
          </Typography>
          <Chip
            label={flightCount}
            size="small"
            sx={{
              color: "#1E40AF",
              fontWeight: 700,
              background: "#DBEAFE",

              height: 20,
              width: 20,
              minWidth: 20,
              p: 0,
              fontSize: "0.7rem",
              borderRadius: "50%",
              "& .MuiChip-label": {
                px: 0,
              }
            }}
          />
        </Box>
        <Button
          size="small"
          sx={{
            color: "#2563EB",
            textTransform: "none",
            fontWeight: 700,
            fontSize: "0.85rem",
            px: 0,
            minWidth: "auto",
            "&:hover": { bgcolor: "transparent", opacity: 0.8 }
          }}
        >
          Clear
        </Button>
      </Box>

      <Divider sx={{ mb: 0, borderColor: "rgba(75, 85, 99, 0.3)" }} />

      {/* Flight Number Search */}
      <FilterSection title="Flight Number" icon={<Box component="span" sx={{ fontSize: 14, mb :0.3,  }}>✈️</Box>}>
        <TextField
          fullWidth
          size="small"
          placeholder="Enter flight number"
          sx={{
            "& .MuiOutlinedInput-root": {
              bgcolor: "#F9FAFB",
              color: "#1F2937",
              fontSize: "0.8rem",
              "& fieldset": { borderColor: "#E5E7EB" },
              "&:hover fieldset": { borderColor: "#3B82F6" },
              "&.Mui-focused fieldset": { borderColor: "#3B82F6" },
            }
          }}
        />
        <Typography variant="caption" sx={{ color: "#6B7280", mt: 1, display: "block" ,
           fontSize: {xs:"0.6rem", sm:"0.6rem", md:"0.7rem", lg:"0.7rem"},
           mx: {xs:2, sm:1, md:0, lg:1}
        }}>
          Search by flight number
        </Typography>
      </FilterSection>

      {/* Stops */}
     <FilterSection 
  title="Stops" 
  icon={<ConnectingAirportsIcon sx={{ fontSize: 20 }} />}
>
     <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
  {[
    { label: "Direct", count: 2 },
    { label: "1 Stop", count: 30 },
    { label: "2+ Stops", count: 0 }
  ].map((item) => (
    <Box key={item.label} sx={{ 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "space-between",
      cursor: "pointer",
      "&:hover": {
        "& .MuiCheckbox-root": {
          color: "#3B82F6",
        }
      }
    }}>
      <FormControlLabel
        control={
          <Checkbox
            size="small"
            disableRipple
            sx={{
              color: "#D1D5DB",
              outline: "none",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "transparent", 
              },
              "&.Mui-checked": { 
                color: "#3B82F6",
                "&:hover": {
                  backgroundColor: "transparent", 
                }
              },
              "&.Mui-focusVisible": {
                outline: "none",
                boxShadow: "none",
              },
              padding: "4px",
              "& .MuiSvgIcon-root": { fontSize: 18 }
            }}
          />
        }
        label={
          <Typography component="span" sx={{ fontSize: "0.85rem", color: "#4B5563" }}>
            {item.label}
          </Typography>
        }
        sx={{ 
          margin: 0,
          "&:hover": {
            backgroundColor: "transparent", 
          }
        }}
      />
      <Typography sx={{ fontSize: "0.8rem", color: "#6B7280" }}>
        {item.count}
      </Typography>
    </Box>
  ))}
</Box>
      </FilterSection>

      {/* Price Range */}
   <FilterSection  
  title={
    <>
      Price
      <Box component="span" sx={{ 
        ml: 1,
        fontSize: "0.6rem", 
        bgcolor: "#F3F4F6", 
        borderRadius: 3, 
        px: {xs:1, sm:0, md:0, lg:1},
        py: 0.5,
        color: "#4B5563",
        fontWeight: 500
      }}>
        ${priceRange[0]} - ${priceRange[1]}
      </Box>
    </>
  } 
  icon={<PaymentsOutlinedIcon sx={{ fontSize: 16 , color:"#6B7280"}} />}
>
  <Box sx={{ px: 1, mt: 2 }}>
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Typography variant="caption" sx={{ color: "#9CA3AF", }}>$425</Typography>
      <Typography variant="caption" sx={{ color: "#9CA3AF" }}>$10000</Typography>
    </Box>
    <Slider
      value={priceRange}
      onChange={handlePriceChange}
      valueLabelDisplay="auto"
      min={425}
      max={10000}
      sx={{
        height: 6,
        "& .MuiSlider-track": {
          border: "none",
          background: "linear-gradient(to right, #3b82f6, #6366f1, #8b5cf6)",
        },
        "& .MuiSlider-thumb": {
          width: 18,
          height: 18,
          backgroundColor: "#fff",
          border: "2px solid #3b82f6",
          "&:hover": { boxShadow: "0 0 0 8px rgba(59, 130, 246, 0.16)" },
        },
        "& .MuiSlider-rail": { opacity: 0.3, backgroundColor: "#D1D5DB" },
      }}
    />
    <Box
      sx={{
        borderRadius: 1.5,
        py: 1,
        textAlign: "center"
      }}
    >
      <Typography sx={{ 
        fontWeight: 700, 
        fontSize: "0.85rem",  
        bgcolor: "#EFF6FF",   
        borderRadius: 2,
        py: 1,
        width: "100%",
        display: "block",
        color: "#1D4ED8",
        border: "1px solid #BFDBFE",
        textAlign: "center"
      }}>
        ${priceRange[0]} - ${priceRange[1]}
      </Typography>
      <Typography variant="caption" sx={{ 
        opacity: 0.8, 
        display: "block", 
        fontSize: "0.65rem",
        mt: 1,
        color: "#6B7280"
      }}>
        32 flights in range
      </Typography>
    </Box>
  </Box>
</FilterSection>


{/* Departure */}

      <FilterSection title="Departure" icon={<AccessTimeRoundedIcon sx={{ fontSize: 16 , color:"#6B7280"}} />}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5}}>
          {[
            { label: "Early Morning", time: "00:00 - 00:06", icon: <Brightness2OutlinedIcon sx={{ fontSize: 16 ,color:"#F97316"}} /> },
            { label: "Morning", time: "00:00 - 12:00", icon: <MorningIcon sx={{ fontSize: 16, color:"rgb(234 179 8 / var(--tw-text-opacity, 1))"}} /> },
            { label: "Afternoon", time: "12:00 - 18:00", icon: <WbTwilightIcon sx={{ fontSize: 16 , color:"#3B82F6"}} /> },
            { label: "Evening", time: "18:00 - 24:00", icon: <EveningIcon sx={{ fontSize: 16 , color:"#A855F7"}} /> }
          ].map((slot) => (
            <Box key={slot.label} sx={{ 
              display: "flex", 
              alignItems: "center", 
              gap: 1,
              border: "1px solid #E5E7EB",
              borderRadius: 1.5,
              p: 0.5,
              width: "92%",
              transition: "all 0.2s ease",
              cursor: "pointer",
              "&:hover": {
                borderColor: "#3B82F6",
                bgcolor: "#F0F7FF",
                "& .MuiCheckbox-root": {
                  color: "#3B82F6",
                }
              }
            }}>
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    disableRipple
                    sx={{
                      color: "#D1D5DB",
                      outline: "none",
                      boxShadow: "none",
                      "&:hover": {
                        backgroundColor: "transparent", 
                      },
                      "&.Mui-checked": { 
                        color: "#3B82F6",
                        "&:hover": {
                          backgroundColor: "transparent", 
                        }
                      },
                      "&.Mui-focusVisible": {
                        outline: "none",
                        boxShadow: "none",
                      },
                      padding: "4px",
                      "& .MuiSvgIcon-root": { fontSize: 18 }
                    }}
                  />
                }
                label={
                  <Box component="span" sx={{ display: "flex", alignItems: "center", gap: 1, ml: 0.2 }}>
                    <Box component="span" sx={{ 
                      width: 24, 
                      height: 24, 
                      borderRadius: 1, 
                      display: "flex", 
                      alignItems: "center", 
                      justifyContent: "center",
                      color: "#9CA3AF"
                    }}>
                      {slot.icon}
                    </Box>
                    <Box component="span" sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography component="span" sx={{ fontSize: "0.7rem", color: "#1F2937", fontWeight: 600, lineHeight: 1.5, display: "block" }}>{slot.label}</Typography>
                      <Typography component="span" sx={{ color: "#6B7280", fontSize: "0.6rem", lineHeight: 1.3, display: "block" }}>{slot.time}</Typography>
                    </Box>
                  </Box>
                }
                sx={{ 
                  margin: 0,
                  width: "100%",
                  "&:hover": {
                    backgroundColor: "transparent", 
                  }
                }}
              />
            </Box>
          ))}
        </Box>
      </FilterSection>

      {/* Airlines */}
      <FilterSection title="Airlines" icon={<FlightIcon sx={{ fontSize: 16, color:"#6B7280" }} />} hasDivider={false}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          {[
            { label: "Azerbaijan Airlines", count: 1 },
            { label: "CHD", count: 1 },
            { label: "Gulf Air Bahrain", count: 6 },
            { label: "Kuwait Airways", count: 4 },
            { label: "Oman Air", count: 1 },
            { label: "Qatar Airways", count: 5 },
            { label: "Saudi Arabian Airlines", count: 7 },
            { label: "Turkish Airlines", count: 4 },
            { label: "Uzbekistan Airways", count: 1 },
            { label: "flydubai", count: 2 }
          ].map((item) => (
            <Box key={item.label} sx={{ 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "space-between",
              cursor: "pointer",
              "&:hover": {
                "& .MuiCheckbox-root": {
                  color: "#3B82F6",
                }
              }
             }}>
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    disableRipple
                    sx={{
                      color: "#D1D5DB",
                      outline: "none",
                      boxShadow: "none",
                      "&.Mui-checked": { color: "#3B82F6" },
                      "&:hover": { bgcolor: "transparent" },
                      "&.Mui-focusVisible": {
                        outline: "none",
                        boxShadow: "none",
                      },
                      padding: "4px",
                      "& .MuiSvgIcon-root": { fontSize: 18 }
                    }}
                  />
                }
                label={
                  <Typography component="span" sx={{ fontSize: "0.85rem", color: "#4B5563" }}>
                    {item.label}
                  </Typography>
                }
                sx={{ margin: 0 }}
              />
              <Typography sx={{ fontSize: "0.8rem", color: "#9CA3AF" }}>
                {item.count}
              </Typography>
            </Box>
          ))}
        </Box>
      </FilterSection>
    </Paper>
  );
}
