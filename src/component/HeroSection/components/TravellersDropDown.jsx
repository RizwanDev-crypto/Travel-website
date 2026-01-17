"use client";

import { useState, useEffect } from "react";
import { useTheme, useMediaQuery } from "@mui/material";

// ✅ CORRECT: Use curly braces for named imports
import {
  Popper,
  IconButton,
  Typography,
  Box,
  Button,
  Select,
  MenuItem,
  FormControl,
  Paper,
  Grid,
  CircularProgress,
} from "@mui/material";

import { People, Add, Remove, ExpandMore, Close } from "@mui/icons-material";

export default function TravellersDropdown({
  travellers,
  onTravellersChange,
  sx,
  mode = "flight",
  nationalityCode = "PK", // 👈 NEW PROP: DEFAULT VALUE
  onNationalityChange, // 👈 NEW PROP: CALLBACK FUNCTION
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [childAges, setChildAges] = useState([0]);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  /* ===== Fetch Countries with Flags ===== */
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,flags,cca2"
        );
        const data = await response.json();
        
        // Format countries data
        const formattedCountries = data
          .map(country => ({
            name: country.name.common,
            flag: country.flags.svg || country.flags.png,
            code: country.cca2
          }))
          .sort((a, b) => a.name.localeCompare(b.name));
        
        setCountries(formattedCountries);
      } catch (error) {
        console.error("Error fetching countries:", error);
        // Fallback to static list without flags
        setCountries([
          { name: "Pakistan", flag: "https://flagcdn.com/pk.svg", code: "PK" },
          { name: "India", flag: "https://flagcdn.com/in.svg", code: "IN" },
          { name: "Afghanistan", flag: "https://flagcdn.com/af.svg", code: "AF" },
          { name: "Bangladesh", flag: "https://flagcdn.com/bd.svg", code: "BD" },
          { name: "China", flag: "https://flagcdn.com/cn.svg", code: "CN" },
          { name: "Japan", flag: "https://flagcdn.com/jp.svg", code: "JP" },
          { name: "United Arab Emirates", flag: "https://flagcdn.com/ae.svg", code: "AE" },
          { name: "Saudi Arabia", flag: "https://flagcdn.com/sa.svg", code: "SA" },
          { name: "United States", flag: "https://flagcdn.com/us.svg", code: "US" },
          { name: "United Kingdom", flag: "https://flagcdn.com/gb.svg", code: "GB" },
          { name: "Germany", flag: "https://flagcdn.com/de.svg", code: "DE" },
          { name: "France", flag: "https://flagcdn.com/fr.svg", code: "FR" },
          { name: "Australia", flag: "https://flagcdn.com/au.svg", code: "AU" },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  /* ===== Sync Child Ages ===== */
  useEffect(() => {
    if (travellers.children > childAges.length) {
      setChildAges((prev) => [
        ...prev,
        ...Array(travellers.children - prev.length).fill(0),
      ]);
    } else if (travellers.children < childAges.length) {
      setChildAges((prev) => prev.slice(0, travellers.children));
    }
  }, [travellers.children]);

  const open = Boolean(anchorEl);

  /* ===== Traveller Config based on mode ===== */
  const travellerConfig =
    mode === "hotel"
      ? [
          { key: "rooms", label: "Rooms",  max: 32 },
          { key: "adults", label: "Adults", sub: "12+ years", max: 12 },
          { key: "children", label: "Children", sub: "0–11 years", max: 12 },
        ]
      : [
          { key: "adults", label: "Adults", sub: "12+ years", max: 9 },
          { key: "children", label: "Children", sub: "2–11 years", max: 8 },
          { key: "infants", label: "Infants", sub: "Under 2", max: 5 },
        ];

  /* ===== Increment / Decrement ===== */
const handleTravellerChange = (type, operation) => {
  const current = travellers[type] || 0;
  let newVal;
  
  if (operation === "increment") {
    newVal = current + 1;
  } else {
    newVal = current - 1;
    if (newVal < 0) newVal = 0;
  }
  
  // Hotel mode specific minimums
  if (type === "rooms" && newVal < 1) newVal = 1;
  if (type === "adults" && newVal < 1) newVal = 1;
  
  onTravellersChange({ ...travellers, [type]: newVal });
};

  /* ===== Display Text ===== */
  const totalTravellers = mode === "hotel" 
    ? travellers.adults + travellers.children
    : travellers.adults + travellers.children + travellers.infants;

  const displayText =
    mode === "hotel"
      ? `Travellers ${totalTravellers} Rooms ${travellers.rooms || 1}`
      : totalTravellers > 0
          ? `${totalTravellers} Traveller${totalTravellers > 1 ? "s" : ""}`
          : "Travellers";

  const ageOptions = Array.from({ length: 18 }, (_, i) => i); // 0-17 years

  return (
    <>
      {/* ===== Trigger Button ===== */}
<Button
  fullWidth
  variant="outlined"
  size="small"
  onClick={(e) => setAnchorEl(anchorEl ? null : e.currentTarget)}
  startIcon={<People sx={{ fontSize: 16 }} />}
  endIcon={<ExpandMore sx={{ fontSize: 16 }} />}
  sx={{
    height: 40, 
    fontSize: { xs: "12px", md: "10px" },  
    color: "#000",
    borderColor: "#c0c0c0",
    justifyContent: "space-between",
    textTransform: "none",
    px: 1.5,
    fontFamily: "'Inter', sans-serif",
    ...sx,
    ":hover": {
      borderColor: "#1976d2",
    }
  }}
>
  {displayText}
</Button>

      {/* ===== Popper ===== */}
      <Popper
        open={open}
        anchorEl={anchorEl}
        placement="bottom-start"
        disablePortal
        modifiers={[
          { name: "offset", options: { offset: [0, 6] } },
          { name: "flip", enabled: false }
        ]}
        sx={{ 
          zIndex: 999,
          width: anchorEl ? anchorEl.offsetWidth : "auto",
          boxSizing: "border-box"
        }}
      >
        <Paper
          sx={{
            p: { xs: 1, sm: 2 },
            width: "100%",
            boxSizing: "border-box",
            borderRadius: 1,
            maxHeight: 500,
            overflowY: "auto",
            overflowX: "hidden",
            scrollbarWidth: "none", // For Firefox
            "&::-webkit-scrollbar": {
              display: "none", // For Chrome, Safari and Opera
            },
            msOverflowStyle: "none", // For IE and Edge
            color: "#000000",
            "& *": {
              color: "#000000",
            },
          }}
        >
          {/* Header */}
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography fontSize={12} fontWeight={600}>
              {mode === "hotel" ? "Travellers & Rooms" : "Travellers"}
            </Typography>
            <IconButton size="small" onClick={() => setAnchorEl(null)}>
              <Close fontSize="small" />
            </IconButton>
          </Box>

          {/* Controls */}
          {travellerConfig.map(({ key, label, sub, max }) => (
            <Box key={key} display="flex" justifyContent="space-between" mb={1.5}>
              <Box>
                <Typography fontSize={10} fontWeight={500}>
                  {label}
                </Typography>
                <Typography fontSize={8} color="text.secondary">
                  {sub}
                </Typography>
              </Box>

              <Box display="flex" alignItems="center" gap={0.5}>
                <IconButton
                  size="small"
                  disabled={
                    travellers[key] <= 
                    (key === "adults" ? 1 : 
                     key === "rooms" ? 1 : 
                     key === "infants" ? 0 : 0)
                  }
                  onClick={() => handleTravellerChange(key, "decrement")}
                  sx={{
                    border: "1px solid black",
                    borderRadius: "100px",
                    width: 20,
                    height: 20,
                    '&:disabled': {
                      opacity: 0.3,
                      cursor: "not-allowed"
                    }
                  }}
                >
                  <Remove fontSize="small" />
                </IconButton>

              <Typography 
  mx={1} 
  fontSize={14} 
  fontWeight={500}
  minWidth={20}
  textAlign="center"
>
  {key === "rooms" ? travellers.rooms || 1 : travellers[key]}
</Typography>


                <IconButton
                  size="small"
                  disabled={travellers[key] >= max}
                  onClick={() => handleTravellerChange(key, "increment")}
                  sx={{
                    border: "1px solid black",
                    borderRadius: "100px",
                    width: 20,
                    height: 20,
                    '&:disabled': {
                      opacity: 0.3,
                      cursor: "not-allowed"
                    }
                  }}
                >
                  <Add fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          ))}

          {/* Child Ages - UPDATED FOR SCROLLBAR REMOVAL */}
          {travellers.children > 0 && (
            <Box mt={2}>
              <Typography fontSize={10} fontWeight={600} mb={1}>
                Child Ages
              </Typography>
              
              <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 1,
              
                overflowX: 'none',
                scrollbarWidth: 'none',
                '&::-webkit-scrollbar': {
                  display: 'none',
                }
              }}>
                {childAges.map((age, i) => {
                  // If odd number of children and this is the last one
                  const isOddTotal = travellers.children % 2 !== 0;
                  const isLastItem = i === travellers.children - 1;
                  
                  return (
                    <Box 
                      key={i} 
                      sx={{ 
                        gridColumn: isOddTotal && isLastItem ? '1 / -1' : 'auto',
                        mb: 1 
                      }}
                    >
                      <Typography fontSize={9} color="#000000" mb={0.5}>
                        {i + 1}. Child Age
                      </Typography>
                      <FormControl fullWidth size="small">
                        <Select
                          value={age}
                          onChange={(e) =>
                            setChildAges((prev) =>
                              prev.map((a, idx) =>
                                idx === i ? Number(e.target.value) : a
                              )
                            )
                          }
                          sx={{ 
                            fontSize: 10, 
                            height: 32,
                            px: 1,
                            '& .MuiSelect-select': {
                              fontSize: 10,
                            }
                          }}
                          MenuProps={{
                            PaperProps: {
                              sx: {
                                // ✅ FIXED: scrollbar removal
                                maxHeight: 200, // Reduced height
                                overflow: 'hidden', // Hide overflow
                                scrollbarWidth: 'none', // Firefox
                                msOverflowStyle: 'none', // IE/Edge
                                
                                // For Webkit browsers (Chrome, Safari, Edge)
                                '&::-webkit-scrollbar': {
                                  display: 'none',
                                  width: 0,
                                  height: 0,
                                  background: 'transparent',
                                },
                            
                                '& .MuiMenu-list': {
                                  padding: 0,
                                  maxHeight: 200,
                                  overflowY: 'auto',
                                  scrollbarWidth: 'none',
                                  msOverflowStyle: 'none',
                                  
                                  // Webkit scrollbar hide
                                  '&::-webkit-scrollbar': {
                                    display: 'none',
                                    width: 0,
                                    height: 0,
                                    background: 'transparent',
                                  },
                                },
                                
                                '& .MuiMenuItem-root': {
                                  fontSize: 10,
                                  minHeight: 32,
                                  padding: '6px 12px',
                                },
                              }
                            },
                            disableScrollLock: false,
                            sx: { zIndex: 1000 }
                          }}
                        >
                          {ageOptions.map((opt) => (
                            <MenuItem 
                              key={opt} 
                              value={opt} 
                              sx={{ 
                                fontSize: 10,
                                minHeight: 32,
                                padding: '6px 12px',
                              }}
                            >
                              {opt === 0 ? "0" : `${opt}`}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          )}
        
          {/* Nationality with Flags */}
          <Box mt={2}>
            <Typography fontSize={10} fontWeight={600} mb={0.5}>
              Nationality
            </Typography>

            <FormControl fullWidth size="small">
              {loading ? (
                <Box display="flex" alignItems="center" justifyContent="center" py={1}>
                  <CircularProgress size={16} />
                  <Typography fontSize={9} ml={1}>
                    Loading countries...
                  </Typography>
                </Box>
              ) : (
                <Select
                  value={nationalityCode} // 👈 NOW USING COUNTRY CODE
                  onChange={(e) => {
                    // Find selected country
                    const selectedCountry = countries.find(c => c.code === e.target.value);
                    if (selectedCountry && onNationalityChange) {
                      onNationalityChange(e.target.value); //  PASS COUNTRY CODE TO PARENT
                    }
                  }}
                  sx={{ 
                    fontSize: 10, 
                    height: 32,
                    '& .MuiSelect-select': {
                      display: 'flex',
                      alignItems: 'center',
                      py: 0.75,
                      fontSize: 10,
                      maxWidth: '180px', // ✅ Max width limit
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      gap:1,
                    }
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        maxHeight: 300,
                        width: anchorEl ? anchorEl.offsetWidth : "auto", // ✅ Match trigger width
                        '& .MuiMenuItem-root': {
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5, 
                          fontSize: 9, 
                          py: 0.25,
                          minHeight: '32px', // ✅ Height optimize
                          '& img': {
                            width: 14, // ✅ Flag size 
                            height: 10,
                            flexShrink: 0,
                          }
                        }
                      }
                    },
                    disablePortal: false, // ✅ Keep menu inside the parent container
                    disableScrollLock: false,
                    sx: { zIndex: 900 } // Higher than the main panel
                  }}
                >
                  {countries.map((country) => (
                    <MenuItem key={country.code} value={country.code} sx={{ fontSize: 9 }}> {/* 👈 VALUE = COUNTRY CODE */}
                      <img 
                        src={country.flag} 
                        alt={`${country.name} flag`}
                        style={{
                          width: 14,
                          height: 10,
                          borderRadius: 1,
                          objectFit: 'cover',
                          border: '0.5px solid #ddd',
                          flexShrink: 0,
                        }}
                      />
                      <span style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}>
                        {country.name} ({country.code})
                      </span>
                    </MenuItem>
                  ))}
                </Select>
              )}
            </FormControl>
          </Box>

          {/* Summary for Hotel Mode */}
          {mode === "hotel" && (
            <Box mt={2} pt={1.5} borderTop="1px solid #eee">
              <Typography fontSize={9} color="text.secondary">
                Total: {totalTravellers} Traveller{totalTravellers !== 1 ? "s" : ""}, {travellers.rooms || 1} Room{travellers.rooms !== 1 ? "s" : ""}
              </Typography>
            </Box>
          )}
        </Paper>
      </Popper>
    </>
  );
}