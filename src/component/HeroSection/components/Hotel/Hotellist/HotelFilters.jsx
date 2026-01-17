"use client";

import {
  Box,
  Typography,
  Paper,
  IconButton,
  Chip,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Slider,
  Divider,
  Collapse
} from "@mui/material";
import {
  Tune as TuneIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  Search as SearchIcon,
  Star as StarIcon,
  Hotel as HotelIcon,
  PaymentsOutlined as PaymentsOutlinedIcon
} from "@mui/icons-material";
import { useState } from "react";

const FilterSection = ({ title, icon, defaultOpen = true, children, hasDivider = true }) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <Box sx={{ mb: 0 }}>
      <Box
        onClick={() => setOpen(!open)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
          py: 1.5,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {icon && <Box sx={{ color: "#9CA3AF", display: "flex" }}>{icon}</Box>}
          <Typography component="div" sx={{ fontWeight: 600, fontSize: "0.75rem", color: "#1F2937", fontFamily: "'Inter', sans-serif" }}>
            {title}
          </Typography>
        </Box>
        {open ? <KeyboardArrowUpIcon sx={{ fontSize: 18, color: "#9CA3AF" }} /> : <KeyboardArrowDownIcon sx={{ fontSize: 18, color: "#9CA3AF" }} />}
      </Box>
      <Collapse in={open}>
        <Box sx={{ pb: 2 }}>{children}</Box>
      </Collapse>
      {hasDivider && <Divider sx={{ borderColor: "#E5E7EB" }} />}
    </Box>
  );
};

export default function HotelFilters({ hotelCount = 1 }) {
  const [priceRange, setPriceRange] = useState([0, 10000]);

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        bgcolor: "white",
        borderRadius: 2,
        p: 2,
        pb: 1,
        color: "black",
        border: "1px solid #E5E7EB",
        position: "sticky",
        top: 20,
        fontFamily: "'Inter', sans-serif"
      }}
    >
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1.5 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <TuneIcon sx={{ color: "#1A53FF", fontSize: 20 }} />
          <Typography sx={{ fontSize: "0.95rem", fontWeight: 700, color: "#1F2937" }}>
            Filters
          </Typography>
          <Chip
            label={hotelCount}
            size="small"
            sx={{
              color: "#1E40AF",
              fontWeight: 700,
              background: "#DBEAFE",
              height: 22,
              minWidth: 22,
              fontSize: "0.75rem",
              borderRadius: "50%",
              "& .MuiChip-label": { px: 0.5 }
            }}
          />
        </Box>
        <Button
          size="small"
          sx={{
            color: "#4B5563",
            textTransform: "none",
            fontWeight: 500,
            fontSize: {xs: "0.6rem",sm: "0.7rem",md: "0.6rem",lg: "0.8rem"},
            px: 1,
            py: 0.5,
            border: "1px solid #E5E7EB",
            borderRadius: 1.5,
            "&:hover": { bgcolor: "#F9FAFB" }
          }}
        >
          Clear Filter
        </Button>
      </Box>

      <Divider sx={{ mb: 1, borderColor: "#E5E7EB" }} />

      {/* Search by Name */}
      <FilterSection title="Search by Name" icon={<SearchIcon sx={{ fontSize: 18 }} />}>
        <TextField
          fullWidth
          size="small"
          placeholder="Type Hotel Name..."
          sx={{
            "& .MuiOutlinedInput-root": {
              bgcolor: "#F9FAFB",
              fontSize: "0.8rem",
              borderRadius: 1.5,
              "& fieldset": { borderColor: "#E5E7EB" },
              "&:hover fieldset": { borderColor: "#3B82F6" },
              "&.Mui-focused fieldset": { borderColor: "#3B82F6" },
            }
          }}
        />
      </FilterSection>

      {/* Price Range */}
      <FilterSection 
        title={
          <Box sx={{ display: 'flex',flexDirection: 'row', alignItems: 'center', gap: 1 }}>
            Price
            <Typography component="span" sx={{ fontSize: "0.75rem", color: "#6B7280", fontWeight: 500 }}>
              {priceRange[0]} - {priceRange[1]}
            </Typography>
          </Box>
        } 
        icon={<PaymentsOutlinedIcon sx={{ fontSize: 18 }} />}
      >
        <Box sx={{ px: 1, mt: 1 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="caption" sx={{ color: "#9CA3AF" }}>{priceRange[0]}</Typography>
            <Typography variant="caption" sx={{ color: "#9CA3AF" }}>{priceRange[1]}</Typography>
          </Box>
          <Slider
            value={priceRange}
            onChange={handlePriceChange}
            min={0}
            max={10000}
            valueLabelDisplay="auto"
            sx={{
              height: 6,
              "& .MuiSlider-track": {
                border: "none",
                background: "linear-gradient(to right, #3b82f6, #6366f1, #8b5cf6)",
              },
              "& .MuiSlider-thumb": {
                width: 18,
                height: 18,
                backgroundColor: "#fff",
                border: "2px solid #3b82f6",
                "&:hover": { boxShadow: "0 0 0 8px rgba(59, 130, 246, 0.16)" },
              },
              "& .MuiSlider-rail": { opacity: 0.3, backgroundColor: "#D1D5DB" },
            }}
          />
          <Box
            sx={{
              borderRadius: 1.5,
              py: 1,
              textAlign: "center"
            }}
          >
            <Typography sx={{ 
              fontWeight: 700, 
              fontSize: "0.85rem",  
              bgcolor: "#EFF6FF",   
              borderRadius: 2,
              py: 1,
              width: "100%",
              display: "block",
              color: "#1D4ED8",
              border: "1px solid #BFDBFE",
              textAlign: "center"
            }}>
              ${priceRange[0]} - ${priceRange[1]}
            </Typography>
            <Typography variant="caption" sx={{ color: "#6B7280", textAlign: "center", display: "block", mt: 1 }}>
              1 hotel in range
            </Typography>
          </Box>
        </Box>
      </FilterSection>

      {/* Accommodation Type */}
      <FilterSection title="Accommodation Type" icon={<HotelIcon sx={{ fontSize: 18 }} />}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          {["Hotel", "Apartment", "Villa", "Resort", "Guest House", "Hostel", "Chalet", "Cottage", "Bungalow", "Holiday Home"].map((type) => (
            <Box key={type} sx={{ 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "space-between",
              cursor: "pointer",
              "&:hover": {
                "& .MuiCheckbox-root": {
                  color: "#3B82F6",
                }
              }
            }}>
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    disableRipple
                    sx={{
                      color: "#D1D5DB",
                      outline: "none",
                      boxShadow: "none",
                      "&:hover": {
                        backgroundColor: "transparent", 
                      },
                      "&.Mui-checked": { 
                        color: "#3B82F6",
                        "&:hover": {
                          backgroundColor: "transparent", 
                        }
                      },
                      "&.Mui-focusVisible": {
                        outline: "none",
                        boxShadow: "none",
                      },
                      padding: "4px",
                      "& .MuiSvgIcon-root": { fontSize: 18 }
                    }}
                  />
                }
                label={<Typography component="span" sx={{ fontSize: "0.85rem", color: "#4B5563" }}>{type}</Typography>}
                sx={{ margin: 0 }}
              />
            </Box>
          ))}
        </Box>
      </FilterSection>

      {/* Star Rating */}
      <FilterSection title="Star Rating" icon={<StarIcon sx={{ fontSize: 18 }} />} hasDivider={false}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          {[5, 4, 3, 2, 1].map((star) => (
            <Box key={star} sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              cursor: "pointer",
              "&:hover": {
                "& .MuiCheckbox-root": {
                  color: "#3B82F6",
                }
              }
            }}>
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    disableRipple
                    sx={{
                      color: "#D1D5DB",
                      outline: "none",
                      boxShadow: "none",
                      "&:hover": {
                        backgroundColor: "transparent", 
                      },
                      "&.Mui-checked": { 
                        color: "#3B82F6",
                        "&:hover": {
                          backgroundColor: "transparent", 
                        }
                      },
                      "&.Mui-focusVisible": {
                        outline: "none",
                        boxShadow: "none",
                      },
                      padding: "4px",
                      "& .MuiSvgIcon-root": { fontSize: 18 }
                    }}
                  />
                }
                label={<Typography component="span" sx={{ fontSize: "0.85rem", color: "#4B5563" }}>{star} Star</Typography>}
                sx={{ margin: 0 }}
              />
              <Typography sx={{ fontSize: "0.8rem", color: "#9CA3AF" }}>0</Typography>
            </Box>
          ))}
        </Box>
      </FilterSection>
    </Paper>
  );
}
