"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Rating,
  Divider,
  IconButton,
} from "@mui/material";
import {
  LocationOn as LocationIcon,
  AccessTime as DurationIcon,
  Group as GroupIcon,
  CheckCircleOutline as CheckIcon,
  ArrowForward as ArrowIcon,
  ChevronLeft as LeftIcon,
  ChevronRight as RightIcon,
} from "@mui/icons-material";

export default function TourCard({ tour }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = tour.images || [tour.image];

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        borderRadius: 2,
        overflow: "hidden",
        border: "1px solid #E5E7EB",
        mb: 2,
        minHeight: { xs: "auto", sm: 180, md: 160, lg: 180 },
        height: "auto",
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          "& .carousel-btn": { opacity: 1 }
        }
      }}
    >
      {/* Image Section */}
      <Box
        sx={{
          width: { xs: "100%", sm: 280 , md: 220 , lg: 220 },
          height: "auto",
          minHeight: { xs: 180, sm: 180, md: 160, lg: 180 },
          position: "relative",
          bgcolor: "#F3F4F6",
          overflow: "hidden",
        }}
      >
        <Box
          component="img"
          src={images[currentImageIndex]}
          alt={tour.name}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "opacity 0.3s ease-in-out",
          }}
        />

        {/* Carousel Buttons */}
        {images.length > 1 && (
          <>
            <IconButton
              className="carousel-btn"
              onClick={handlePrev}
              sx={{
                position: "absolute",
                left: 8,
                top: "50%",
                transform: "translateY(-50%)",
                bgcolor: "rgba(0,0,0,0.3)",
                color: "white",
                padding: "4px",
                opacity: 0,
                transition: "all 0.2s ease",
                "&:hover": { bgcolor: "rgba(0,0,0,0.5)" },
              }}
            >
              <LeftIcon sx={{ fontSize: 18 }} />
            </IconButton>
            <IconButton
              className="carousel-btn"
              onClick={handleNext}
              sx={{
                position: "absolute",
                right: 8,
                top: "50%",
                transform: "translateY(-50%)",
                bgcolor: "rgba(0,0,0,0.3)",
                color: "white",
                padding: "4px",
                opacity: 0,
                transition: "all 0.2s ease",
                "&:hover": { bgcolor: "rgba(0,0,0,0.5)" },
              }}
            >
              <RightIcon sx={{ fontSize: 18 }} />
            </IconButton>

            {/* Image Counter */}
            <Box
              sx={{
                position: "absolute",
                bottom: 8,
                right: 8,
                bgcolor: "rgba(0,0,0,0.5)",
                color: "white",
                px: 1,
                py: 0.3,
                borderRadius: 5,
                fontSize: "0.65rem",
                fontWeight: 600,
              }}
            >
              {currentImageIndex + 1}/{images.length}
            </Box>
          </>
        )}
        {/* Featured Badge */}
        {tour.featured && (
          <Box
            sx={{
              position: "absolute",
              top: 6,
              left: 6,
              bgcolor: "#FBBF24",
              color: "white",
              px: 1,
              py: 0.2,
              borderRadius: 1,
              fontSize: "0.65rem",
              fontWeight: 700,
              textTransform: "uppercase",
            }}
          >
            Featured
          </Box>
        )}
        {/* Type Badge */}
        <Box
          sx={{
            position: "absolute",
            top: 6,
            right: 6,
            bgcolor: "#1A53FF",
            color: "white",
            px: 0.8,
            py: 0.2,
            borderRadius: 1,
            fontSize: "0.55rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          {tour.type}
        </Box>
      </Box>

      {/* Content Section */}
      <Box sx={{ flex: 1, p: { xs: 2, sm: 2, md: 1.5, lg: 2 }, display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 0.5 }}>
          <Typography sx={{ 
            fontSize: "1rem", 
            fontWeight: 700, 
            color: "#1F2937", 
            lineHeight: 1.2,
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden"
          }}>
            {tour.name}
          </Typography>
        </Box>

        {/* Location */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.5 }}>
          <LocationIcon sx={{ fontSize: 13, color: "#9CA3AF" }} />
          <Typography sx={{ 
            fontSize: "0.7rem", 
            color: "#6B7280",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}>
            {tour.location}
          </Typography>
        </Box>

        {/* Rating and Duration */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <Rating value={tour.rating} readOnly size="small" sx={{ fontSize: { xs: "0.8rem", md: "0.7rem" }, color: "#FBBF24" }} />
                <Typography sx={{ fontSize: { xs: "0.7rem", md: "0.6rem" }, color: "#9CA3AF", ml: 0.5 }}>
                    ({tour.reviews} Reviews)
                </Typography>
            </Box>
             <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <DurationIcon sx={{ fontSize: 13, color: "#9CA3AF" }} />
                <Typography sx={{ fontSize: { xs: "0.7rem", md: "0.6rem" }, color: "#6B7280" }}>
                    {tour.duration}
                </Typography>
            </Box>
        </Box>

        {/* Features/Amenities */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: { xs: 1, md: 0.5 }, mb: { xs: 1, md: 0.5 } }}>
          {tour.amenities.map((amenity, index) => (
            <Typography
              key={index}
              sx={{
                fontSize: "0.65rem",
                color: "#2563EB",
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                gap: 0.3,
              }}
            >
              <CheckIcon sx={{ fontSize: 11 }} />
              {amenity}
            </Typography>
          ))}
          <Typography
             sx={{
                fontSize: "0.65rem",
                color: "#059669",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 0.3,
              }}
            >
             <GroupIcon sx={{ fontSize: 11 }} />
             {tour.groupSize}
            </Typography>
        </Box>

        <Divider sx={{ mb: { xs: 1, md: 0.5 }, borderColor: "#F3F4F6", mt: "auto" }} />

        {/* Footer info: Price & Button */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", mt: 1 }}>
          <Box>
            <Typography sx={{ fontSize: "0.7rem", color: "#6B7280", mb: 0.1 }}>From</Typography>
            <Typography sx={{ fontSize: "1rem", fontWeight: 700, color: "#1F2937", lineHeight: 1 }}>
              {tour.currency} {tour.price}
            </Typography>
          </Box>
          <Button
            variant="contained"
            size="small"
            endIcon={<ArrowIcon sx={{ fontSize: "1rem !important" }} />}
            sx={{
              bgcolor: "#1A53FF",
              "&:hover": { bgcolor: "#0040FF" },
              borderRadius: 1.5,
              textTransform: "none",
              fontWeight: 600,
              fontSize: "0.7rem",
              px: 2,
              py: 1,
            }}
          >
            Details
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
