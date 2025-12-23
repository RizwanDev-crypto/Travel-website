"use client";

import { useState, useRef, useEffect } from "react";
import {
  MapPin,
  Users,
  Search,
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
} from "@mui/material";
import { countriesAirports } from "../../data/countriesAirports";

const TourSearchForm = () => {
  // ------------------- MEDIA QUERIES -------------------
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // ------------------- HYDRATION FIX -------------------
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // ------------------- CITY -------------------
  const [citySearch, setCitySearch] = useState("");
  const [selectedCity, setSelectedCity] = useState(null);
  const [cityAnchorEl, setCityAnchorEl] = useState(null);

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
      item.city.toLowerCase().includes(citySearch.toLowerCase()) ||
      item.country.toLowerCase().includes(citySearch.toLowerCase())
  );

  const handleCityClick = (event) => {
    setCityAnchorEl(event.currentTarget);
  };

  const handleCityClose = () => {
    setCityAnchorEl(null);
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setCitySearch(`${city.city}, ${city.country}`);
    handleCityClose();
  };

  // ------------------- DATES -------------------
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const next = new Date(today);
    next.setDate(today.getDate() + 7);

    setCheckInDate(today.toISOString().split("T")[0]);
    setCheckOutDate(next.toISOString().split("T")[0]);
  }, []);

  // ------------------- TRAVELLERS -------------------
  const [travellers, setTravellers] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });

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
    }}>
      {isMobile ? (
        // MOBILE LAYOUT - STACKED COLUMNS
        <Stack spacing={2}>
          {/* CITY SEARCH */}
          <Box>
            <TextField
              fullWidth
              size="small"
              placeholder="Search by City"
              value={selectedCity ? `${selectedCity.city}, ${selectedCity.country}` : citySearch}
              onChange={(e) => {
                setCitySearch(e.target.value);
                setCityAnchorEl(e.currentTarget);
              }}
              onClick={handleCityClick}
              sx={{
                "& .MuiInputBase-root": {
                  height: 44,
                  fontSize: "14px",
                  fontFamily: "'Inter', sans-serif",
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MapPin size={18} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <ChevronDown size={18} />
                  </InputAdornment>
                ),
              }}
            />
            <Menu
              anchorEl={cityAnchorEl}
              open={Boolean(cityAnchorEl)}
              onClose={handleCityClose}
              PaperProps={{ 
                style: { 
                  maxHeight: 250,
                  width: "90vw",
                  fontFamily: "'Inter', sans-serif",
                } 
              }}
            >
              {filteredCities.length > 0 ? (
                filteredCities.map((city, index) => (
                  <MenuItem
                    key={`${city.city}-${city.country}-${index}`}
                    onClick={() => handleCitySelect(city)}
                    sx={{ 
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "14px",
                      py: 1.5,
                    }}
                  >
                    {city.city}, {city.country}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled sx={{ 
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "14px",
                }}>
                  No results found
                </MenuItem>
              )}
            </Menu>
          </Box>

          {/* CHECK-IN DATE */}
          <Box>
            <TextField
              fullWidth
              size="small"
              type="date"
              label="Check-in Date"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              InputLabelProps={{ 
                shrink: true,
                style: { 
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "14px",
                }
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
          </Box>

          {/* CHECK-OUT DATE */}
          <Box>
            <TextField
              fullWidth
              size="small"
              type="date"
              label="Check-out Date"
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
              InputLabelProps={{ 
                shrink: true,
                style: { 
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "14px",
                }
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
          </Box>

          {/* TRAVELLERS */}
          <Box>
            <Button
              fullWidth
              variant="outlined"
              size="small"
              onClick={handleTravellerClick}
              sx={{ 
                justifyContent: "space-between", 
                fontSize: "14px", 
                textTransform: "none",
                height: 44,
                color: "#000000",
                fontFamily: "'Inter', sans-serif",
                px: 2,
              }}
              startIcon={<Users size={18} />}
              endIcon={<ChevronDown size={18} />}
            >
              {travellersLabel}
            </Button>
            <Menu
              anchorEl={travellerAnchorEl}
              open={Boolean(travellerAnchorEl)}
              onClose={handleTravellerClose}
              PaperProps={{ 
                style: { 
                  width: "90vw", 
                  padding: 16,
                  fontFamily: "'Inter', sans-serif",
                } 
              }}
            >
              {["adults", "children", "infants"].map((type) => (
                <Box key={type} sx={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "center", 
                  mb: 2,
                  fontFamily: "'Inter', sans-serif",
                }}>
                  <Typography sx={{ 
                    fontSize: 14,
                    fontWeight: 500,
                    fontFamily: "'Inter', sans-serif",
                  }}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <IconButton 
                      size="small" 
                      onClick={() => updateTraveller(type, -1)}
                      sx={{ 
                        border: "1px solid #ccc",
                        width: 32,
                        height: 32,
                      }}
                    >
                      <Minus size={16} />
                    </IconButton>
                    <Typography sx={{ 
                      fontSize: 14,
                      fontWeight: 500,
                      minWidth: 24,
                      textAlign: "center",
                      fontFamily: "'Inter', sans-serif",
                    }}>
                      {travellers[type]}
                    </Typography>
                    <IconButton 
                      size="small" 
                      onClick={() => updateTraveller(type, 1)}
                      sx={{ 
                        border: "1px solid #ccc",
                        width: 32,
                        height: 32,
                      }}
                    >
                      <Plus size={16} />
                    </IconButton>
                  </Box>
                </Box>
              ))}
            </Menu>
          </Box>

          {/* SEARCH BUTTON - MOBILE */}
          <Box sx={{ display: "flex", justifyContent: "center" }}>
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
                borderRadius: 2,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Search Tours
            </Button>
          </Box>
        </Stack>
      ) : (
        // DESKTOP LAYOUT - ORIGINAL GRID
        <Grid container spacing={2} alignItems="center" margin={2} paddingTop={2} paddingBottom={2}>
          {/* CITY */}
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search by City"
              value={selectedCity ? `${selectedCity.city}, ${selectedCity.country}` : citySearch}
              onChange={(e) => {
                setCitySearch(e.target.value);
                setCityAnchorEl(e.currentTarget);
              }}
              onClick={handleCityClick}
              sx={{
                "& .MuiInputBase-root": {
                  height: 40,
                  width: 280,
                  fontSize: "12px",
                  fontFamily: "'Inter', sans-serif",
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MapPin size={16} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <ChevronDown size={16} />
                  </InputAdornment>
                ),
              }}
            />
            <Menu
              anchorEl={cityAnchorEl}
              open={Boolean(cityAnchorEl)}
              onClose={handleCityClose}
              PaperProps={{ 
                style: { 
                  maxHeight: 250,
                  fontFamily: "'Inter', sans-serif",
                } 
              }}
            >
              {filteredCities.length > 0 ? (
                filteredCities.map((city, index) => (
                  <MenuItem
                    key={`${city.city}-${city.country}-${index}`}
                    onClick={() => handleCitySelect(city)}
                    sx={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {city.city}, {city.country}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled sx={{ fontFamily: "'Inter', sans-serif" }}>No results found</MenuItem>
              )}
            </Menu>
          </Grid>

          {/* CHECK-IN */}
          <Grid item xs={12} sm={3} width={300}>
            <TextField
              fullWidth
              size="small"
              type="date"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              sx={{
                "& .MuiInputBase-root": {
                  height: 40,
                  fontFamily: "'Inter', sans-serif",
                },
              }}
              InputProps={{ 
                sx: { 
                  fontSize: 12,
                  fontFamily: "'Inter', sans-serif",
                } 
              }}
            />
          </Grid>

          {/* TRAVELLERS */}
          <Grid item xs={12} sm={3}>
            <Button
              fullWidth
              variant="outlined"
              size="small"
              onClick={handleTravellerClick}
              sx={{ 
                justifyContent: "space-around", 
                fontSize: 12, 
                textTransform: "none",
                height: 40,
                width: 190,
                color: "#000000",
                fontFamily: "'Inter', sans-serif",
              }}
              endIcon={<Users size={16} />}
            >
              {travellersLabel}
            </Button>
            <Menu
              anchorEl={travellerAnchorEl}
              open={Boolean(travellerAnchorEl)}
              onClose={handleTravellerClose}
              PaperProps={{ 
                style: { 
                  width: 250, 
                  padding: 8,
                  fontFamily: "'Inter', sans-serif",
                } 
              }}
            >
              {["adults", "children", "infants"].map((type) => (
                <Box key={type} sx={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "center", 
                  mb: 1,
                  fontFamily: "'Inter', sans-serif",
                }}>
                  <Typography sx={{ 
                    fontSize: 12,
                    fontFamily: "'Inter', sans-serif",
                  }}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <IconButton size="small" onClick={() => updateTraveller(type, -1)}>
                      <Minus size={16} />
                    </IconButton>
                    <Typography sx={{ 
                      fontSize: 12,
                      fontFamily: "'Inter', sans-serif",
                    }}>
                      {travellers[type]}
                    </Typography>
                    <IconButton size="small" onClick={() => updateTraveller(type, 1)}>
                      <Plus size={16} />
                    </IconButton>
                  </Box>
                </Box>
              ))}
            </Menu>
          </Grid>

          {/* Search Button */}
          <Grid item xs={12} sm={2}>
            <IconButton
              color="primary"
              size="small"
              sx={{
                backgroundColor: "#1976d2",
                "&:hover": { backgroundColor: "#115293" },
                width: 40,
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

export default TourSearchForm;