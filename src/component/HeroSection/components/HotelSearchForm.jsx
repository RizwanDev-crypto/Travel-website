"use client";

import { useState, useEffect, useRef } from "react";
import { 
  TextField, 
  Grid, 
  IconButton, 
  InputAdornment, 
  MenuItem, 
  Box, 
  Button,
  Stack,
  useMediaQuery,
  useTheme,
  FormControl,
  OutlinedInput,
  InputLabel,
  Menu,
  Typography,
  List,
  ListItem,
  Paper,
  ClickAwayListener
} from "@mui/material";
import { MapPin } from "lucide-react";
import { LocationOn, Search } from "@mui/icons-material";
import TravellersDropdown from "./TravellersDropDown";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/app/context/GlobalContext";
import { countriesAirports as countriesAirportsData } from "../../data/countriesAirports";


// Flatten the countries data to get all cities
const countriesAirports = countriesAirportsData.flatMap(country => 
  country.cities.map(city => ({
    city: city.city,
    airport: city.airport,
    code: city.code,
    country: country.country
  }))
);

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
              <MapPin size={14} style={{ color: "#000000" }} />
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">
              <Box 
                component="span" 
                sx={{ 
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  color: "#000000",
                }}
                onClick={handleInputClick}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  style={{
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.3s ease",
                  }}
                >
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </Box>
            </InputAdornment>
          }
          inputProps={{ 
            style: { 
              fontSize: "10px",
              fontWeight: 600,
              height: 44,
              width: "100%",
              color: "#000000",
            } 
          }}
          sx={{
            height:44,
            fontFamily: "'Inter', sans-serif",
            "& input": {
              color: "#000000",
            },
            "& .MuiOutlinedInput-input::placeholder": {
              color: "#000000",
              opacity: 0.7,
              fontSize: "10px",
              fontWeight: 600,
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

      {/* Dropdown List */}
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
            {filteredCities.length === 0 ? (
              <Box sx={{ p: 2, textAlign: "center" }}>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: "10px", fontFamily: "'Inter', sans-serif", color: "#000000" }}>
                  No cities found
                </Typography>
              </Box>
            ) : (
              <List dense sx={{ p: 0 }}>
                {filteredCities.map((city) => (
               <ListItem
  key={city.code}
  onMouseDown={(e) => {
    e.preventDefault();   //  stops ClickAway race
    handleSelect(city);
  }}
                    sx={{
                      px: 1.5,
                      py: 1,
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
                      <LocationOn sx={{ fontSize: 14, color: "#000000", mr: 1 }} />
                      <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <Typography sx={{ fontSize: "10px", fontWeight: 600, lineHeight: 1.2, fontFamily: "'Inter', sans-serif", color: "#000000" }}>
                            {city.city}
                          </Typography>
                          <Typography sx={{ fontSize: "10px", color: "#1976d2", fontWeight: 700, lineHeight: 1.2, fontFamily: "'Inter', sans-serif" }}>
                            {city.code}
                          </Typography>
                        </Box>
                        <Typography sx={{ fontSize: "9px", color: "#000000", lineHeight: 1.1, mt: 0.2, fontFamily: "'Inter', sans-serif", opacity: 0.8 }}>
                          {city.airport}
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

const HotelSearchForm = ({ calendarWidth = { xs: "100%", md: 290, lg: 357 } }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
  /* ===================== SINGLE FORM STATE ===================== */
  const [formState, setFormState] = useState({
    citySearch: "",
    checkInDate: "",
    checkOutDate: "",
    nationalityCode: "PK",
  });
  const [travellers, setTravellers] = useState({ adults: 2, children: 0, infants: 0 });
  
  const handleChange = (field, value) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const {
    citySearch,
    checkInDate,
    checkOutDate,
    nationalityCode,
  } = formState;

  const [selectedCity, setSelectedCity] = useState(null);
  
  const router = useRouter();
  const { setHotelSearchData } = useGlobalContext();

  // Added refs for date inputs
  const checkInDateRef = useRef(null);
  const checkOutDateRef = useRef(null);

  // Set initial dates - same logic as FlightSearchForm
  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    setFormState(prev => ({
      ...prev,
      checkInDate: today.toISOString().split("T")[0],
      checkOutDate: tomorrow.toISOString().split("T")[0]
    }));
  }, []);

  // ✅ Load from localStorage on Hotel Listing page
  useEffect(() => {
    const saved = localStorage.getItem("hotelSearchData");
    if (saved) {
      const data = JSON.parse(saved);
      setFormState({
        citySearch: data.city || "",
        checkInDate: data.checkIn || "",
        checkOutDate: data.checkOut || "",
        nationalityCode: data.nationalityCode || "PK",
      });
      
      if (data.travellers) {
        setTravellers(data.travellers);
      }
    }
  }, []);

  // Check-out date ko automatically update karein jab check-in date change ho
  // SAME LOGIC AS FLIGHTSEARCHFORM
  useEffect(() => {
    if (checkInDate && checkOutDate) {
      if (checkOutDate < checkInDate) {
        // Agar check-out date check-in date se pehle hai, toh check-out date ko check-in date kar do
        handleChange("checkOutDate", checkInDate);
      }
    }
  }, [checkInDate]);

  // Added date click handler
  const handleDateInputClick = (ref) => {
    if (ref.current) {
      ref.current.showPicker();
    }
  };

  // Handle city selection
  const handleCityChange = (cityCode) => {
    handleChange("citySearch", cityCode);
    const city = countriesAirports.find(c => c.code === cityCode);
    setSelectedCity(city);
  };

  const handleSearch = () => {
    if (!citySearch) {
      alert("Please select a city.");
      return;
    }

    const searchData = {
      city: citySearch,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      travellers,
      nationalityCode,
    };

    setHotelSearchData(searchData);
    localStorage.setItem("hotelSearchData", JSON.stringify(searchData));

    // Navigate to hotel listing route
    router.push(`/hotels/${citySearch}/${checkInDate}/${checkOutDate}/${travellers.adults}/${travellers.children}/${nationalityCode}`);
  };

  return (
    <Box sx={{ 
      fontFamily: "'Inter', sans-serif",
      p: isMobile ? 2 : 0,
    }}>
      {isMobile ? (
        // MOBILE LAYOUT - STACKED COLUMNS
        <Stack spacing={2}>
          {/* City Search */}
          <Box>
            <CityDropdown 
              label="Search by City"
              value={citySearch}
              onChange={handleCityChange}
            />
          </Box>

          {/* Check-In and Check-Out - Mobile Stacked */}
          <Stack spacing={2}>
            {/* Check-In Date - Mobile */}
            <Box>
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
                  Check-In Date
                </InputLabel>
                <OutlinedInput
                  type="date"
                  value={checkInDate}
                  onChange={(e) => {
                    handleChange("checkInDate", e.target.value);
                    setTimeout(() => {
                      if (checkOutDateRef.current) {
                        checkOutDateRef.current.showPicker();
                      }
                    }, 500); // Small delay to ensure mobile keyboard/UI transitions smoothly
                  }}
                  inputRef={checkInDateRef}
                  onClick={() => handleDateInputClick(checkInDateRef)}
                  inputProps={{
                    min: new Date().toISOString().split("T")[0], // Today's date
                  }}
                  sx={{
                    height: 44,
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
                    // REMOVE CALENDAR ICON
                    "& input::-webkit-calendar-picker-indicator": {
                      display: "none",
                      cursor: "pointer",
                    },
                    "& input[type='date']": {
                      appearance: "none",
                      "&::-webkit-inner-spin-button": {
                        display: "none",
                      },
                      "&::-webkit-clear-button": {
                        display: "none",
                      },
                    },
                  }}
                />
              </FormControl>
            </Box>

            {/* Check-Out Date - Mobile */}
            <Box>
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
                  Check-Out Date
                </InputLabel>
                <OutlinedInput
                  type="date"
                  value={checkOutDate}
                  onChange={(e) => handleChange("checkOutDate", e.target.value)}
                  inputRef={checkOutDateRef}
                  onClick={() => handleDateInputClick(checkOutDateRef)}
                  // ✅ Previous dates disable karein - Check-In date se pehle ki dates
                  // SAME LOGIC AS FLIGHTSEARCHFORM
                  inputProps={{
                    min: checkInDate || new Date().toISOString().split("T")[0]
                  }}
                  sx={{
                    height: 44,
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
                    // REMOVE CALENDAR ICON
                    "& input::-webkit-calendar-picker-indicator": {
                      display: "none",
                      cursor: "pointer",
                    },
                    "& input[type='date']": {
                      appearance: "none",
                      "&::-webkit-inner-spin-button": {
                        display: "none",
                      },
                      "&::-webkit-clear-button": {
                        display: "none",
                      },
                    },
                  }}
                />
              </FormControl>
            </Box>
          </Stack>

          {/* Travellers */}
          <Box>
            <TravellersDropdown 
              travellers={travellers} 
              onTravellersChange={setTravellers}
              nationalityCode={nationalityCode}
              onNationalityChange={(val) => handleChange("nationalityCode", val)}
              mode="hotel"
              sx={{
                fontFamily: "'Inter', sans-serif",
                "& .MuiButton-root": {
                  height: 44,
                  fontSize: "14px",
                  fontFamily: "'Inter', sans-serif",
                  color: "#000000",
                },
                "& .MuiTypography-root": {
                  color: "#000000",
                }
              }}
            />
          </Box>

          {/* Search Button - Mobile */}
        <Box sx={{ 
          width: { xs: "100%", sm: "100%", md: 50, lg: 50 },
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
        <Grid container spacing={1} alignItems="center" margin={2} paddingTop={2} paddingBottom={2}>
          {/* City */}
          <Grid item xs={12} sm={4}>
            <Box sx={{ width: {xs:"0", sm:670, md:250, lg:250} }}>
              <CityDropdown 
                label="Search by City"
                value={citySearch}
                onChange={handleCityChange}
              />
            </Box>
          </Grid>

          {/* Check-In and Check-Out - Desktop Side by Side */}
          <Box
            sx={{
              display: "flex",
              gap: 1,
              width: calendarWidth,
              flexDirection: { xs: "column", md: "row" },
              mt: { xs: "5px", md: "0.4px", lg: "0.4px" },
            }}
          >
            {/* Check-In Date - Desktop */}
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel shrink sx={{ fontSize: "12px", color: "#A0A0A0", top: "13px" }}>
                Check-In
              </InputLabel>
              <OutlinedInput
                type="date"
                value={checkInDate}
                onChange={(e) => {
                  handleChange("checkInDate", e.target.value);
                  setTimeout(() => {
                    if (checkOutDateRef.current) {
                      checkOutDateRef.current.showPicker();
                    }
                  }, 100);
                }}
                inputRef={checkInDateRef}
                onClick={() => handleDateInputClick(checkInDateRef)}
                // ✅ Previous dates disable karein
                inputProps={{
                  min: new Date().toISOString().split("T")[0] // Today's date
                }}
                sx={{
                  height: 44,
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
                  // REMOVE CALENDAR ICON
                  "& input::-webkit-calendar-picker-indicator": {
                    display: "none",
                  },
                  "& input[type='date']": {
                    appearance: "none",
                    "&::-webkit-inner-spin-button": {
                      display: "none",
                    },
                    "&::-webkit-clear-button": {
                      display: "none",
                    },
                  },
                }}
              />
            </FormControl>

            {/* Check-Out Date - Desktop */}
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel shrink sx={{ fontSize: "12px", color: "#A0A0A0", top: "13px" }}>
                Check-Out
              </InputLabel>
              <OutlinedInput
                type="date"
                value={checkOutDate}
                onChange={(e) => handleChange("checkOutDate", e.target.value)}
                inputRef={checkOutDateRef}
                onClick={() => handleDateInputClick(checkOutDateRef)}
                // ✅ Previous dates disable karein - Check-In date se pehle ki dates
                // SAME LOGIC AS FLIGHTSEARCHFORM
                inputProps={{
                  min: checkInDate || new Date().toISOString().split("T")[0]
                }}
                sx={{
                  height: 44,
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
                  // REMOVE CALENDAR ICON
                  "& input::-webkit-calendar-picker-indicator": {
                    display: "none",
                  },
                  "& input[type='date']": {
                    appearance: "none",
                    "&::-webkit-inner-spin-button": {
                      display: "none",
                    },
                    "&::-webkit-clear-button": {
                      display: "none",
                    },
                  },
                }}
              />
            </FormControl>
          </Box>

          {/* Travellers */}
          <Grid item xs={12} sm={2} md={3} lg={3}>
            <TravellersDropdown
              travellers={travellers}
              onTravellersChange={setTravellers}
              nationalityCode={nationalityCode}
              onNationalityChange={(val) => handleChange("nationalityCode", val)}
              mode="hotel"
              sx={{
                minWidth: {sm: 429, md: 180, lg: 180},
                width: 19,
                fontSize: 10,
                height: 44,
                fontFamily: "'Inter', sans-serif",
              }}
            />
          </Grid>

          {/* Search Button */}
          <Grid item xs={12} sm={2}>
            <IconButton
              color="primary"
              size="small"
              onClick={handleSearch}
              sx={{
                backgroundColor: "#0b66f9",
                "&:hover": { backgroundColor: "#000" },
                width: {xs: 235, md: 50, lg: 50},
                height: 44,
                px: 1,
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

export default HotelSearchForm;