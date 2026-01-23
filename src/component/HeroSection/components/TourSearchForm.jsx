"use client";


import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

import TravellersDropdown from "./TravellersDropDown";
import { useGlobalContext } from "@/app/context/GlobalContext";
import {
  MapPin,
  Users,
  ChevronDown,
  Plus,
  Minus,
} from "lucide-react";
import {
  Grid,
  TextField,
  InputAdornment,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Box,
  Typography,
  Stack,
  useMediaQuery,
  useTheme,
  FormControl,
  OutlinedInput,
  InputLabel,
  List,
  ListItem,
  Paper,
  ClickAwayListener,
} from "@mui/material";
import { ArrowRightAlt, LocationOn, Search } from "@mui/icons-material"; // Close remove kiya

// Same flat array structure as FlightSearchForm and HotelSearchForm
const countriesAirports = [
  { city: "Dubai", airport: "Dubai International Airport", code: "DXB" },
  { city: "Abu Dhabi", airport: "Abu Dhabi Intl Airport", code: "AUH" },
  { city: "Karachi", airport: "Jinnah International Airport", code: "KHI" },
  { city: "Lahore", airport: "Allama Iqbal Airport", code: "LHE" },
  { city: "Delhi", airport: "Indira Gandhi International Airport", code: "DEL" },
  { city: "Mumbai", airport: "Chhatrapati Shivaji Maharaj Airport", code: "BOM" },
  { city: "Riyadh", airport: "King Khalid Intl Airport", code: "RUH" },
  { city: "Jeddah", airport: "King Abdulaziz Intl Airport", code: "JED" },
  { city: "Berlin", airport: "Berlin Brandenburg Airport", code: "BER" },
  { city: "Frankfurt", airport: "Frankfurt Airport", code: "FRA" },
];

// Custom CityDropdown Component with integrated search
const CityDropdown = ({ label, value, onChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Initialize input value when selected city changes
  useEffect(() => {
    const selectedCity = countriesAirports.find(a => a.code === value);
    if (selectedCity) {
      setInputValue(`${selectedCity.city} (${selectedCity.code})`);
    } else {
      setInputValue("");
    }
  }, [value]);

  const handleInputClick = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleSelect = (city) => {
    onChange(city.code);
    setInputValue(`${city.city} (${city.code})`);
    handleClose();
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setSearchTerm(value);
    
    // Open dropdown when user starts typing
    if (value.length > 0 && !isOpen) {
      setIsOpen(true);
    }
    
    // If input is cleared, clear the selection
    if (value === "") {
      onChange("");
    }
  };

  const filteredCities = countriesAirports.filter(
    (city) =>
      city.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      city.airport.toLowerCase().includes(searchTerm.toLowerCase()) ||
      city.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedCity = countriesAirports.find(a => a.code === value);

  return (
    <Box sx={{ position: "relative" }}>
      <FormControl fullWidth variant="outlined" size="small">
        <OutlinedInput
          value={inputValue}
          onChange={handleInputChange}
          onClick={handleInputClick}
          placeholder={label}
          startAdornment={
            <InputAdornment position="start">
              <MapPin size={14} style={{ color: "#000" }} /> {/* Lucide MapPin icon */}
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">
              <ChevronDown 
                size={16} 
                style={{ 
                  color: "#000",
                  cursor: "pointer",
                  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.3s ease",
                }}
                onClick={handleInputClick}
              />
            </InputAdornment>
          }
          inputProps={{ 
            style: { 
              fontSize: "10px", // Font size 10px
              fontWeight: 600,   // Same as date field
              height: 40,
              width: "100%",
              color: "#000000", // Black text
            } 
          }}
          sx={{
            height: 40,
            fontFamily: "'Inter', sans-serif",
            "& input": {
              color: "#000", // Black text inside input
            },
            "& .MuiOutlinedInput-input::placeholder": {
              color: "#000", // Black placeholder text
              opacity: 0.7,
              fontSize: "10px", // Font size 10px for placeholder
              fontWeight: 600,   // Same as date field weight for placeholder
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

     

      {/* Show suggestions when open */}
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
              fontFamily: "'Inter', sans-serif",
            }}
          >
            <List dense sx={{ p: 0 }}>
              {filteredCities.length > 0 ? (
                filteredCities.map((city) => (
                  <ListItem
                    key={city.code}
                    onClick={() => handleSelect(city)}
                    sx={{
                      px: 1.5,
                      py: 0.5,
                      borderBottom: "1px solid #f0f0f0",
                      "&:last-child": { borderBottom: "none" },
                      "&:hover": {
                        backgroundColor: "#f0f7ff",
                        cursor: "pointer",
                      },
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
                      <LocationOn sx={{ fontSize: 14, color: "#666", mr: 1 }} />
                      <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <Typography sx={{ fontSize: "10px", fontWeight: 600, lineHeight: 1.2, fontFamily: "'Inter', sans-serif" }}>
                            {city.city}
                          </Typography>
                          <Typography sx={{ fontSize: "10px", color: "#1976d2", fontWeight: 700, lineHeight: 1.2, fontFamily: "'Inter', sans-serif" }}>
                            {city.code}
                          </Typography>
                        </Box>
                        <Typography sx={{ fontSize: "9px", color: "#666", lineHeight: 1.1, mt: 0.2, fontFamily: "'Inter', sans-serif" }}>
                          {city.airport}
                        </Typography>
                      </Box>
                    </Box>
                  </ListItem>
                ))
              ) : (
                <ListItem sx={{ py: 1.5 }}>
                  <Typography sx={{ fontSize: "10px", color: "#666", textAlign: "center", width: "100%" }}>
                    No cities found
                  </Typography>
                </ListItem>
              )}
            </List>
          </Paper>
        </ClickAwayListener>
      )}
    </Box>
  );
};

const TourSearchForm = ({ calendarWidth }) => {
  // ------------------- MEDIA QUERIES -------------------
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { setTourSearchData } = useGlobalContext();

  // ------------------- HYDRATION FIX -------------------
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // ------------------- CITY -------------------
  const [citySearch, setCitySearch] = useState("");
  const [selectedCity, setSelectedCity] = useState(null);

  // Handle city selection
  const handleCityChange = (cityCode) => {
    setCitySearch(cityCode);
    const city = countriesAirports.find(c => c.code === cityCode);
    setSelectedCity(city);
  };

  // ------------------- DATES -------------------
  const [checkInDate, setCheckInDate] = useState("");

  const [checkOutDate, setCheckOutDate] = useState("");

  const router = useRouter();  

  // Added refs for date inputs
  const checkInDateRef = useRef(null);
  const checkOutDateRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem("tourSearchData");
    if (saved) {
      const data = JSON.parse(saved);
      setCitySearch(data.city || "");
      setCheckInDate(data.date || "");
      if (data.travellers) {
        setTravellers(data.travellers);
      }
      if (data.nationalityCode) {
        setNationalityCode(data.nationalityCode);
      }
    } else {
      const today = new Date();
      setCheckInDate(today.toISOString().split("T")[0]);
    }
  }, []);

  // Added date click handler
  const handleDateInputClick = (ref) => {
    if (ref.current) {
      ref.current.showPicker();
    }
  };
  
  const handleSearch = () => {
    if (!citySearch) {
      alert("Please select a city.");
      return;
    }

    const searchData = {
      city: citySearch,
      date: checkInDate,
      travellers,
      nationalityCode,
    };

    setTourSearchData(searchData);
    localStorage.setItem("tourSearchData", JSON.stringify(searchData));

    // Navigate to tours listing route with all search parameters
    router.push(`/tours/${citySearch}/${checkInDate}/${travellers.adults}/${travellers.children}/${nationalityCode}`);
  };

  // ------------------- TRAVELLERS -------------------

    const [travellers, setTravellers] = useState({
      adults: 1,
      children: 0,
      infants: 0,
    });
    const [nationalityCode, setNationalityCode] = useState("PK");

  const [travellerAnchorEl, setTravellerAnchorEl] = useState(null);

  const handleTravellerClick = (event) => {
    setTravellerAnchorEl(event.currentTarget);
  };

  const handleTravellerClose = () => {
    setTravellerAnchorEl(null);
  };

  const updateTraveller = (type, value) => {
    setTravellers((prev) => ({
      ...prev,
      [type]: Math.max(0, prev[type] + value),
    }));
  };

  const travellersLabel = `${travellers.adults} Adults, ${travellers.children} Children`;

  if (!mounted) return null;

  return (
    <Box sx={{ 
      width: "100%",
      fontFamily: "'Inter', sans-serif",
      p: isMobile ? 2 : 0,
      pl: { xs: 3, sm: 1, md: 0, lg: 0 },
    }}>
      {isMobile ? (
        // MOBILE LAYOUT - STACKED COLUMNS
        <Stack spacing={2}>
          {/* CITY SEARCH */}
          <Box sx={{width:"88%"}}>
            <CityDropdown 
              label="Search by City"
              value={citySearch}
              onChange={handleCityChange}
            />
          </Box>

          {/* CHECK-IN DATE - Mobile same design */}
          <Box sx={{width:"88%"}}>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel 
                shrink 
                sx={{ 
                  fontSize: "12px", 
                  color: "#A0A0A0", 
                  top: "13px",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Date
              </InputLabel>
              <OutlinedInput
                type="date"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                inputRef={checkInDateRef}
                onClick={() => handleDateInputClick(checkInDateRef)}
                // ✅ Previous dates disable karein
                inputProps={{
                  min: new Date().toISOString().split("T")[0] // Today's date
                }}
                sx={{
                  height: 40,
                  fontSize: "10px",
                  fontWeight: 600,
                  color: "#000000",
                  cursor: "pointer",
                  pt: "15px",
                  fontFamily: "'Inter', sans-serif",
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
                  // REMOVE CALENDAR ICON - Added this CSS
                  "& input::-webkit-calendar-picker-indicator": {
                    display: "none", // Hide the calendar icon
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
          </Box>

          {/* TRAVELLERS - Mobile */}
          <Box sx={{width:"88%"}}>
            <TravellersDropdown 
              travellers={travellers} 
              onTravellersChange={setTravellers} 
              nationalityCode={nationalityCode}
              onNationalityChange={setNationalityCode}
              sx={{
                width: "100%",
                fontSize: "14px",
              }}
            />
          </Box>

          {/* SEARCH BUTTON - MOBILE */}
         <Box sx={{ 
                   width: { xs: "88%", sm: "100%", md: 50, lg: 50 },
                   mt: { xs: 1, sm: 0, md: 0, lg: 0 },
                   display: "flex",
                   justifyContent: { xs: "center", sm: "center", md: "flex-start" }
                 }}>
                   <IconButton
                     color="primary"
                     size="small"
                     onClick={handleSearch}
                     sx={{
                       backgroundColor: "#0b66f9",
                       "&:hover": { backgroundColor: "#000" },
                       width: "100%",
                       height: 44,
                       px: 1.5,
                       borderRadius: 1,
                       fontFamily: "'Inter', sans-serif",
                     
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
        </Stack>
      ) : (
        // DESKTOP LAYOUT - ORIGINAL GRID
        <Grid container spacing={1.5} alignItems="center" margin={2} paddingTop={2} paddingBottom={2}>
          {/* CITY */}
          <Grid item xs={12} sm={4}>
            <Box sx={{ width:{sm:350, md:280, lg:280 }}}>
              <CityDropdown 
                label="Search by City"
                value={citySearch}
                onChange={handleCityChange}
              />
            </Box>
          </Grid>

          {/* CHECK-IN DATE - Desktop */}
          <Grid item xs={12} sm="auto" sx={{ width: calendarWidth || { xs: "100%",sm: "44%", md: 230, lg: 300 } }}>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel 
                shrink 
                sx={{ 
                  fontSize: "12px", 
                  color: "#A0A0A0", 
                  top: "13px",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Date
              </InputLabel>
              <OutlinedInput
                type="date"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                inputRef={checkInDateRef}
                onClick={() => handleDateInputClick(checkInDateRef)}
                // ✅ Previous dates disable karein
                inputProps={{
                  min: new Date().toISOString().split("T")[0] // Today's date
                }}
                sx={{
                  height: 40,
                  fontSize: "10px",
                  fontWeight: 600,
                  color: "#000000",
                  cursor: "pointer",
                  pt: "15px",
                  fontFamily: "'Inter', sans-serif",
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
                  // REMOVE CALENDAR ICON - Added this CSS
                  "& input::-webkit-calendar-picker-indicator": {
                    display: "none", // Hide the calendar icon
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

          {/* TRAVELLERS - Desktop */}
          <Grid item xs={12} sm={2} md={3} lg={3}>
            <TravellersDropdown 
              travellers={travellers} 
              onTravellersChange={setTravellers} 
              nationalityCode={nationalityCode}
              onNationalityChange={setNationalityCode}
              sx={{
                width: {sm:660, md:"100%", lg:"100%"},
                minWidth: 195,
              }}
            />
          </Grid>

          {/* Search Button - Desktop */}
          <Grid item xs={12} sm={2}>
            <IconButton
              color="primary"
              size="small"
              onClick={handleSearch}
              sx={{
                backgroundColor: "#0b66f9",
                "&:hover": { backgroundColor: "#000" },
                width:{xs:235 , sm:660,  md:50, lg:50},
                height: 40,
                px:1.5,
                borderRadius: 1,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              <Search style={{ color: "white" }} />
            </IconButton>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default TourSearchForm;