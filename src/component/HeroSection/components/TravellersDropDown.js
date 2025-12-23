"use client";

import { useState, useEffect } from "react";
import {
  Popper,
  IconButton,
  Typography,
  Box,
  Button,
  Select,
  MenuItem,
  FormControl,
  Grid,
  Paper,
} from "@mui/material";
import { People, Add, Remove, ExpandMore, Close } from "@mui/icons-material";

/* ===== Countries Array ===== */
const countries = [
  "Pakistan","India","Afghanistan","Bangladesh","Nepal","Sri Lanka","China",
  "Japan","South Korea","Thailand","Malaysia","Indonesia","Singapore",
  "United Arab Emirates","Saudi Arabia","Qatar","Kuwait","Oman","Turkey",
  "Iran","Iraq","United States","Canada","United Kingdom","Germany","France",
  "Italy","Spain","Netherlands","Belgium","Switzerland","Sweden","Norway",
  "Denmark","Finland","Russia","Ukraine","Brazil","Argentina","Chile",
  "Mexico","Colombia","Peru","South Africa","Egypt","Nigeria","Kenya",
  "Australia","New Zealand",
];

export default function TravellersDropdown({ travellers, onTravellersChange }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [nationality, setNationality] = useState("Pakistan");
  const [childAges, setChildAges] = useState([0]);

  useEffect(() => {
    if (travellers.children > childAges.length) {
      setChildAges((prev) => [...prev, ...Array(travellers.children - prev.length).fill(0)]);
    } else if (travellers.children < childAges.length) {
      setChildAges((prev) => prev.slice(0, travellers.children));
    }
  }, [travellers.children]);

  const open = Boolean(anchorEl);

  const handleTravellerChange = (type, operation) => {
    const newValue =
      operation === "increment" ? travellers[type] + 1 : travellers[type] - 1;

    if (type === "adults" && newValue >= 1 && newValue <= 9)
      onTravellersChange({ ...travellers, [type]: newValue });

    if (type === "children" && newValue >= 0 && newValue <= 8)
      onTravellersChange({ ...travellers, [type]: newValue });

    if (
      type === "infants" &&
      newValue >= 0 &&
      newValue <= 5 &&
      newValue <= travellers.adults
    )
      onTravellersChange({ ...travellers, [type]: newValue });
  };

  const totalTravellers =
    travellers.adults + travellers.children + travellers.infants;

  const displayText =
    totalTravellers > 0
      ? `${totalTravellers} Traveller${totalTravellers > 1 ? "s" : ""}`
      : "Travellers";

  const ageOptions = Array.from({ length: 12 }, (_, i) => i);

  return (
    <>
      {/* Trigger Button */}
      <Button
        variant="outlined"
        fullWidth
        size="small"
        onClick={(e) => setAnchorEl(anchorEl ? null : e.currentTarget)}
        startIcon={<People sx={{ fontSize: 16 }} />}
        endIcon={<ExpandMore sx={{ fontSize: 16 }} />}
        sx={{
          height: 40,
          fontSize: "12px",
          color: "#000",
          width: { xs: 189 , lg:160}, // xs = extra small = mobile
          borderColor: "#c0c0c0",
          justifyContent: "space-between",
          textTransform: "none",
          px: 1.5,
          fontFamily: "'Inter', sans-serif", // Inter font added
          "&:hover": {
            borderColor: "#1976d2",
            backgroundColor: "#f0f7ff",
          },
        }}
      >
        {displayText.toLowerCase()}
      </Button>

      {/* Popper */}
      <Popper
        open={open}
        anchorEl={anchorEl}
        placement="bottom-start"
        disablePortal
        modifiers={[
          {
            name: "offset",
            options: { offset: [0, 6] },
          },
        ]}
        sx={{ zIndex: 1200 }}
      >
        <Paper 
          sx={{ 
            p: 2, 
            width: 210, 
            borderRadius: 1,
            fontFamily: "'Inter', sans-serif", // Inter font added
          }}
        >
          {/* Header */}
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography sx={{ 
              fontSize: 12, 
              fontWeight: 600,
              fontFamily: "'Inter', sans-serif", // Inter font added
            }}>
              Travellers
            </Typography>
            <IconButton 
              size="small" 
              onClick={() => setAnchorEl(null)}
              sx={{ fontFamily: "'Inter', sans-serif" }} // Inter font added
            >
              <Close fontSize="small" />
            </IconButton>
          </Box>

          {/* Adults / Children / Infants */}
          {[
            { key: "adults", label: "Adults", sub: "12+ years", max: 9 },
            { key: "children", label: "Children", sub: "2–11 years", max: 8 },
            { key: "infants", label: "Infants", sub: "Under 2", max: 5 },
          ].map(({ key, label, sub, max }) => (
            <Box key={key} display="flex" justifyContent="space-between" mb={0.5}>
              <Box>
                <Typography sx={{ 
                  fontSize: 10,
                  fontFamily: "'Inter', sans-serif", // Inter font added
                }}>
                  {label}
                </Typography>
                <Typography sx={{ 
                  fontSize: 8, 
                  color: "text.secondary",
                  fontFamily: "'Inter', sans-serif", // Inter font added
                }}>
                  {sub}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <IconButton
                  size="small"
                  disabled={travellers[key] <= (key === "adults" ? 1 : 0)}
                  onClick={() => handleTravellerChange(key, "decrement")}
                  sx={{ fontFamily: "'Inter', sans-serif" }} // Inter font added
                >
                  <Remove fontSize="small" />
                </IconButton>
                <Typography sx={{ 
                  mx: 0.5, 
                  fontSize: 10,
                  fontFamily: "'Inter', sans-serif", // Inter font added
                }}>
                  {travellers[key]}
                </Typography>
                <IconButton
                  size="small"
                  disabled={
                    travellers[key] >= max ||
                    (key === "infants" &&
                      travellers.infants >= travellers.adults)
                  }
                  onClick={() => handleTravellerChange(key, "increment")}
                  sx={{ fontFamily: "'Inter', sans-serif" }} // Inter font added
                >
                  <Add fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          ))}

          {/* Child Ages */}
          {travellers.children > 0 && (
            <Box mt={1}>
              <Typography sx={{ 
                fontSize: 10, 
                fontWeight: 600,
                fontFamily: "'Inter', sans-serif", // Inter font added
              }}>
                Child Ages
              </Typography>
              {childAges.map((age, i) => (
                <FormControl fullWidth size="small" key={i} sx={{ mt: 0.5 }}>
                  <Select
                    value={age}
                    onChange={(e) =>
                      setChildAges((prev) =>
                        prev.map((a, idx) =>
                          idx === i ? e.target.value : a
                        )
                      )
                    }
                    sx={{ 
                      fontSize: 10, 
                      height: 26,
                      fontFamily: "'Inter', sans-serif", // Inter font added
                    }}
                  >
                    {ageOptions.map((opt) => (
                      <MenuItem 
                        key={opt} 
                        value={opt} 
                        sx={{ 
                          fontSize: 10,
                          fontFamily: "'Inter', sans-serif", // Inter font added
                        }}
                      >
                        {opt} years
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ))}
            </Box>
          )}

          {/* Nationality */}
          <Box mt={1.5}>
            <Typography sx={{ 
              fontSize: 10, 
              fontWeight: 600,
              fontFamily: "'Inter', sans-serif", // Inter font added
            }}>
              Nationality
            </Typography>
            <FormControl fullWidth size="small">
              <Select
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
                sx={{ 
                  fontSize: 10, 
                  height: 28,
                  fontFamily: "'Inter', sans-serif", // Inter font added
                }}
              >
                {countries.map((c) => (
                  <MenuItem 
                    key={c} 
                    value={c} 
                    sx={{ 
                      fontSize: 10,
                      fontFamily: "'Inter', sans-serif", // Inter font added
                    }}
                  >
                    {c}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Paper>
      </Popper>
    </>
  );
}