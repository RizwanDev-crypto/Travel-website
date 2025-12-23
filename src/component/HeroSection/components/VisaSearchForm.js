"use client";

import { useState, useEffect, useRef } from "react";
import { MapPin, Search, ChevronDown } from "lucide-react";
import {
  Grid,
  Box,
  TextField,
  FormControl,
  OutlinedInput,
  InputAdornment,
  Menu,
  MenuItem,
  Button,
  Typography,
} from "@mui/material";

import { countriesAirports } from "../../data/countriesAirports";

// ------------------- Airport Dropdown -------------------
const AirportDropdown = ({ placeholder, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState(null);
  const inputRef = useRef(null);

  const allCities = countriesAirports.flatMap((country) =>
    country.cities.map((city) => ({
      city: city.city,
      country: country.country,
    }))
  );

  const filteredCities = allCities.filter(
    (item) =>
      item.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (city) => {
    setSelectedCity(city);
    onChange(`${city.city}, ${city.country}`);
    setIsOpen(false);
  };

  return (
    <FormControl fullWidth size="small" variant="outlined" ref={inputRef}>
      <OutlinedInput
        value={value || (selectedCity ? `${selectedCity.city}, ${selectedCity.country}` : "")}
        onClick={() => setIsOpen(true)}
        onChange={(e) => {
          onChange(e.target.value);
          setSelectedCity(null);
          setIsOpen(true);
        }}
        placeholder={placeholder}
        startAdornment={
          <InputAdornment position="start">
            <MapPin size={16}/>
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
            fontSize: 12, 
            height: 40, // Height 40px
            width:159
          } 
        }}
        sx={{
          height: 40, // Height 40px
        }}
      />

      <Menu
        anchorEl={inputRef.current}
        open={isOpen}
        onClose={() => setIsOpen(false)}
        PaperProps={{ style: { maxHeight: 180, width: "20%" } }}
      >
        <Box sx={{ px: 1, py: 0.5 }}>
          <TextField
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            size="small"
            fullWidth
            sx={{
              "& .MuiInputBase-root": {
                height: 40, // Height 40px
              },
            }}
          />
        </Box>

        {filteredCities.length === 0 ? (
          <MenuItem disabled>No cities found</MenuItem>
        ) : (
          filteredCities.map((city, index) => (
            <MenuItem key={index} onClick={() => handleSelect(city)}>
              <Typography sx={{ fontSize: 12 }}>
                {city.city}, {city.country}
              </Typography>
            </MenuItem>
          ))
        )}
      </Menu>
    </FormControl>
  );
};

// ------------------- Visa Search Form -------------------
export default function VisaSearchForm() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");
  const [checkInDate, setCheckInDate] = useState("");

  useEffect(() => {
    const today = new Date();
    setCheckInDate(today.toISOString().split("T")[0]);
  }, []);

  if (!mounted) return null;

  return (
    <Box sx={{ width: "100%" }}>
      <Grid container spacing={1} alignItems="center" padding={2}>
        {/* FROM */}
        <Grid
          item
          xs={12}
          sm={4}
          sx={{
            "& .MuiInputBase-root": { 
              height: 40, // Height 40px
              fontSize: "12px" 
            },
          }}
        >
          <AirportDropdown placeholder="From Country" value={fromValue} onChange={setFromValue} />
        </Grid>

        {/* TO */}
        <Grid
          item
          xs={12}
          sm={4}
          sx={{
            "& .MuiInputBase-root": { 
              height: 40, // Height 40px
              fontSize: "12px" 
            },
          }}
        >
          <AirportDropdown placeholder="To Country" value={toValue} onChange={setToValue} />
        </Grid>

        {/* DATE */}
        <Grid item xs={12} sm={3} width={295}>
          <TextField
            fullWidth
            size="small"
            type="date"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{
              "& .MuiInputBase-root": {
                height: 40, // Height 40px
              },
            }}
            InputProps={{ 
              sx: { 
                fontSize: 12,
              } 
            }}
          />
        </Grid>

        {/* SEARCH BUTTON */}
        <Grid item xs={12} sm={1}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ 
              height: 40, // Height 40px
              minHeight: 40, // Ensure minimum height
         pl:3
            }}
            startIcon={<Search />}
          />
        </Grid>
      </Grid>
    </Box>
  );
}