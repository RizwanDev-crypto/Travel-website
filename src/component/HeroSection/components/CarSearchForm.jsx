"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/app/context/GlobalContext";
import { MapPin, ChevronDown } from "lucide-react";
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
  List,
  ListItem,
  Paper,
  InputLabel,
  ClickAwayListener,
  IconButton,
} from "@mui/material";
import { LocationOn, Search, AccessTime } from "@mui/icons-material";
import TravellersDropdown from "./TravellersDropDown";
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

const timeSlots = [
  "12:00 AM", "12:30 AM", "01:00 AM", "01:30 AM", "02:00 AM", "02:30 AM",
  "03:00 AM", "03:30 AM", "04:00 AM", "04:30 AM", "05:00 AM", "05:30 AM",
  "06:00 AM", "06:30 AM", "07:00 AM", "07:30 AM", "08:00 AM", "08:30 AM",
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
  "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM",
  "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM", "08:00 PM", "08:30 PM",
  "09:00 PM", "09:30 PM", "10:00 PM", "10:30 PM", "11:00 PM", "11:30 PM"
];

// TimeDropdown Component
const TimeDropdown = ({ label, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value || "");

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleSelect = (time) => {
    onChange(time);
    setInputValue(time);
    setIsOpen(false);
  };

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
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
          {label}
        </InputLabel>
        <OutlinedInput
          value={inputValue}
          onClick={() => setIsOpen(!isOpen)}
          readOnly
          endAdornment={
            <InputAdornment position="end">
              <ChevronDown
                size={12}
                style={{
                  color: "#000",
                  cursor: "pointer",
                  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s",
                }}
                onClick={() => setIsOpen(!isOpen)}
              />
            </InputAdornment>
          }
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
          }}
        />
      </FormControl>

      {isOpen && (
        <ClickAwayListener onClickAway={() => setIsOpen(false)}>
          <Paper
            elevation={3}
            sx={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              zIndex: 999,
              maxHeight: 200,
              overflow: "auto",
              mt: 0.5,
              border: "1px solid #e0e0e0",
              borderRadius: 1,
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            <List dense sx={{ p: 0 }}>
              {timeSlots.map((time) => (
                <ListItem
                  key={time}
                  onClick={() => handleSelect(time)}
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
                  <Typography
                    sx={{
                      fontSize: "10px",
                      fontWeight: 600,
                      lineHeight: 1.2,
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {time}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </Paper>
        </ClickAwayListener>
      )}
    </Box>
  );
};

// AirportDropdown Component
const AirportDropdown = ({
  placeholder = "Flying From",
  value,
  onChange,
  label,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [inputValue, setInputValue] = useState("");

  // Initialize input value when selected city changes
  useEffect(() => {
    const selectedCity = countriesAirports.find((a) => a.code === value);
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

    if (value.length > 0 && !isOpen) {
      setIsOpen(true);
    }

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
    <Box sx={{ position: "relative", width: "100%" }}>
      <FormControl fullWidth variant="outlined" size="small">
        <InputLabel
          shrink
          sx={{
            fontSize: "12px",
            color: "#A0A0A0",
            top: "13px",
            left: "20px",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {label}
        </InputLabel>
        <OutlinedInput
          value={inputValue}
          onChange={handleInputChange}
          onClick={handleInputClick}
          placeholder={placeholder}
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
                  color: "#000",
                  cursor: "pointer",
                  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s",
                }}
                onClick={handleInputClick}
              />
            </InputAdornment>
          }
          inputProps={{
            style: {
              fontSize: "10px",
              fontWeight: 700,
              height: isMobile ? 44 : 40,
              width: "100%",
              paddingTop: "20px",
              fontFamily: "'Inter', sans-serif",
            },
          }}
          sx={{
            height: isMobile ? 44 : 40,
            fontFamily: "'Inter', sans-serif",
            "& input": {
              color: "#000",
              paddingTop: "15px",
            },
            "& .MuiOutlinedInput-input::placeholder": {
              color: "#000",
              opacity: 0.7,
              fontSize: "10px",
              fontWeight: 700,
              paddingTop: "15px",
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
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: "10px", fontFamily: "'Inter', sans-serif" }}
                >
                  No cities found
                </Typography>
              </Box>
            ) : (
              <List dense sx={{ p: 0 }}>
                {filteredCities.map((city) => (
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
                      <LocationOn sx={{ fontSize: 14, color: "#000", mr: 1 }} />
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
                ))}
              </List>
            )}
          </Paper>
        </ClickAwayListener>
      )}
    </Box>
  );
};

// Main CarSearchForm Component
export default function CarSearchForm() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();
  const { setCarSearchData } = useGlobalContext();

  const [flyingFrom, setFlyingFrom] = useState("");
  const [destinationTo, setDestinationTo] = useState("");
  const [pickUpDate, setPickUpDate] = useState("");
  const [pickUpTime, setPickUpTime] = useState("");
  const [dropOffDate, setDropOffDate] = useState("");
  const [dropOffTime, setDropOffTime] = useState("");
  const [travellers, setTravellers] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });
  const [nationalityCode, setNationalityCode] = useState("PK");

  // Refs for date inputs
  const pickUpDateRef = useRef(null);
  const dropOffDateRef = useRef(null);

  // Set initial dates - SAME LOGIC AS FLIGHTSEARCHFORM
  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    setPickUpDate(today.toISOString().split("T")[0]);
    setPickUpTime("00:00"); // Default time
    setDropOffDate(tomorrow.toISOString().split("T")[0]);
    setDropOffTime("00:00"); // Default time
  }, []);

  // ✅ Load from localStorage on Car Listing page
  useEffect(() => {
    const saved = localStorage.getItem("carSearchData");
    if (saved) {
      const data = JSON.parse(saved);
      setFlyingFrom(data.from || "");
      setDestinationTo(data.to || "");
      setPickUpDate(data.pickUpDate || "");
      setPickUpTime(data.pickUpTime || "00:00");
      setDropOffDate(data.dropOffDate || "");
      setDropOffTime(data.dropOffTime || "00:00");
      setNationalityCode(data.nationalityCode || "PK");
      
      if (data.travellers) {
        setTravellers(data.travellers);
      }
    }
  }, []);


  // Drop-off date ko automatically update karein jab pick-up date change ho
  // SAME LOGIC AS FLIGHTSEARCHFORM AND HOTELSEARCHFORM
  useEffect(() => {
    if (pickUpDate && dropOffDate) {
      if (dropOffDate < pickUpDate) {
        // Agar drop-off date pick-up date se pehle hai, toh drop-off date ko pick-up date kar do
        setDropOffDate(pickUpDate);
      }
    }
  }, [pickUpDate]);

  // Handle click on date input to show date picker
  const handleDateInputClick = (ref) => {
    if (ref.current) {
      ref.current.showPicker();
    }
  };

  // Handle search and navigation
  const handleSearch = () => {
    if (!flyingFrom || !destinationTo) {
      alert("Please select both pick-up and drop-off locations.");
      return;
    }

    const searchData = {
      from: flyingFrom,
      to: destinationTo,
      pickUpDate,
      pickUpTime,
      dropOffDate,
      dropOffTime,
      travellers,
      nationalityCode,
    };

    setCarSearchData(searchData);
    localStorage.setItem("carSearchData", JSON.stringify(searchData));

    // Navigate to car listing route
    router.push(`/cars/${flyingFrom}/${destinationTo}/${pickUpDate}/${dropOffDate}/${nationalityCode}`);
  };

  return (
    <Box sx={{ width: "100%", gap: 1, paddingY: 0.5, fontFamily: "'Inter', sans-serif" }}>
      {/* ROW 1: FROM + TO (Full Width) */}
      {isMobile ? (
        // Mobile Layout - Stacked Columns
        <Stack spacing={2} sx={{ p: 2 }}>
          <Box sx={{ mt: "20px" }}>
            <AirportDropdown
              placeholder="Flying From"
              value={flyingFrom}
              onChange={setFlyingFrom}
              label="From Airport"
            />
          </Box>
          <Box sx={{ mt: "20px" }}>
            <AirportDropdown
              placeholder="Destination To"
              value={destinationTo}
              onChange={setDestinationTo}
              label="To Location"
            />
          </Box>
        </Stack>
      ) : (
        // Desktop Layout - Grid
        <Grid container spacing={2} sx={{ p: 2 }}>
          <Grid item xs={12} sm={6} sx={{ width: {xs: "422px", sm: "350px", md:"385px", lg:"422px"} }}>
            <AirportDropdown
              placeholder="Select City"
              value={flyingFrom}
              onChange={setFlyingFrom}
              label="From Airport"
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ width: {xs: "422px", sm: "320px", md:"385px", lg:"422px"} }}>
            <AirportDropdown
              placeholder="Select"
              value={destinationTo}
              onChange={setDestinationTo}
              label="To Location"
            />
          </Grid>
        </Grid>
      )}

      {/* ROW 2: Pick-Up & Drop-Off + Travellers + Search */}
      {isMobile ? (
        // Mobile Layout - Stacked Columns
        <Stack spacing={2} sx={{ p: 2, mt: -2 }}>
          {/* Pick-Up Date - Mobile */}
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
              Pick-Up Date
            </InputLabel>
            <OutlinedInput
              type="date"
              value={pickUpDate}
              onChange={(e) => {
                setPickUpDate(e.target.value);
                // Auto-open drop-off date picker
                setTimeout(() => {
                  if (dropOffDateRef.current) {
                    dropOffDateRef.current.showPicker();
                  }
                }, 500); // Small delay for smooth transition
              }}
              inputRef={pickUpDateRef}
              onClick={() => handleDateInputClick(pickUpDateRef)}
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

          {/* Pick-Up Time - Mobile */}
          <Box sx={{ width: "100%" }}>
            <TimeDropdown
              label="Pick-Up Time"
              value={pickUpTime}
              onChange={setPickUpTime}
            />
          </Box>

          {/* Drop-Off Date - Mobile */}
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
              Drop-Off Date
            </InputLabel>
            <OutlinedInput
              type="date"
              value={dropOffDate}
              onChange={(e) => setDropOffDate(e.target.value)}
              inputRef={dropOffDateRef}
              onClick={() => handleDateInputClick(dropOffDateRef)}

              //  Previous dates disable karein - Pick-Up date se pehle ki dates
             
              inputProps={{
                min: pickUpDate || new Date().toISOString().split("T")[0]
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

          {/* Drop-Off Time - Mobile */}
          <Box sx={{ width: "100%" }}>
            <TimeDropdown
              label="Drop-Off Time"
              value={dropOffTime}
              onChange={setDropOffTime}
            />
          </Box>

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

          {/* Search Button - Mobile */}
          <Button
            variant="contained"
            color="primary"
            startIcon={<Search sx={{ fontSize: 20 }} />}
            fullWidth
            onClick={handleSearch}
            sx={{
              height: 44,
              fontSize: "14px",
              fontWeight: 500,
              textTransform: "none",
              borderRadius: 1,
              fontFamily: "'Inter', sans-serif",
              backgroundColor: "#1976d2",
              color: "white",
              "&:hover": {
                backgroundColor: "#1565c0",
              }
            }}
          >
            Search
          </Button>
        </Stack>
      ) : (
        // Desktop Layout - Grid
        <Grid container alignItems="center" sx={{ ml: 2, mb: 1 }}>
          {/* Container for all 4 date/time fields */}
          <Grid item xs={12} sm={8} md={6} lg={5} sx={{ width: "408px", display: "flex" }}>
            {/* Pick-Up Date */}
            <Box sx={{ width: { xs: "102px", sm: "102px", md: "90px", lg: "102px" }, flexShrink: 0 }}>
              <FormControl fullWidth variant="outlined" size="small">
                <InputLabel shrink sx={{ fontSize: "12px", color: "#A0A0A0", top: "13px", fontFamily: "'Inter', sans-serif" }}>
                  Pick-Up Date
                </InputLabel>
                <OutlinedInput
                  type="date"
                  value={pickUpDate}
                  onChange={(e) => {
                    setPickUpDate(e.target.value);
                    // Auto-open drop-off date picker
                    setTimeout(() => {
                      if (dropOffDateRef.current) {
                        dropOffDateRef.current.showPicker();
                      }
                    }, 100); // Small delay for smooth transition
                  }}
                  inputRef={pickUpDateRef}
                  onClick={() => handleDateInputClick(pickUpDateRef)}
                  inputProps={{
                    min: new Date().toISOString().split("T")[0]
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

            {/* Pick-Up Time */}
            <Box sx={{ width: { xs: "102px", sm: "102px", md: "95px", lg: "100px" }, flexShrink: 0 }}>
              <TimeDropdown
                label="Pick-Up Time"
                value={pickUpTime}
                onChange={setPickUpTime}
              />
            </Box>

            {/* Add 15px gap */}
            <Box sx={{ width: "15px", flexShrink: 0 }} />

            {/* Drop-Off Date */}
            <Box sx={{ width: { xs: "102px", sm: "102px", md: "90px", lg: "102px" }, flexShrink: 0 }}>
              <FormControl fullWidth variant="outlined" size="small">
                <InputLabel shrink sx={{ fontSize: "12px", color: "#A0A0A0", top: "13px", fontFamily: "'Inter', sans-serif" }}>
                  Drop-Off Date
                </InputLabel>
                <OutlinedInput
                  type="date"
                  value={dropOffDate}
                  onChange={(e) => setDropOffDate(e.target.value)}
                  inputRef={dropOffDateRef}
                  onClick={() => handleDateInputClick(dropOffDateRef)}
                  // ✅ SAME LOGIC AS FLIGHTSEARCHFORM
                  inputProps={{
                    min: pickUpDate || new Date().toISOString().split("T")[0]
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

            {/* Drop-Off Time */}
            <Box sx={{ width: { xs: "102px", sm: "102px", md: "95px", lg: "102px" }, flexShrink: 0 }}>
              <TimeDropdown
                label="Drop-Off Time"
                value={dropOffTime}
                onChange={setDropOffTime}
              />
            </Box>
          </Grid>

          {/* Travellers */}
          <Grid item xs={12} sm={2} md={3} lg={3} sx={{ml: {xs: 0, sm: 4, md: -0.9, lg: 3.7} }}>
            <TravellersDropdown
              travellers={travellers}
              onTravellersChange={setTravellers}
              nationalityCode={nationalityCode}
              onNationalityChange={setNationalityCode}
              sx={{
                width: "100%",
                minWidth: {xs: 351, sm: 247, md: 315, lg: 352},
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
                width: { xs: 235, sm: 688, md: 60, lg: 60 },
                height: 40,
                px: 1.5,
                borderRadius: 1,
                fontFamily: "'Inter', sans-serif",
                ml: {xs: "10px", sm: 0, md: "10px", lg: "10px"},
                mt: {xs: 0, sm: 2, md: 0, lg: 0}
              }}
            >
              <Search style={{ color: "white" }} />
            </IconButton>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}