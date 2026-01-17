"use client";

import {
  Box,
  Typography,
  Paper,
  Button,
  Chip,
  Rating,
  Divider,
} from "@mui/material";
import {
  LocationOn as LocationIcon,
  Wifi as WifiIcon,
  Pool as PoolIcon,
  LocalParking as ParkingIcon,
  CheckCircleOutline as CheckIcon,
  TrendingDown as DiscountIcon,
  ArrowForward as ArrowIcon
} from "@mui/icons-material";

export default function HotelCard({ hotel }) {
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
        }}
      >
        <Box
          component="img"
          src={hotel.image}
          alt={hotel.name}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        {/* Rating Badge */}
        <Box
          sx={{
            position: "absolute",
            top: 6,
            left: 6,
            bgcolor: "rgba(0, 0, 0, 0.7)",
            color: "white",
            px: 0.8,
            py: 0.2,
            borderRadius: 1,
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            fontSize: "0.65rem",
            fontWeight: 700,
          }}
        >
          <Box component="span" sx={{ color: "#FBBF24" }}>★</Box>
          {hotel.rating.toFixed(1)}
        </Box>
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
          {hotel.type}s
        </Box>
      </Box>

      {/* Content Section */}
      <Box sx={{ flex: 1, p: { xs: 2, sm: 2, md: 1.2, lg: 2 }, display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 0.2 }}>
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
            {hotel.name}
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
            {hotel.location}
          </Typography>
        </Box>

        {/* Stars */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}>
          <Rating value={hotel.stars} readOnly size="small" sx={{ fontSize: { xs: "0.8rem", md: "0.7rem" }, color: "#FBBF24" }} />
          <Typography sx={{ fontSize: { xs: "0.7rem", md: "0.6rem" }, color: "#9CA3AF", ml: 0.5 }}>
            ({hotel.rating.toFixed(1)})
          </Typography>
        </Box>

        {/* Amenities */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: { xs: 1, md: 0.5 }, mb: { xs: 1, md: 0.5 } }}>
          {hotel.amenities.map((amenity, index) => (
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
              {amenity === "Free WIFI" && <WifiIcon sx={{ fontSize: 11 }} />}
              {amenity === "Swimming Pool" && <PoolIcon sx={{ fontSize: 11 }} />}
              {amenity === "Parking" && <ParkingIcon sx={{ fontSize: 11 }} />}
              {amenity}
            </Typography>
          ))}
          {hotel.tags.map((tag, index) => (
            <Typography
              key={`tag-${index}`}
              sx={{
                fontSize: "0.65rem",
                color: tag.includes("OFF") ? "#DC2626" : "#059669",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 0.3,
              }}
            >
              {tag.includes("Refundable") && <CheckIcon sx={{ fontSize: 11 }} />}
              {tag.includes("OFF") && <DiscountIcon sx={{ fontSize: 11 }} />}
              {tag}
            </Typography>
          ))}
        </Box>

        <Divider sx={{ mb: { xs: 1, md: 0.5 }, borderColor: "#F3F4F6" }} />

        {/* Footer info: Price & Button */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", mt: "auto" }}>
          <Box>
            <Typography sx={{ fontSize: "0.7rem", color: "#6B7280", mb: 0.1 }}>From</Typography>
            <Typography sx={{ fontSize: "1rem", fontWeight: 700, color: "#1F2937", lineHeight: 1 }}>
              {hotel.currency} {hotel.price.toFixed(2)}
            </Typography>
            <Typography sx={{ fontSize: "0.6rem", color: "#9CA3AF", mt: 0.3 }}>
              per Night • {hotel.currency} {(hotel.price * hotel.stayDuration).toFixed(2)} Total
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
              px: 1,
              py: 1,
            }}
          >
            Book Now
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
