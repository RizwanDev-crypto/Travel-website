"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import {
  Box,
  Grid,
  Button,
  TextField,
  MenuItem,
  IconButton,
  InputAdornment,
  Select,
  FormControl,
  InputLabel,
  Typography,
  OutlinedInput,
  Menu,
  Paper,
  List,
  ListItem,
  ListItemText,
  Popper,
  ClickAwayListener,
  useMediaQuery,
  useTheme,
  CircularProgress
} from "@mui/material";

import { useGlobalContext } from "@/app/context/GlobalContext";
import { SwapHoriz, Search, Close, LocationOn } from "@mui/icons-material";
import TravellersDropdown from "./TravellersDropDown";
import { useRouter } from "next/navigation";

// Custom Airport Dropdown Component with integrated search using Kayak API
const AirportDropdown = ({ label, value, onChange, displayValue, onDisplayChange, iconType }) => {
  const [options, setOptions] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);
  const debounceTimerRef = useRef(null);

  // Sync inputValue with displayValue prop
  useEffect(() => {
    if (displayValue !== undefined) {
      setInputValue(displayValue);
    }
  }, [displayValue]);

  // Initialize input value when selected airport changes or component mounts
  useEffect(() => {
    if (value && !inputValue) {
      // If we have a value but no display name, we can try to fetch it 
      // or just show the code as a fallback. 
      // For now, if it's loaded from localStorage, it might already be set.
      setInputValue(value);
      // Optional: Fetch specifically for this code to get full name
      fetchAirports(value, true);
    }
  }, [value]);

  const fetchAirports = async (query, isInitial = false) => {
    if (!query || query.length < 2) {
      if (!isInitial) setOptions([]);
      return;
    }

    setIsFetching(true);
    try {
      const response = await fetch(`https://www.kayak.com/mvm/smartyv2/search?f=j&s=airportonly&where=${encodeURIComponent(query)}`);
      const data = await response.json();

    
      
      const formattedOptions = data.map(item => ({
        city: item.cityonly || item.cityname?.split(',')[0] || "Unknown",
        airport: item.name || item.airportname || "Unknown Airport",
        code: item.id
      }));

      setOptions(formattedOptions);

      // If this was an initial fetch to get the name for a code
      if (isInitial && value) {
        const found = formattedOptions.find(o => o.code === value);
        if (found) {
          setInputValue(`${found.city} (${found.code})`);
        }
      }
    } catch (error) {
      console.error("Error fetching airports:", error);
    } finally {
      setIsFetching(false);
    }
  };

  // Debounce search
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (searchTerm && isOpen) {
      debounceTimerRef.current = setTimeout(() => {
        fetchAirports(searchTerm);
      }, 500); // 500ms debounce
    }

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [searchTerm, isOpen]);

  const handleInputClick = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleSelect = (airport) => {
    const displayText = `${airport.city} (${airport.code})`;
    onChange(airport.code);
    setInputValue(displayText);
    if (onDisplayChange) {
      onDisplayChange(displayText);
    }
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
      if (onDisplayChange) {
        onDisplayChange("");
      }
    }
  };

  const handleClear = () => {
    setInputValue("");
    setSearchTerm("");
    onChange("");
    if (onDisplayChange) {
      onDisplayChange("");
    }
    setIsOpen(false);
  };

  const filteredAirports = options;

  const selectedAirport = options.find(a => a.code === value);

  // Check if input has value or dropdown is open
  const isShrunk = !!inputValue || isOpen;

  // Flying From Icon
  const FlyingFromIcon = () => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="16" 
      height="16" 
      viewBox="0 0 24 24"
        color="#000000"
    >
      <path 
        fill="currentColor" 
        d="M2.5 19h19v2h-19zm19.57-9.36c-.21-.8-1.04-1.28-1.84-1.06L14.92 10L8 3.57l-1.91.51l4.14 7.17l-4.97 1.33l-1.97-1.54l-1.45.39l1.82 3.16l.77 1.33l1.6-.42l5.31-1.43l4.35-1.16L21 11.5c.81-.24 1.28-1.06 1.07-1.86"
      />
    </svg>
  );

  // Destination To Icon (Airplane Landing) - BLACK
  const DestinationToIcon = () => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="16" 
      height="16" 
      color="#000000"
      viewBox="0 0 24 24"
    >
      <path 
        fill="currentColor" 
        d="M2.5 19h19v2h-19zm7.18-5.73l4.35 1.16l5.31 1.42c.8.21 1.62-.26 1.84-1.06c.21-.79-.26-1.62-1.06-1.84l-5.31-1.42l-2.76-9.03l-1.93-.5v8.28L5.15 8.95l-.93-2.32l-1.45-.39v5.17l1.6.43z"
      />
    </svg>
  );

  
  return (
    <Box sx={{ position: "relative", height: 44 }}>
      {/* Custom Label with Icon that moves together */}
      <Box
        sx={{
          position: "absolute",
          top: isShrunk ? "1px" : "50%",
          left: "14px",
          transform: isShrunk ? "none" : "translateY(-50%)",
          transition: "all 0.2s ease",
          pointerEvents: "none",
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
      >

   
        {/* Icon */}
        <Box sx={{ 
          color: "#A0A0A0",
          transition: "all 0.2s ease",
          transform: isShrunk ? "scale(0.8)" : "scale(1)",
        }}>
          {iconType === "flyingFrom" ? <FlyingFromIcon /> : <DestinationToIcon />}
        </Box>
        
        {/* Label Text */}
        <Typography
          sx={{
            fontSize: isShrunk ? "10px" : "12px",
            color: "#A0A0A0",
            fontWeight: 400,
            transition: "all 0.2s ease",
            color:"#000000"
          }}
        >
          {label}
        </Typography>
      </Box>

      <FormControl fullWidth variant="outlined" size="small">
        <OutlinedInput
          id={`airport-${label.replace(/\s+/g, '-')}`}
          ref={inputRef}
          value={inputValue}
          onChange={handleInputChange}
          onClick={handleInputClick}
          autoComplete="off"
          // Empty startAdornment for spacing
          startAdornment={
            <InputAdornment position="start" sx={{ 
              width: isShrunk ? '28px' : '28px',
              opacity: 0,
              transition: "width 0.2s ease",
            }}>
              {/* Empty space for icon alignment */}
            </InputAdornment>
          }
     endAdornment={
  inputValue && (
    <InputAdornment
      position="end"
      className="clear-icon"
      sx={{
        opacity: 0,                 // 👈 default hidden
        transition: "opacity 0.2s ease",
      }}
    >
      <IconButton
        size="small"
        onClick={handleClear}
        disableRipple
        sx={{
          p: 0.5,
          mr: 0.5,
          background: "none",
          "&:hover": { background: "none" },
        }}
      >
        <Close
          sx={{
            fontSize: 12,
            color: "#000000",
            position: "relative",
            top: "8px",
          }}
        />
      </IconButton>
    </InputAdornment>
  )
}

          sx={{
            height: 44,
            fontSize: "10px",
            fontWeight: 600,
            color: "#000000",
            "& input": { 
              color: "#000000",
              paddingTop: isShrunk ? "25px" : "6px",
     
              height: "100%",
              color:"#000000"
            },

            
  "&:hover .clear-icon": {
    opacity: 1,   
  },

  "& input": {
    paddingTop: isShrunk ? "25px" : "6px",
    color: "#000000",
  },

            "& .MuiOutlinedInput-notchedOutline": { 
              borderColor: "#c0c0c0" 
            },
            "&:hover .MuiOutlinedInput-notchedOutline": { 
              borderColor: "#1976d2" 
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": { 
              borderColor: "#1976d2", 
              borderWidth: 1 
            },
            "&:hover": { 
              backgroundColor: "#f0f7ff" 
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
              zIndex: 999,
              top: "100%",
              left: 0,
              right: 0,
              maxHeight: 250,
              overflow: "auto",
              mt: 0.5,
              border: "1px solid #e0e0e0",
              borderRadius: 1,
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              
            }}
          >
            {isFetching ? (
              <Box sx={{ p: 2, textAlign: "center" }}>
                <CircularProgress size={20} sx={{ mb: 1 }} />
                <Typography variant="body2" sx={{ fontSize: "10px", color: "#000000" }}>
                  Searching...
                </Typography>
              </Box>
            ) : filteredAirports.length === 0 ? (
              <Box sx={{ p: 2, textAlign: "center" }}>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: "10px", color: "#000000" }}>
                  {searchTerm.length < 2 ? "Type to search airports..." : "No airports found"}
                </Typography>
              </Box>
            ) : (
              <List dense sx={{ p: 0 }}>
                {filteredAirports.map((airport) => (
                  <ListItem
  key={airport.code}
  onMouseDown={(e) => {
    e.preventDefault();
    handleSelect(airport);
  }}
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
                      <LocationOn sx={{ fontSize: 14, color: "#000000", mr: 1 }} />
                      <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <Typography sx={{ fontSize: "10px", fontWeight: 600, lineHeight: 1.2, color: "#000000" }}>
                            {airport.city}
                          </Typography>
                          <Typography sx={{ fontSize: "10px", color: "#1976d2", fontWeight: 700, lineHeight: 1.2 }}>
                            {airport.code}
                          </Typography>
                        </Box>
                        <Typography sx={{ fontSize: "9px", color: "#000000", lineHeight: 1.1, mt: 0.2, opacity: 0.8 }}>
                          {airport.airport}
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

export default function FlightSearchForm() {
  const { setFlightSearchData } = useGlobalContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();

  /* ===================== SINGLE FORM STATE ===================== */
  const [formState, setFormState] = useState({
    flyingFrom: "",
    destinationTo: "",
    flyingFromDisplay: "",
    destinationToDisplay: "",
    tripType: "one-way",
    cabinClass: "economy",
    departDate: "",
    returnDate: "",
    nationalityCode: "PK",
  });
  const [travellers, setTravellers] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });
 
 const handleChange = (field, value) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const {
    flyingFrom,
    destinationTo,
    flyingFromDisplay,
    destinationToDisplay,
    tripType,
    cabinClass,
    departDate,
    returnDate,
    nationalityCode,
  } = formState;

  const departDateRef = useRef(null);
  const returnDateRef = useRef(null);

  // ✅ Load from localStorage only on Flight Listing page
  useEffect(() => {
    const saved = localStorage.getItem("flightSearchData");
    if (saved) {
      const data = JSON.parse(saved);
      setFormState((prev) => ({
        ...prev,
        flyingFrom: data.from || "",
        destinationTo: data.to || "",
        tripType: data.trip || "one-way",
        cabinClass: data.cabin || "economy",
        departDate: data.departDate || "",
        returnDate: data.returnDate || "",
        nationalityCode: data.nationalityCode || "PK",
      }));

      if (data.travellers) {
        setTravellers(data.travellers);
      }
    }
  }, []);


  // Initial dates - simpler approach
 useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    if (!departDate) handleChange("departDate", today);
  }, [departDate]);

  // Return date ko automatically update karein jab depart date change ho
   useEffect(() => {
    if (tripType === "return" && returnDate < departDate) {
      handleChange("returnDate", departDate);
    }
  }, [departDate, tripType]);

  // Added date click handler
  const handleDateInputClick = (ref) => {
    if (ref.current) {
      ref.current.showPicker();
    }
  };

  const tripTypeOptions = useMemo(() => [
    { value: "one-way", label: "One Way" },
    { value: "return", label: "Return" },
  ], []);

  const cabinClassOptions = useMemo(() => [
    { value: "economy", label: "Economy" },
    { value: "premium-economy", label: "Premium Economy" },
    { value: "business", label: "Business" },
    { value: "first-class", label: "First Class" },
  ], []);

  const handleSearch = () => {
    if (!flyingFrom || !destinationTo) {
      alert("Please select both origin and destination airports.");
      return;
    }

    const searchData = {
      from: flyingFrom,
      to: destinationTo,
      trip: tripType,
      cabin: cabinClass,
      departDate,
      returnDate: tripType === "return" ? returnDate : "",
      travellers,
      nationalityCode,
      totalPassengers: travellers.adults + travellers.children + travellers.infants,
    };

    setFlightSearchData(searchData);
    localStorage.setItem("flightSearchData", JSON.stringify(searchData));

  // Navigate to results page WITH NATIONALITY CODE
    router.push(
      `/flights/${flyingFrom}/${destinationTo}/${tripType}/${cabinClass}/${departDate}/${returnDate}/${travellers.adults}/${travellers.children}/${travellers.infants}/${nationalityCode}`
    );
  };

  // ----------------- JSX -----------------
  return (
    <Box sx={{ p: 2, maxWidth: 900, mx: "auto" }}>
      {/* Trip type + cabin */}
      <Grid
        container
        spacing={2}
        mb={2}
        justifyContent={{ xs: "center", sm: "flex-start" }}
        ml={{ xs: 0, sm: 1, md: -0.6, lg: -0.2 }}
      >
        <Grid item xs={12} sm={3}>
          <FormControl
            size="small"
            sx={{ width: { xs: "100%", sm: "100%" }}}
          >
              <Select
            size="small"
            value={tripType}
            onChange={(e) => handleChange("tripType", e.target.value)}
          
              sx={{
                fontSize: "10px",
                fontWeight: 700,
                color: "#000000", // Black text
                height: 24,
                right: { xs: "4px", md: "-10px", lg: "-5px" },
                "& .MuiSelect-icon": {
                  color: "#000000", // Black dropdown arrow
                }
              }}
            >
              {tripTypeOptions.map((option) => (
                <MenuItem key={option.value} value={option.value} sx={{ fontSize: "10px", color: "#000000" }}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={3}>
          <FormControl
            size="small"
            sx={{ width: { xs: "100%", sm: "100%" }}}
          >
             <Select
            size="small"
            value={cabinClass}
            onChange={(e) => handleChange("cabinClass", e.target.value)}
              sx={{
                fontSize: "10px",
                fontWeight: 700,
                color: "#000000", // Black text
                height: 24,
             
                "& .MuiSelect-icon": {
                  color: "#000000", // Black dropdown arrow
                }
              }}
            >
              {cabinClassOptions.map((option) => (
                <MenuItem key={option.value} value={option.value} sx={{ fontSize: "10px", color: "#000000" }}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Main Grid */}
      <Grid container spacing={1} alignItems="center" pl={0.4}
        sx={{
          flexDirection: { xs: "column", md: "row" },
          mt:{xs:"-20px",sm:"-20px", md:0, lg:0}
         
        }}>
        
        {/* Flying From and Destination To with Swap */}
        <Box
          sx={{
            display: "flex",
            gap: 1,
            position: "relative",
            width: { xs: "100%", md: "auto" },
            flexDirection: { xs: "column", md: "row" }
          }}
        >
          {/* Flying From */}
          <Box sx={{ width: { xs: "100%", md: 186 }, position: "relative" ,top:{xs:"20px",sm:"20px", md:0, lg:0}}}>
            <AirportDropdown
            label="Flying From"
            value={flyingFrom}
            onChange={(v) => handleChange("flyingFrom", v)}
            displayValue={flyingFromDisplay}
            onDisplayChange={(v) => handleChange("flyingFromDisplay", v)}
              iconType="flyingFrom"  // Uses airplane take-off icon
            />
          </Box>

          {/* Swap Button */}
          <IconButton
            onClick={() => {
              setFormState((prev) => ({
                ...prev,
                flyingFrom: prev.destinationTo,
                destinationTo: prev.flyingFrom,
                flyingFromDisplay: prev.destinationToDisplay,
                destinationToDisplay: prev.flyingFromDisplay,
              }));
            }}
            size="small"
            sx={{
              bgcolor: "#3366ff",
              color: "white",
              height: 30,
              width: 30,
              zIndex: 10,
              "&:hover": { bgcolor: "#0b66f9" },

              /* Position */
              position: { xs: "relative", md: "absolute" },
              left: { xs: "45%", md: "50%" },
              top: {xs:"10px", md: "5px" ,lg:"7px" },
              transform: { md: "translateX(-50%)" },
              marginTop: { xs: "-10px", md: 0 },
              marginBottom: { xs: "-10px", md: 0 },
            }}
          >
            <SwapHoriz
              sx={{
                fontSize: 20,
                color: "white", // White swap icon
                transform: { xs: "rotate(90deg)", md: "rotate(0deg)" },
                transition: "transform 0.3s ease",
              }}
            />
          </IconButton>

          {/* Destination To */}
          <Box sx={{ width: { xs: "100%", md: 186,  }, position: "relative" }}>
          <AirportDropdown
            label="Destination To"
            value={destinationTo}
            onChange={(v) => handleChange("destinationTo", v)}
            displayValue={destinationToDisplay}
            onDisplayChange={(v) => handleChange("destinationToDisplay", v)}
              iconType="destinationTo"  // Uses airplane landing icon
            />
          </Box>
        </Box>

        {/* Dates */}
        <Box
          sx={{
            display: "flex",
            gap: 1,
            width: { xs: "100%", md: 175, lg: 230 },
            flexDirection: { xs: "column", md: "row" },
            mt: { xs: "5px", md: "0.4px", lg: "0.4px" },
          }}
        >
          {/* Depart Date */}
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel shrink sx={{ fontSize: "12px", color: "#A0A0A0", top: "13px" }}>
              Depart Date
            </InputLabel>
          
<OutlinedInput
  type="date"
  value={departDate}
  onChange={(e) => {
    handleChange("departDate", e.target.value);
    // Auto-open return date picker if trip type is return
    if (tripType === "return" && returnDateRef.current) {
      setTimeout(() => {
        returnDateRef.current.showPicker();
      }, 300); // Small delay for smooth transition
    }
  }}
  inputRef={departDateRef}
  onClick={() => handleDateInputClick(departDateRef)}
  // ✅ PREVIOUS DATES DISABLE
  inputProps={{
    min: new Date().toISOString().split('T')[0] // Today's date
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
    // REMOVE CALENDAR ICON - Add this CSS
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

          {/* Return Date */}
          {tripType === "return" && (
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel shrink sx={{ fontSize: "12px", color: "#A0A0A0", top: "13px" }}>
                Return Date
              </InputLabel>
          <OutlinedInput
  type="date"
  value={returnDate}
  onChange={(e) => handleChange("returnDate", e.target.value)}
  inputRef={returnDateRef}
  onClick={() => handleDateInputClick(returnDateRef)}
  // ✅ PREVIOUS DATES DISABLE - at least depart date
  inputProps={{
    min: departDate || new Date().toISOString().split('T')[0]
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
    // REMOVE CALENDAR ICON - Add this CSS
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
          )}
        </Box>

        {/* Travellers - Mobile M & L ke liye full width */}
        <Box sx={{ 
          width: { xs: "100%", sm: "100%", md: 160, lg: 170 },
          mt: { xs: 1, sm: 1, md: 0, lg: 0 }
        }}>
          <TravellersDropdown 
            travellers={travellers} 
            onTravellersChange={setTravellers}
            nationalityCode={nationalityCode} // 👈 PASS NATIONALITY CODE
            onNationalityChange={(v) => handleChange("nationalityCode", v)} // 👈 PASS SETTER
            sx={{
              width: "100%",
              minWidth: { xs: "100%", sm: "100%", md: 160, lg: 175 },
              height: 44
            }}
          />
        </Box>

        {/* Search - Mobile M & L ke liye full width */}
        <Box sx={{ 
          width: { xs: "100%", sm: "100%", md: 44, lg: 50 },
          mt: { xs: 1, sm: 0, md: 0, lg: 0 },
          display: "flex",
          justifyContent: { xs: "center", sm: "center", md: "flex-start" }
        }}>
        <IconButton
  color="primary"
  size="small"
  onClick={handleSearch}   // ✅ Added
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
      </Grid>
    </Box>
  );
}