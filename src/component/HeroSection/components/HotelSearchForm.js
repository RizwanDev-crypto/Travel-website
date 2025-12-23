"use client";

import { useState, useEffect } from "react";
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
  useTheme 
} from "@mui/material";
import { MapPin, Search } from "lucide-react";
import TravellersDropdown from "./TravellersDropDown";

// Sample countriesAirports data (replace with your full array)
const countriesAirports = [
  {
    country: "UAE",
    cities: [
      { city: "Dubai", airport: "Dubai International Airport", code: "DXB" },
      { city: "Abu Dhabi", airport: "Abu Dhabi Intl Airport", code: "AUH" },
    ],
  },
  {
    country: "Pakistan",
    cities: [
      { city: "Karachi", airport: "Jinnah International Airport", code: "KHI" },
      { city: "Lahore", airport: "Allama Iqbal Airport", code: "LHE" },
    ],
  },
  {
    country: "India",
    cities: [
      { city: "Delhi", airport: "Indira Gandhi International Airport", code: "DEL" },
      { city: "Mumbai", airport: "Chhatrapati Shivaji Maharaj Airport", code: "BOM" },
    ],
  },
];

const HotelSearchForm = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
  const [citySearch, setCitySearch] = useState("");
  const [selectedCity, setSelectedCity] = useState(null);
  const [travellers, setTravellers] = useState({ adults: 2, children: 0, infants: 0 });
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");

  // Set initial dates
  useEffect(() => {
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);

    setCheckInDate(today.toISOString().split("T")[0]);
    setCheckOutDate(nextWeek.toISOString().split("T")[0]);
  }, []);

  // Flatten all cities
  const allCities = countriesAirports.flatMap((country) =>
    country.cities.map((city) => ({
      ...city,
      country: country.country,
    }))
  );

  // Filter cities by search
  const filteredCities = allCities.filter(
    (c) =>
      c.city.toLowerCase().includes(citySearch.toLowerCase()) ||
      c.country.toLowerCase().includes(citySearch.toLowerCase())
  );

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
            <TextField
              label="Search by city"
              size="small"
              fullWidth
              sx={{
                "& .MuiInputBase-root": { 
                  height: 44,
                  fontSize: "14px",
                  fontFamily: "'Inter', sans-serif",
                },
                "& .MuiInputLabel-root": { 
                  fontSize: "14px", 
                  fontFamily: "'Inter', sans-serif",
                },
              }}
              value={selectedCity ? `${selectedCity.city}, ${selectedCity.country}` : citySearch}
              onChange={(e) => setCitySearch(e.target.value)}
              select={filteredCities.length > 0}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MapPin size={18} />
                  </InputAdornment>
                ),
              }}
            >
              {filteredCities.map((city, index) => (
                <MenuItem 
                  key={`${city.city}-${city.country}-${index}`}
                  value={`${city.city}, ${city.country}`}
                  onClick={() => {
                    setSelectedCity(city);
                    setCitySearch(`${city.city}, ${city.country}`);
                  }}
                  sx={{ 
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "14px",
                    py: 1.5,
                  }}
                >
                  {city.city}, {city.country} ({city.code})
                </MenuItem>
              ))}
            </TextField>
          </Box>

          {/* Check-In and Check-Out - Mobile Stacked */}
          <Stack spacing={2}>
            {/* Check-In */}
            <Box>
              <TextField
                label="Check-In Date"
                type="date"
                size="small"
                fullWidth
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                sx={{
                  "& .MuiInputBase-root": { 
                    height: 44,
                    fontFamily: "'Inter', sans-serif",
                  },
                }}
                inputProps={{ 
                  style: { 
                    height: 44,
                    fontSize: "14px",
                    fontFamily: "'Inter', sans-serif",
                  }
                }}
                InputLabelProps={{
                  style: { 
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "14px",
                  }
                }}
              />
            </Box>

            {/* Check-Out */}
            <Box>
              <TextField
                label="Check-Out Date"
                type="date"
                size="small"
                fullWidth
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                sx={{
                  "& .MuiInputBase-root": { 
                    height: 44,
                    fontFamily: "'Inter', sans-serif",
                  },
                }}
                inputProps={{ 
                  style: { 
                    height: 44,
                    fontSize: "14px",
                    fontFamily: "'Inter', sans-serif",
                  }
                }}
                InputLabelProps={{
                  style: { 
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "14px",
                  }
                }}
              />
            </Box>
          </Stack>

          {/* Travellers */}
          <Box>
            <TravellersDropdown 
              travellers={travellers} 
              onTravellersChange={setTravellers} 
              sx={{
                fontFamily: "'Inter', sans-serif",
                "& .MuiButton-root": {
                  height: 44,
                  fontSize: "14px",
                  fontFamily: "'Inter', sans-serif",
                },
              }}
            />
          </Box>

          {/* Search Button - Mobile */}
          <Box>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Search size={20} />}
              fullWidth
              sx={{
                height: 44,
                fontSize: "16px",
                fontWeight: 600,
                textTransform: "none",
                borderRadius: 1,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Search Hotels
            </Button>
          </Box>
        </Stack>
      ) : (
        // DESKTOP LAYOUT - ORIGINAL GRID
        <Grid container spacing={2} alignItems="center" margin={2} paddingTop={2} paddingBottom={2}>
          {/* City */}
          <Grid item xs={12} sm={4}>
            <TextField
              label="Search by city"
              size="small"
              sx={{
                "& .MuiInputBase-root": { 
                  height: 40,
                  fontSize: "12px",
                  fontFamily: "'Inter', sans-serif",
                },
                width: 270,
                "& .MuiInputLabel-root": { 
                  fontSize: "12px", 
                  top: "3px",
                  fontFamily: "'Inter', sans-serif",
                },
              }}
              value={selectedCity ? `${selectedCity.city}, ${selectedCity.country}` : ""}
              onChange={(e) => setCitySearch(e.target.value)}
              select={filteredCities.length > 0}
            >
              {filteredCities.map((city, index) => (
                <MenuItem 
                  key={`${city.city}-${city.country}-${index}`}
                  value={`${city.city}, ${city.country}`}
                  onClick={() => {
                    setSelectedCity(city);
                    setCitySearch(`${city.city}, ${selectedCity.country}`);
                  }}
                  sx={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {city.city}, {city.country} ({city.code})
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Check-In and Check-Out - Desktop Side by Side */}
          <Box sx={{ display: "flex", justifyContent: "space-around", gap: 1 }}>
            <Grid item xs={12} sm={2}>
              <TextField
                label="Check-In"
                type="date"
                size="small"
                fullWidth
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                sx={{
                  "& .MuiInputBase-root": { 
                    height: 40,
                    fontFamily: "'Inter', sans-serif",
                  },
                }}
                inputProps={{ 
                  style: { 
                    height: 40,
                    width: "160px", 
                    padding: "0 8px", 
                    fontSize: "12px",
                    fontFamily: "'Inter', sans-serif",
                  }
                }}
                InputLabelProps={{
                  style: { fontFamily: "'Inter', sans-serif" }
                }}
              />
            </Grid>

            {/* Check-Out */}
            <Grid item xs={12} sm={2}>
              <TextField
                label="Check-Out"
                type="date"
                size="small"
                fullWidth
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                sx={{
                  "& .MuiInputBase-root": { 
                    height: 40,
                    fontFamily: "'Inter', sans-serif",
                  },
                }}
                inputProps={{ 
                  style: { 
                    height: 40,
                    width: "160px", 
                    padding: "0 8px", 
                    fontSize: "12px",
                    fontFamily: "'Inter', sans-serif",
                  }
                }}
                InputLabelProps={{
                  style: { fontFamily: "'Inter', sans-serif" }
                }}
              />
            </Grid>
          </Box>

          {/* Travellers */}
          <Grid item xs={12} sm={3}>
            <TravellersDropdown 
              travellers={travellers} 
              onTravellersChange={setTravellers} 
              sx={{
                fontFamily: "'Inter', sans-serif",
                "& .MuiButton-root": {
                  height: 40,
                     width: { xs: 189 , lg:160}, 
                  fontSize: "12px",
                  fontFamily: "'Inter', sans-serif",
                },
              }}
            />
          </Grid>

          {/* Search Button */}
          <Grid item xs={12} sm={2}>
            <IconButton
              color="primary"
              size="small"
              sx={{
                backgroundColor: "#1976d2",
                "&:hover": { backgroundColor: "#115293" },
                width: "100%",
                height: 40,
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