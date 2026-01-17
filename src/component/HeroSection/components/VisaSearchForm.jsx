"use client";

import { useState, useEffect, useRef } from "react";
import { MapPin, ChevronDown } from "lucide-react";
import {
  Grid,
  Box,
  FormControl,
  OutlinedInput,
  InputAdornment,
  Typography,
  List,
  ListItem,
  Paper,
  InputLabel,
  ClickAwayListener,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { LocationOn, Search } from "@mui/icons-material";

const countriesList = [
  { name: "Pakistan", capital: "Islamabad", code: "PK" },
  { name: "United Arab Emirates", capital: "Abu Dhabi", code: "AE" },
  { name: "Saudi Arabia", capital: "Riyadh", code: "SA" },
  { name: "United States", capital: "Washington D.C.", code: "US" },
  { name: "United Kingdom", capital: "London", code: "GB" },
  { name: "Canada", capital: "Ottawa", code: "CA" },
  { name: "Australia", capital: "Canberra", code: "AU" },
  { name: "Germany", capital: "Berlin", code: "DE" },
  { name: "France", capital: "Paris", code: "FR" },
  { name: "Italy", capital: "Rome", code: "IT" },
  { name: "Spain", capital: "Madrid", code: "ES" },
  { name: "China", capital: "Beijing", code: "CN" },
  { name: "Japan", capital: "Tokyo", code: "JP" },
  { name: "South Korea", capital: "Seoul", code: "KR" },
  { name: "India", capital: "New Delhi", code: "IN" },
  { name: "Turkey", capital: "Ankara", code: "TR" },
  { name: "Malaysia", capital: "Kuala Lumpur", code: "MY" },
  { name: "Thailand", capital: "Bangkok", code: "TH" },
  { name: "Singapore", capital: "Singapore", code: "SG" },
  { name: "Qatar", capital: "Doha", code: "QA" },
  { name: "Kuwait", capital: "Kuwait City", code: "KW" },
  { name: "Oman", capital: "Muscat", code: "OM" },
  { name: "Bahrain", capital: "Manama", code: "BH" },
  { name: "Egypt", capital: "Cairo", code: "EG" },
  { name: "Russia", capital: "Moscow", code: "RU" },
];

const DEFAULT_PAKISTAN_CODE = "PK";

const CountryDropdown = ({
  placeholder,
  value,
  onChange,
  isFromCountry = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const selectedCountry = countriesList.find((a) => a.code === value);
    if (selectedCountry) {
      setInputValue(`${selectedCountry.name} (${selectedCountry.code})`);
    } else {
      if (isFromCountry && !value) {
        const pakistanCountry = countriesList.find(
          (a) => a.code === DEFAULT_PAKISTAN_CODE
        );
        if (pakistanCountry) {
          setInputValue(`${pakistanCountry.name} (${pakistanCountry.code})`);
          onChange(DEFAULT_PAKISTAN_CODE);
        }
      } else {
        setInputValue("");
      }
    }
  }, [value, isFromCountry]);

  const handleInputClick = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleSelect = (country) => {
    onChange(country.code);
    setInputValue(`${country.name} (${country.code})`);
    handleClose();
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setSearchTerm(value);

    if (value.length > 0 && !isOpen) {
      setIsOpen(true);
    }

    if (value === "") {
      onChange("");
    }
  };

  const filteredCountries = countriesList.filter(
    (country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.capital.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <FormControl fullWidth size="small" variant="outlined">
        <OutlinedInput
          value={inputValue}
          onChange={handleInputChange}
          onClick={handleInputClick}
          placeholder={isFromCountry && !value ? "Pakistan (PK)" : placeholder}
          startAdornment={
            <InputAdornment position="start">
              <MapPin size={14} style={{ color: "#000" }} />
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">
              <ChevronDown
                size={16}
                style={{
                  color: "#666",
                  cursor: "pointer",
                  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s",
                }}
                onClick={handleInputClick}
              />
            </InputAdornment>
          }
          sx={{
            height: 40,
            "& input": {
              color: "#000",
              paddingTop: "15px",
              fontSize: "10px",
              fontWeight: 700,
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#c0c0c0",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#1976d2",
            },
            "&:hover": {
              backgroundColor: "#f0f7ff",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#1976d2",
              borderWidth: 1,
            },
          }}
        />
      </FormControl>

      {isOpen && (
        <ClickAwayListener onClickAway={handleClose}>
          <Paper
            elevation={3}
            sx={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              zIndex: 999,
              maxHeight: 250,
              overflow: "auto",
              mt: 0.5,
              border: "1px solid #e0e0e0",
              borderRadius: 1,
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          >
            {filteredCountries.length === 0 ? (
              <Box sx={{ p: 2, textAlign: "center" }}>
                <Typography variant="body2" color="text.secondary" fontSize="10px">
                  No countries found
                </Typography>
              </Box>
            ) : (
              <List dense sx={{ p: 0 }}>
                {filteredCountries.map((country) => (
                  <ListItem
                    key={country.code}
                    onClick={() => handleSelect(country)}
                    sx={{
                      px: 1.5,
                      py: 0.5,
                      borderBottom: "1px solid #f0f0f0",
                      "&:last-child": { borderBottom: "none" },
                      "&:hover": {
                        backgroundColor: "#f0f7ff",
                        cursor: "pointer",
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
                      <LocationOn sx={{ fontSize: 14, color: "#666", mr: 1 }} />
                      <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <Typography fontSize="10px" fontWeight={600} lineHeight={1.2}>
                            {country.name}
                          </Typography>
                          <Typography fontSize="10px" color="#1976d2" fontWeight={700} lineHeight={1.2}>
                            {country.code}
                          </Typography>
                        </Box>
                        <Typography fontSize="9px" color="#666" lineHeight={1.1} mt={0.2}>
                          Capital: {country.capital}
                        </Typography>
                      </Box>
                    </Box>
                  </ListItem>
                ))}
              </List>
            )}
          </Paper>
        </ClickAwayListener>
      )}
    </Box>
  );
};

export default function VisaSearchForm() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // xs (0-599px) including Mobile M & L
  
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [fromValue, setFromValue] = useState(DEFAULT_PAKISTAN_CODE);
  const [toValue, setToValue] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const checkInDateRef = useRef(null);

  useEffect(() => {
    const today = new Date();
    setCheckInDate(today.toISOString().split("T")[0]);
  }, []);

  const handleDateInputClick = (ref) => {
    if (ref.current) {
      ref.current.showPicker();
    }
  };

  if (!mounted) return null;

  return (
    <Box sx={{ width: "100%" }}>
      <Grid 
        container 
        spacing={1} 
        alignItems="center" 
        padding={2}
        sx={{
          flexDirection: { xs: "column", sm: "row" },
          gap: { xs: 1.5, sm: 1 }
        }}
      >
        {/* From Country */}
        <Grid item xs={12} sm={4} sx={{ width: { xs: "100%", sm: "auto" } }}>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel shrink sx={{ fontSize: "12px", color: "#A0A0A0", top: "13px", left: "20px" }}>
              From Country
            </InputLabel>
            <Box sx={{ 
              width: { 
                xs: "100%",      // Mobile M & L: full width
                sm: 330,         // Tablet: fixed 330px
                md: 295,         // Desktop: fixed 295px
                lg: 280          // Large Desktop: fixed 280px
              } 
            }}>
              <CountryDropdown
                value={fromValue}
                onChange={setFromValue}
                isFromCountry={true}
              />
            </Box>
          </FormControl>
        </Grid>

        {/* To Country */}
        <Grid item xs={12} sm={4} sx={{ width: { xs: "100%", sm: "auto" } }}>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel shrink sx={{ fontSize: "12px", color: "#A0A0A0", top: "13px", left: "20px" }}>
              To Country
            </InputLabel>
            <Box sx={{ 
              width: { 
                xs: "100%",      // Mobile M & L: full width
                sm: 330,         // Tablet: fixed 330px
                md: 295,         // Desktop: fixed 295px
                lg: 280          // Large Desktop: fixed 280px
              } 
            }}>
              <CountryDropdown
                placeholder="Select Country"
                value={toValue}
                onChange={setToValue}
              />
            </Box>
          </FormControl>
        </Grid>

        {/* Date */}
        <Grid item xs={12} sm={3} sx={{ width: { xs: "100%", sm: "auto" } }}>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel shrink sx={{ fontSize: "12px", color: "#A0A0A0", top: "13px" }}>
              Date
            </InputLabel>
          <OutlinedInput
  type="date"
  value={checkInDate}
  onChange={(e) => setCheckInDate(e.target.value)}
  inputRef={checkInDateRef}
  onClick={() => handleDateInputClick(checkInDateRef)}
  inputProps={{
    min: new Date().toISOString().split("T")[0],
  }}
  sx={{
    height: 40,
    width: { 
      xs: "100%",      // Mobile M & L: full width
      sm: 330,         // Tablet: fixed 330px
      md: 190,         // Desktop: fixed 190px
      lg: 210          // Large Desktop: fixed 210px
    },
    fontSize: "10px",
    fontWeight: 600,
    color: "#000000",
    cursor: "pointer",
    pt: "15px",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#c0c0c0",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#1976d2",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#1976d2",
      borderWidth: 1,
    },
    "&:hover": {
      backgroundColor: "#f0f7ff",
    },
    // REMOVE CALENDAR ICON - Update this CSS
    "& input::-webkit-calendar-picker-indicator": {
      display: "none", // Hide the calendar icon instead of opacity: 0
      cursor: "pointer",
    },
    "& input[type='date']": {
      appearance: "none", // Remove default styling
      "&::-webkit-inner-spin-button": {
        display: "none", // Remove spin buttons
      },
      "&::-webkit-clear-button": {
        display: "none", // Remove clear button
      },
    },
  }}
/>
          </FormControl>
        </Grid>

        {/* Search Button */}
        <Grid item xs={12} sm={2} sx={{ width: { xs: "100%", sm: "auto" } }}>
          <Box sx={{ 
            display: "flex", 
            justifyContent: { xs: "center", sm: "flex-start" }
          }}>
            <IconButton
              color="primary"
              size="small"
              sx={{
                backgroundColor: "#0b66f9",
                "&:hover": { backgroundColor: "#000" },
                width: { 
                  xs: "100%",      // Mobile M & L: full width (first 3 inputs jitni)
                  sm: 330,         // Tablet: fixed 330px
                  md: 50,          // Desktop: fixed 50px
                  lg: 50           // Large Desktop: fixed 50px
                },
                height: 40,
                px: 1.5,
                borderRadius: 1,
              }}
            >
              <Search style={{ color: "white" }} />
              {isMobile && (
                <Typography 
                  sx={{ 
                    color: "white", 
                    ml: 1, 
                    fontSize: "14px",
                    fontWeight: 500 
                  }}
                >
                  Search
                </Typography>
              )}
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}