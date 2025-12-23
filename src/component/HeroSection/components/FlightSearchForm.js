"use client";

import { useState, useEffect } from "react";
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
  Popover,
  Typography,
  OutlinedInput,
  autocompleteClasses,
  Autocomplete,
} from "@mui/material";

import { ArrowRightAlt, SwapHoriz, Search, People ,ExpandMore } from "@mui/icons-material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import TravellersDropdown from "./TravellersDropDown";

// Example countriesAirports array
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

export default function FlightSearchForm() {
  // ---------------- STATES ----------------
  const [flyingFrom, setFlyingFrom] = useState("");
  const [destinationTo, setDestinationTo] = useState("");
  const [selectedTripType, setSelectedTripType] = useState("one-way");
  const [selectedCabinClass, setSelectedCabinClass] = useState("economy");
  const [travellers, setTravellers] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });
  const [departDate, setDepartDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);

  // Initial dates
  useEffect(() => {
    const today = new Date();
    const plus7 = new Date();
    plus7.setDate(today.getDate() + 7);
    setDepartDate(today);
    setReturnDate(plus7);
  }, []);

  const tripTypeOptions = [
    { value: "one-way", label: "One Way" },
    { value: "return", label: "Return" },
  ];

  const cabinClassOptions = [
    { value: "economy", label: "Economy" },
    { value: "premium-economy", label: "Premium Economy" },
    { value: "business", label: "Business" },
    { value: "first-class", label: "First Class" },
  ];

  // ----------------- JSX -----------------
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ p: 2, maxWidth: 900, mx: "auto"}}>
        {/* Trip type + cabin */}
       <Grid
  container
  spacing={2}
  mb={2}
  justifyContent={{ xs: "center", sm: "flex-start" }}
>
  <Grid item xs={12} sm={3}>
    <FormControl
      size="small"
      sx={{ width: { xs: "100%", sm: "100%" }}}
    >
      <Select
        value={selectedTripType}
        onChange={(e) => setSelectedTripType(e.target.value)}
        sx={{
          fontSize: "10px",
          fontWeight: 800,
          color: "#000",
          height: 24,
         right:{xs:"-10px", md:"-10px"}
        }}
      >
        {tripTypeOptions.map((option) => (
          <MenuItem key={option.value} value={option.value} sx={{ fontSize: "10px" }}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </Grid>

  <Grid item xs={12} sm={3}>
    <FormControl
      size="small"
      sx={{ width: { xs: "90%", sm: "100%" } }}
    >
      <Select
        value={selectedCabinClass}
        onChange={(e) => setSelectedCabinClass(e.target.value)}
        sx={{
          fontSize: "10px",
          fontWeight: 800,
          color: "#000",
          height: 24,
        }}
      >
        {cabinClassOptions.map((option) => (
          <MenuItem key={option.value} value={option.value} sx={{ fontSize: "10px" }}>
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
    flexDirection: { xs: "column", md: "row" } 
  }}>
          {/* Flying From */}
      
      
       <Box
sx={{
    display: "flex",
    gap: 1,
    position: "relative",
  
    flexDirection: { xs: "column", md: "row"} 
  }}
>

            {/* Flying From */}
            <Autocomplete
              options={countriesAirports}
              getOptionLabel={(option) => `${option.city} (${option.code})`}
              value={
                countriesAirports.find((a) => a.code === flyingFrom) || null
              }
              onChange={(event, newValue) =>
                setFlyingFrom(newValue ? newValue.code : "")
              }
              sx={{
                width: 186,
                "& .MuiAutocomplete-option": {
                  fontSize: "8px", // dropdown list font size
                    width: { xs: "100%", md: 186 } 
                },
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Flying From"
                  size="small"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      height: 40,
                      fontSize: "12px",
                      "& fieldset": {
                        borderColor: "#c0c0c0", // Initial border color
                      },
                      "&:hover fieldset": {
                        borderColor: "#1976d2", // Hover border color
                      },
                      "&:hover": { 
                        backgroundColor: "#f0f7ff",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: "12px",
                      top: "2px",
                      left:"4px"
                    },
                  }}
                />
              )}
            />

            {/* Swap Button */}
          <IconButton
  onClick={() => {
    const temp = flyingFrom;
    setFlyingFrom(destinationTo);
    setDestinationTo(temp);
  }}
  size="small"
  sx={{
    bgcolor: "#3366ff",
    color: "white",
    height: 30,
    width: 30,
    zIndex: 10,
    "&:hover": { bgcolor: "#00BFFF" },

    /* Position */
    position: { xs: "relative", md: "absolute" },
    left: { xs: "40%", md: "50%" },
    top: { md: "5px" },
    transform: { md: "translateX(-50%)" },
  }}
>
  <SwapHoriz
    sx={{
      fontSize: 20,
      transform: { xs: "rotate(90deg)", md: "rotate(0deg)" }, // ✅ MOBILE VERTICAL
      transition: "transform 0.3s ease",
    }}
  />
</IconButton>



            {/* Destination To */}
            <Autocomplete
              options={countriesAirports}
              getOptionLabel={(option) => `${option.city} (${option.code})`}
              value={
                countriesAirports.find((a) => a.code === destinationTo) || null
              }
              onChange={(event, newValue) =>
                setDestinationTo(newValue ? newValue.code : "")
              }
              sx={{
                width: 186,
                "& .MuiAutocomplete-option": {
                  fontSize: "12px", // dropdown list font size
                },
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Destination To"
                  size="small"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      height: 40,
                      fontSize: "12px",
                      "& fieldset": {
                        borderColor: "#c0c0c0", // Initial border color
                      },
                      "&:hover fieldset": {
                        borderColor: "#1976d2", // Hover border color
                      },
                      "&:hover": { 
                        backgroundColor: "#f0f7ff",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      fontSize: "12px",
                      top: "2px",
                      left:"4px"
                    },
                  }}
                />
              )}
            />
          </Box>

          {/* Dates */}
       <Box
  sx={{
    display: "flex",
    gap: 1,
    width: { xs: "79%", md: 230 }, // 👈 desktop same
      flexDirection: { xs: "column", md: "row" } 
  }}
>

            {/* Depart Date */}
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel shrink sx={{ fontSize: "12px", top: "-3px" }}>
                Depart Date
              </InputLabel>
      <OutlinedInput
  type="date"
  value={departDate}
  onChange={(e) => setDepartDate(e.target.value)}
  inputProps={{
    style: {
      height: 40,
      padding: "0 8px",
      fontSize: "12px",
    },
  }}
  sx={{
    height: 40,
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#c0c0c0", // initial border
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#1976d2", // hover border same as Flying From
    },
    "&:hover": {
      backgroundColor: "#f0f7ff", // hover background same as Flying From
    },
  }}
  label="Depart Date"
/>


            </FormControl>

            {/* Return Date (only on Return trip) */}
            {selectedTripType === "return" && (
              <FormControl fullWidth variant="outlined" size="small">
                <InputLabel shrink sx={{ fontSize: "12px", top: "-3px" }}>
                  Return Date
                </InputLabel>
<OutlinedInput
  type="date"
  value={returnDate}
  onChange={(e) => setReturnDate(e.target.value)}
  inputProps={{
    style: {
      height: 40,
      padding: "0 8px",
      fontSize: "12px",
    },
  }}
  sx={{
    height: 40,
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#c0c0c0",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#1976d2",
    },
    "&:hover": {
      backgroundColor: "#f0f7ff",
    },
  }}
  label="Return Date"
/>

              </FormControl>
            )}
          </Box>

          {/* Travellers */}
          <Grid item xs={12} sm={2}>
            <TravellersDropdown
              travellers={travellers}
              onTravellersChange={setTravellers}
              size="small"
              sx={{
                height: 40,
                "& .MuiButton-root": {
                  height: 40,
                  fontSize: "12px",
                  borderColor: "#c0c0c0", // Initial border color
                  "&:hover": { 
                    borderColor: "#1976d2", 
                    backgroundColor: "#f0f7ff" 
                  },
                },
                "& .MuiTypography-root": { fontSize: "12px" },
              }}
            />
          </Grid>

          {/* Search */}
          <Grid item xs={12} sm={1}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Search sx={{ height: 40, pl: "12px", py: "5px" }} />}
              sx={{
                width: "50px",
                alignItems: "center",
                height: 40,
                margin: "auto",
                "&:hover": { 
                  borderColor: "#1976d2", 
                  backgroundColor: "#1565c0", // Slightly darker blue for contrast
                  
    

                },
              }}
            ></Button>
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
  );
}