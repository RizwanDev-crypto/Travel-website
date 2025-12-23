"use client";

import { useState, useEffect, useRef } from "react";
import { MapPin, Search, ChevronDown } from "lucide-react";
import {
  Grid,
  TextField,
  FormControl,
  OutlinedInput,
  InputAdornment,
  Menu,
  MenuItem,
  Button,
  Box,
  Typography,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import TravellersDropdown from "./TravellersDropDown";
import { countriesAirports } from "../../data/countriesAirports";

// ------------------------------
// COMPONENT: AirportDropdown (MUI) - Updated with same array
// ------------------------------
const AirportDropdown = ({ placeholder = "Flying From", value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState(null);
  const inputRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const allCities = countriesAirports.flatMap((country) =>
    country.cities.map((city) => ({
      city: city.city,
      country: country.country,
      code: city.code,
      airport: city.airport,
    }))
  );

  const filteredCities = allCities.filter(
    (item) =>
      item.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.code && item.code.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSelect = (city) => {
    setSelectedCity(city);
    onChange(`${city.city}, ${city.country} (${city.code})`);
    setIsOpen(false);
  };

  return (
    <FormControl fullWidth size="small" variant="outlined" ref={inputRef}>
      <OutlinedInput
        value={value || (selectedCity ? `${selectedCity.city}, ${selectedCity.country} (${selectedCity.code})` : "")}
        onClick={() => setIsOpen(true)}
        onChange={(e) => {
          onChange(e.target.value);
          setSelectedCity(null);
          setIsOpen(true);
        }}
        placeholder={placeholder}
        startAdornment={
          <InputAdornment position="start">
            <MapPin size={16} />
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end">
            <ChevronDown
              style={{
                transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s",
              }}
              size={16}
            />
          </InputAdornment>
        }
        inputProps={{ 
          style: { 
            fontSize: isMobile ? "14px" : 12, 
            height: isMobile ? 44 : 40,
            fontFamily: "'Inter', sans-serif",
          } 
        }}
        sx={{
          height: isMobile ? 44 : 40,
          width: "100%",
          fontFamily: "'Inter', sans-serif",
        }}
      />

      <Menu
        anchorEl={inputRef.current}
        open={isOpen}
        onClose={() => setIsOpen(false)}
        PaperProps={{ 
          style: { 
            maxHeight: 180, 
            width: isMobile ? "90vw" : "240px",
            fontFamily: "'Inter', sans-serif",
          } 
        }}
      >
        <Box sx={{ px: 1, }}>
          <TextField
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            size="small"
            fullWidth
            sx={{
              "& .MuiInputBase-root": {
                height: isMobile ? 44 : 40,
                fontFamily: "'Inter', sans-serif",
              },
              "& .MuiInputBase-input": {
                fontFamily: "'Inter', sans-serif",
                fontSize: isMobile ? "14px" : "inherit",
              },
            }}
          />
        </Box>

        {filteredCities.length === 0 ? (
          <MenuItem disabled sx={{ fontFamily: "'Inter', sans-serif", fontSize: isMobile ? "14px" : "inherit" }}>
            No cities found
          </MenuItem>
        ) : (
          filteredCities.map((city, index) => (
            <MenuItem key={index} onClick={() => handleSelect(city)} sx={{ fontFamily: "'Inter', sans-serif" }}>
              <Typography sx={{ fontSize: isMobile ? "14px" : 12, fontFamily: "'Inter', sans-serif" }}>
                {city.city}, {city.country} ({city.code})
              </Typography>
            </MenuItem>
          ))
        )}
      </Menu>
    </FormControl>
  );
};

// ------------------------------
// COMPONENT: SearchButton
// ------------------------------
const SearchButton = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<Search sx={{ height: isMobile ? 44 : 40 }} />}
      fullWidth={isMobile}
      sx={{
        width: isMobile ? "100%" : "60px",
        alignItems: "center",
        height: isMobile ? 44 : 40,
        margin: "auto",
        fontFamily: "'Inter', sans-serif",
        "& .MuiButton-startIcon": {
          marginRight: isMobile ? "8px" : "-4px",
        },
        fontSize: isMobile ? "14px" : "inherit",
        textTransform: "none",
      }}
    >
      {isMobile ? "Search" : ""}
    </Button>
  );
};

// ------------------------------
// MAIN COMPONENT: CarSearchForm (MUI Full Width Airports)
// ------------------------------
export default function CarSearchForm() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
  const [flyingFrom, setFlyingFrom] = useState("");
  const [destinationTo, setDestinationTo] = useState("");
  const [pickUpDate, setPickUpDate] = useState("");
  const [pickUpTime, setPickUpTime] = useState("");
  const [dropOffDate, setDropOffDate] = useState("");
  const [dropOffTime, setDropOffTime] = useState("");
  const [travellers, setTravellers] = useState({ adults: 0, children: 0, infants: 0 });

  useEffect(() => {
    const today = new Date();
    const plus7 = new Date();
    plus7.setDate(today.getDate() + 7);

    setPickUpDate(today.toISOString().split("T")[0]);
    setPickUpTime("09:00");
    setDropOffDate(plus7.toISOString().split("T")[0]);
    setDropOffTime("09:00");
  }, []);

  return (
    <Box sx={{ 
      width: "100%", 
      gap: 1, 
      paddingY: 1,
      fontFamily: "'Inter', sans-serif",
    }}>
      {/* ROW 1: FROM + TO (Full Width) */}
      {isMobile ? (
        // Mobile Layout - Stacked Columns
        <Stack spacing={2} sx={{ p: 2, }}>
          <AirportDropdown 
            placeholder="Flying From" 
            value={flyingFrom} 
            onChange={setFlyingFrom} 
          />
          <AirportDropdown 
            placeholder="Destination To" 
            value={destinationTo} 
            onChange={setDestinationTo} 
          />
        </Stack>
      ) : (
        // Desktop Layout - Grid
        <Grid container  spacing={1} sx={{ p: 2}}>
          <Grid   item xs={12} sm={6}>
            <AirportDropdown 
              placeholder="Flying From" 
              value={flyingFrom} 
              onChange={setFlyingFrom} 
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AirportDropdown 
              placeholder="Destination To" 
              value={destinationTo}  
              onChange={setDestinationTo} 
            />
          </Grid>
        </Grid>
      )}

      {/* ROW 2: Pick-Up & Drop-Off + Travellers + Search */}
      {isMobile ? (
        // Mobile Layout - Stacked Columns
        <Stack spacing={2} sx={{ p: 2 }}>
          {/* Pick-Up Date */}
          <TextField
            fullWidth
            size="small"
            type="date"
            label="Pick-Up Date"
            value={pickUpDate}
            onChange={(e) => setPickUpDate(e.target.value)}
            InputLabelProps={{ 
              shrink: true,
              style: { fontFamily: "'Inter', sans-serif" }
            }}
            sx={{
              "& .MuiInputBase-root": {
                height: 44,
                fontFamily: "'Inter', sans-serif",
              },
            }}
            inputProps={{ 
              style: { 
                fontSize: 14,
                height: 44,
                fontFamily: "'Inter', sans-serif",
              }
            }}
          />

          {/* Pick-Up Time */}
          <TextField
            fullWidth
            size="small"
            type="time"
            label="Pick-Up Time"
            value={pickUpTime}
            onChange={(e) => setPickUpTime(e.target.value)}
            InputLabelProps={{ 
              shrink: true,
              style: { fontFamily: "'Inter', sans-serif" }
            }}
            sx={{
              "& .MuiInputBase-root": {
                height: 44,
                fontFamily: "'Inter', sans-serif",
              },
            }}
            inputProps={{ 
              style: { 
                fontSize: 14,
                height: 44,
                fontFamily: "'Inter', sans-serif",
              }
            }}
          />

          {/* Drop-Off Date */}
          <TextField
            fullWidth
            size="small"
            type="date"
            label="Drop-Off Date"
            value={dropOffDate}
            onChange={(e) => setDropOffDate(e.target.value)}
            InputLabelProps={{ 
              shrink: true,
              style: { fontFamily: "'Inter', sans-serif" }
            }}
            sx={{
              "& .MuiInputBase-root": {
                height: 44,
                fontFamily: "'Inter', sans-serif",
              },
            }}
            inputProps={{ 
              style: { 
                fontSize: 14,
                height: 44,
                fontFamily: "'Inter', sans-serif",
              }
            }}
          />

          {/* Drop-Off Time */}
          <TextField
            fullWidth
            size="small"
            type="time"
            label="Drop-Off Time"
            value={dropOffTime}
            onChange={(e) => setDropOffTime(e.target.value)}
            InputLabelProps={{ 
              shrink: true,
              style: { fontFamily: "'Inter', sans-serif" }
            }}
            sx={{
              "& .MuiInputBase-root": {
                height: 44,
                fontFamily: "'Inter', sans-serif",
              },
            }}
            inputProps={{ 
              style: { 
                fontSize: 14,
                height: 44,
                fontFamily: "'Inter', sans-serif",
              }
            }}
          />

          {/* Travellers */}
          <Box sx={{ width: "100%" }}>
            <TravellersDropdown 
              travellers={travellers} 
              onTravellersChange={setTravellers} 
              sx={{
                "& .MuiButton-root": {
                  height: 44,
                  fontSize: "14px",
                  fontFamily: "'Inter', sans-serif",
                },
              }}
            />
          </Box>

          {/* Search Button */}
          <SearchButton />
        </Stack>
      ) : (
        // Desktop Layout - Grid
        <Grid container spacing={2} alignItems="center" sx={{ m: 2 }}>
          <Grid item xs={12} sm={2}>
            <TextField
              fullWidth
              size="small"
              type="date"
              label="Pick-Up Date"
              value={pickUpDate}
              onChange={(e) => setPickUpDate(e.target.value)}
              InputLabelProps={{ 
                shrink: true,
                style: { fontFamily: "'Inter', sans-serif" }
              }}
              sx={{
                "& .MuiInputBase-root": {
                  height: 40,
                  fontFamily: "'Inter', sans-serif",
                },
              }}
              inputProps={{ 
                style: { 
                  fontSize: 12,
                  height: 40,
                  fontFamily: "'Inter', sans-serif",
                }
              }}
            />
          </Grid>

          <Grid item xs={12} sm={2}>
            <TextField
              fullWidth
              size="small"
              type="time"
              label="Pick-Up Time"
              value={pickUpTime}
              onChange={(e) => setPickUpTime(e.target.value)}
              InputLabelProps={{ 
                shrink: true,
                style: { fontFamily: "'Inter', sans-serif" }
              }}
              sx={{
                "& .MuiInputBase-root": {
                  height: 40,
                  fontFamily: "'Inter', sans-serif",
                },
              }}
              inputProps={{ 
                style: { 
                  fontSize: 12,
                  height: 40,
                  fontFamily: "'Inter', sans-serif",
                }
              }}
            />
          </Grid>

          <Grid item xs={12} sm={2}>
            <TextField
              fullWidth
              size="small"
              type="date"
              label="Drop-Off Date"
              value={dropOffDate}
              onChange={(e) => setDropOffDate(e.target.value)}
              InputLabelProps={{ 
                shrink: true,
                style: { fontFamily: "'Inter', sans-serif" }
              }}
              sx={{
                "& .MuiInputBase-root": {
                  height: 40,
                  fontFamily: "'Inter', sans-serif",
                },
              }}
              inputProps={{ 
                style: { 
                  fontSize: 12,
                  height: 40,
                  fontFamily: "'Inter', sans-serif",
                }
              }}
            />
          </Grid>

          <Grid item xs={12} sm={2}>
            <TextField
              fullWidth
              size="small"
              type="time"
              label="Drop-Off Time"
              value={dropOffTime}
              onChange={(e) => setDropOffTime(e.target.value)}
              InputLabelProps={{ 
                shrink: true,
                style: { fontFamily: "'Inter', sans-serif" }
              }}
              sx={{
                "& .MuiInputBase-root": {
                  height: 40,
                  fontFamily: "'Inter', sans-serif",
                },
              }}
              inputProps={{ 
                style: { 
                  fontSize: 12,
                  height: 40,
                  fontFamily: "'Inter', sans-serif",
                }
              }}
            />
          </Grid>

          <Grid item xs={12} sm={2}>
            <TravellersDropdown 
              travellers={travellers} 
              onTravellersChange={setTravellers} 
              sx={{
                "& .MuiButton-root": {
                  height: 40,
                  fontSize: "12px",
                  fontFamily: "'Inter', sans-serif",
                },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={2}>
            <SearchButton />
          </Grid>
        </Grid>
      )}
    </Box>
  );
}