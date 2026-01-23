"use client";

import {
  Box,
  Typography,
  Paper,
  Button,
  Divider,
} from "@mui/material";
import {
  DirectionsCar as CarIcon,
  LocalGasStation as FuelIcon,
  AcUnit as AcIcon,
  Settings as TransmissionIcon,
  EventSeat as SeatsIcon,
  CheckCircleOutline as CheckIcon,
  ArrowForward as ArrowIcon
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/app/context/GlobalContext";

export default function CarCard({ car }) {
  const router = useRouter();
  const { setSelectedCar } = useGlobalContext();

  const handleBookNow = () => {
    setSelectedCar(car);
    router.push("/cars/booking");
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
        }
      }}
    >
      {/* Image Section */}
      <Box
        sx={{
          width: { xs: "100%", sm: 240, md: 220, lg: 240 },
          height: { xs: 200, sm: "auto" },
          position: "relative",
          bgcolor: "#F3F4F6",
          flexShrink: 0
        }}
      >
        <Box
          component="img"
          src={car.image}
          alt={car.name}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block"
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
          {car.rating.toFixed(1)}
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
          {car.type}
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
            {car.name}
          </Typography>
        </Box>

        {/* Company */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.5 }}>
          <CarIcon sx={{ fontSize: 13, color: "#9CA3AF" }} />
          <Typography sx={{ 
            fontSize: "0.7rem", 
            color: "#6B7280",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}>
            {car.company}
          </Typography>
        </Box>

        {/* Specifications */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: { xs: 1.5, md: 1 }, mb: { xs: 1, md: 0.5 } }}>
          <Typography
            sx={{
              fontSize: "0.65rem",
              color: "#2563EB",
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: 0.3,
            }}
          >
            <TransmissionIcon sx={{ fontSize: 11 }} />
            {car.transmission}
          </Typography>
          <Typography
            sx={{
              fontSize: "0.65rem",
              color: "#2563EB",
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: 0.3,
            }}
          >
            <FuelIcon sx={{ fontSize: 11 }} />
            {car.fuel}
          </Typography>
          <Typography
            sx={{
              fontSize: "0.65rem",
              color: "#2563EB",
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: 0.3,
            }}
          >
            <SeatsIcon sx={{ fontSize: 11 }} />
            {car.seats} Seats
          </Typography>
          {car.ac && (
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
              <CheckIcon sx={{ fontSize: 11 }} />
              AC Available
            </Typography>
          )}
        </Box>

        <Divider sx={{ mb: { xs: 1, md: 0.5 }, borderColor: "#F3F4F6" }} />

        {/* Footer info: Price & Button */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", mt: "auto" }}>
          <Box>
            <Typography sx={{ fontSize: "0.7rem", color: "#6B7280", mb: 0.1 }}>From</Typography>
            <Typography sx={{ fontSize: "1rem", fontWeight: 700, color: "#1F2937", lineHeight: 1 }}>
              ${car.price.toFixed(2)}
            </Typography>
            <Typography sx={{ fontSize: "0.6rem", color: "#9CA3AF", mt: 0.3 }}>
              per Day
            </Typography>
          </Box>
          <Button
            variant="contained"
            size="small"
            onClick={handleBookNow}
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
