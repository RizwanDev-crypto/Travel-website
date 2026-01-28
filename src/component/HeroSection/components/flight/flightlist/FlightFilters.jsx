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
          <Typography component="div" sx={{ fontWeight: 600, fontSize: "0.8rem", color: "#1F2937" }}>
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

export default function FlightFilters({ 
  flightCount = 3, 
  flightNumberFilter = "", 
  onFlightNumberChange = () => {},
  priceRange = [425, 10000],
  onPriceChange = () => {},
  selectedStops = [],
  onStopsChange = () => {},
  selectedAirlines = [],
  onAirlinesChange = () => {},
  airlinesList = [],
  selectedTimeSlots = [],
  onTimeSlotChange = () => {}
}) {

  const handlePriceChange = (event, newValue) => {
    onPriceChange(newValue);
  };

  const handleStopChange = (label) => {
    const newStops = selectedStops.includes(label)
      ? selectedStops.filter(s => s !== label)
      : [...selectedStops, label];
    onStopsChange(newStops);
  };

  const handleAirlineChange = (airline) => {
    const newAirlines = selectedAirlines.includes(airline)
      ? selectedAirlines.filter(a => a !== airline)
      : [...selectedAirlines, airline];
    onAirlinesChange(newAirlines);
  };

  const handleTimeSlotChange = (slot) => {
    const newSlots = selectedTimeSlots.includes(slot)
      ? selectedTimeSlots.filter(s => s !== slot)
      : [...selectedTimeSlots, slot];
    onTimeSlotChange(newSlots);
  };

  const handleClear = () => {
    onPriceChange([425, 10000]);
    onFlightNumberChange("");
    onStopsChange([]);
    onAirlinesChange([]);
    onTimeSlotChange([]);
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
              width: 24,
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
          onClick={handleClear}
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
          value={flightNumberFilter}
          onChange={(e) => onFlightNumberChange(e.target.value)}
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
    { label: "Direct" },
    { label: "1 Stop" },
    { label: "2+ Stops" }
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
            checked={selectedStops.includes(item.label)}
            onChange={() => handleStopChange(item.label)}
            sx={{
              color: "#D1D5DB",
              "&.Mui-checked": { color: "#3B82F6" },
              padding: "4px",
              "& .MuiSvgIcon-root": { fontSize: 18 },
              "&:hover": { bgcolor: "transparent" }
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
        USD {priceRange[0]} - USD {priceRange[1]}
      </Box>
    </>
  } 
  icon={<PaymentsOutlinedIcon sx={{ fontSize: 16 , color:"#6B7280"}} />}
>
  <Box sx={{ px: 1, mt: 2 }}>
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Typography variant="caption" sx={{ color: "#9CA3AF", }}>USD 425</Typography>
      <Typography variant="caption" sx={{ color: "#9CA3AF" }}>USD 10000</Typography>
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
        },
        "& .MuiSlider-rail": { opacity: 0.3, backgroundColor: "#D1D5DB" },
      }}
    />
  </Box>
</FilterSection>


{/* Departure */}

      <FilterSection title="Departure" icon={<AccessTimeRoundedIcon sx={{ fontSize: 16 , color:"#6B7280"}} />}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5}}>
          {[
            { label: "Early Morning", time: "00:00 - 00:06", icon: <Brightness2OutlinedIcon sx={{ fontSize: 16 ,color:"#F97316"}} /> },
            { label: "Morning", time: "06:00 - 12:00", icon: <MorningIcon sx={{ fontSize: 16, color: "#EAB308" }} /> },
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
              cursor: "pointer",
              transition: "all 0.2s ease",
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
                    checked={selectedTimeSlots.includes(slot.label)}
                    onChange={() => handleTimeSlotChange(slot.label)}
                    sx={{
                      color: "#D1D5DB",
                      "&.Mui-checked": { color: "#3B82F6" },
                      padding: "4px",
                      "& .MuiSvgIcon-root": { fontSize: 18 },
                      "&:hover": { bgcolor: "transparent" }
                    }}
                  />
                }
                label={
                  <Box component="span" sx={{ display: "flex", alignItems: "center", gap: 1, ml: 0.2 }}>
                    {slot.icon}
                    <Box component="span" sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography component="span" sx={{ fontSize: "0.7rem", color: "#1F2937", fontWeight: 600 }}>{slot.label}</Typography>
                      <Typography component="span" sx={{ color: "#6B7280", fontSize: "0.6rem" }}>{slot.time}</Typography>
                    </Box>
                  </Box>
                }
                sx={{ margin: 0, width: "100%" }}
              />
            </Box>
          ))}
        </Box>
      </FilterSection>

      {/* Airlines */}
      <FilterSection title="Airlines" icon={<FlightIcon sx={{ fontSize: 16, color:"#6B7280" }} />} hasDivider={false}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          {airlinesList.map((airline) => (
            <Box key={airline} sx={{ 
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
                    checked={selectedAirlines.includes(airline)}
                    onChange={() => handleAirlineChange(airline)}
                    sx={{
                      color: "#D1D5DB",
                      "&.Mui-checked": { color: "#3B82F6" },
                      padding: "4px",
                      "& .MuiSvgIcon-root": { fontSize: 18 },
                      "&:hover": { bgcolor: "transparent" }
                    }}
                  />
                }
                label={
                  <Typography component="span" sx={{ fontSize: "0.85rem", color: "#4B5563" }}>
                    {airline}
                  </Typography>
                }
                sx={{ margin: 0 }}
              />
            </Box>
          ))}
        </Box>
      </FilterSection>
    </Paper>
  );
}
