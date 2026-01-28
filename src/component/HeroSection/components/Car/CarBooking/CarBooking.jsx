"use client";

import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Button, 
  TextField, 
  MenuItem, 
  Checkbox, 
  FormControlLabel, 
  IconButton,
  Divider,
  Avatar,
  Chip,
  Radio,
  RadioGroup,
  FormControl
} from "@mui/material";
import { 
  ArrowBack as BackIcon,
  Check as CheckIcon,
  Person as PersonIcon,
  ChevronLeft as LeftIcon,
  ChevronRight as RightIcon,
  InfoOutlined as InfoIcon,
  Lock as LockIcon,
  KeyboardArrowRight,
  Star as StarIcon,
  VerifiedUser as VerifiedIcon,
  Help as HelpIcon,
  RemoveCircleOutline as CrossIcon,
  CalendarToday as DateIcon,
  LocalHospital as HospitalIcon,
  Message as MessageIcon,
  DirectionsCar as CarIcon,
  LocalGasStation as FuelIcon,
  Settings as TransmissionIcon,
  EventSeat as SeatsIcon,
} from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useGlobalContext } from "@/app/context/GlobalContext";
import { useRouter } from "next/navigation";

export default function CarBooking() {
  const router = useRouter();
  const { selectedCar, carSearchData } = useGlobalContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Small timeout to allow GlobalContext to load from localStorage
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
        <Typography>Loading booking details...</Typography>
      </Box>
    );
  }

  if (!selectedCar) {
    return (
      <Box sx={{ py: 10, textAlign: "center" }}>
        <Typography variant="h5" sx={{ mb: 2 }}>No car selected</Typography>
        <Button variant="contained" onClick={() => router.push("/")}>Go back to search</Button>
      </Box>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const calculateDays = (start, end) => {
    if (!start || !end) return 1;
    const s = new Date(start);
    const e = new Date(end);
    const diff = Math.ceil((e - s) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  };

  const days = calculateDays(carSearchData?.pickUpDate, carSearchData?.dropOffDate);

  const SummaryContent = () => (
    <>
      <Paper elevation={0} sx={{ borderRadius: 2, border: "1px solid #E5E7EB", overflow: "hidden", width: "100%", mb: 2 }}>
        <Box sx={{ position: "relative", height: 160 }}>
          <Box 
            component="img"
            src={selectedCar.image}
            alt={selectedCar.name}
            sx={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Box>

        <Box sx={{ p: 2 }}>
          <Typography sx={{ fontWeight: 700, color: "#1F2937", mb: 1, fontSize: "1rem", lineHeight: 1.2 }}>
            {selectedCar.name}
          </Typography>
          
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
            <Box sx={{ bgcolor: "#003580", color: "white", px: 0.6, py: 0.3, borderRadius: 1, fontSize: "0.7em", fontWeight: 700 }}>
              {selectedCar.rating?.toFixed(1) || 9}
            </Box>
            <Typography sx={{ fontSize: "0.7rem", fontWeight: 700, color: "#1F2937" }}>Excellent</Typography>
          </Box>

          <Divider sx={{ mb: 1.5 }} />

          <Box sx={{ mb: 1.5 }}>
            <Typography sx={{ fontSize: "0.75rem", fontWeight: 700, color: "#374151" }}> Pick-up:</Typography>
            <Typography sx={{ fontSize: "0.7rem", color: "#6B7280" }}>{carSearchData?.from} - {formatDate(carSearchData?.pickUpDate)} at {carSearchData?.pickUpTime}</Typography>
          </Box>

          <Box sx={{ mb: 1.5 }}>
            <Typography sx={{ fontSize: "0.75rem", fontWeight: 700, color: "#374151" }}> Drop-off:</Typography>
            <Typography sx={{ fontSize: "0.7rem", color: "#6B7280" }}>{carSearchData?.to} - {formatDate(carSearchData?.dropOffDate)} at {carSearchData?.dropOffTime}</Typography>
          </Box>

          <Typography sx={{ fontSize: "0.75rem", color: "#6B7280", fontWeight: 500 }}>{days} day(s) rental</Typography>
        </Box>
      </Paper>

      <Paper elevation={0} sx={{ borderRadius: 2, border: "1px solid #E5E7EB", overflow: "hidden", width: "100%", mb: 2 }}>
        <Box sx={{ p: 2 }}>
          <Typography sx={{ fontWeight: 700, fontSize: "1rem", mb: 2 }}>Price details</Typography>
          <Divider sx={{ mb: 2 }} />

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1.5 }}>
            <Typography sx={{ fontSize: "0.75rem", color: "#4B5563" }}>Car rental x {days} days</Typography>
            <Typography sx={{ fontSize: "0.75rem", color: "#000", fontWeight: 500 }}>${(selectedCar.price * days).toFixed(2)}</Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography sx={{ fontSize: "0.75rem", color: "#4B5563" }}>Taxes & Fees</Typography>
            <Typography sx={{ fontSize: "0.75rem", color: "#000", fontWeight: 500 }}>$15.00</Typography>
          </Box>

          <Divider sx={{ mb: 2 }} />

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0 }}>
            <Typography sx={{ fontWeight: 800, fontSize: "1.1rem" }}>Total</Typography>
            <Typography sx={{ fontWeight: 800, fontSize: "1.1rem" }}>${(selectedCar.price * days + 15).toFixed(2)}</Typography>
          </Box>
        </Box>
      </Paper>
    </>
  );

  return (
    <Box sx={{ py: 4, bgcolor: "#F9FAFB", minHeight: "100vh" }}>
      <Box sx={{ maxWidth: { xs: "100%", sm: "100%", md: "1100px" }, mx: "auto", px: { xs: 2, md: 4 } }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 4, color: "#111827" }}>Complete your booking</Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            {/* Driver Details Form */}
            <Paper elevation={0} sx={{ p: 3, borderRadius: 2, border: "1px solid #E5E7EB", mb: 3 }}>
              <Typography sx={{ fontWeight: 700, fontSize: "1.1rem", mb: 1 }}>Driver Details</Typography>
              <Typography sx={{ fontSize: "0.75rem", color: "#6B7280", mb: 3 }}>Please enter the details of the primary driver.</Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography sx={{ fontSize: "0.75rem", fontWeight: 600, mb: 0.5 }}>First Name *</Typography>
                  <TextField fullWidth size="small" placeholder="Enter first name" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography sx={{ fontSize: "0.75rem", fontWeight: 600, mb: 0.5 }}>Last Name *</Typography>
                  <TextField fullWidth size="small" placeholder="Enter last name" />
                </Grid>
                <Grid item xs={12}>
                  <Typography sx={{ fontSize: "0.75rem", fontWeight: 600, mb: 0.5 }}>Email Address *</Typography>
                  <TextField fullWidth size="small" placeholder="Enter email address" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography sx={{ fontSize: "0.75rem", fontWeight: 600, mb: 0.5 }}>Phone Number *</Typography>
                  <TextField fullWidth size="small" placeholder="Enter phone number" />
                </Grid>
              </Grid>
            </Paper>

            {/* Payment Info */}
            <Paper elevation={0} sx={{ p: 3, borderRadius: 2, border: "1px solid #E5E7EB", mb: 3 }}>
              <Typography sx={{ fontWeight: 700, fontSize: "1.1rem", mb: 3 }}>Payment Method</Typography>
              
              <RadioGroup defaultValue="card">
                <Box sx={{ border: "1px solid #E5E7EB", borderRadius: 2, p: 2, mb: 2 }}>
                  <FormControlLabel 
                    value="card" 
                    control={<Radio size="small" />} 
                    label={<Typography sx={{ fontWeight: 600, fontSize: "0.9rem" }}>Credit / Debit Card</Typography>} 
                  />
                  <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 2 }}>
                    <TextField fullWidth size="small" label="Cardholder Name" sx={{ mb: 2 }} />
                    <TextField fullWidth size="small" label="Card Number" placeholder="0000 0000 0000 0000" sx={{ mb: 2 }} />
                    <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
                      <TextField size="small" label="Expiry Date" placeholder="MM/YY" sx={{ flex: 1 }} />
                      <TextField size="small" label="CVV" placeholder="123" sx={{ flex: 1 }} />
                    </Box>
                  </Box>
                </Box>
                
                <Box sx={{ border: "1px solid #E5E7EB", borderRadius: 2, p: 2 }}>
                  <FormControlLabel 
                    value="paypal" 
                    control={<Radio size="small" />} 
                    label={<Typography sx={{ fontWeight: 600, fontSize: "0.9rem" }}>PayPal</Typography>} 
                  />
                </Box>
              </RadioGroup>
            </Paper>

            <Button 
              variant="contained" 
              fullWidth 
              size="large"
              sx={{ 
                bgcolor: "#003580", 
                py: 1.5, 
                textTransform: "none", 
                fontWeight: 700,
                fontSize: "1rem",
                "&:hover": { bgcolor: "#002252" }
              }}
            >
              Complete Booking
            </Button>
          </Grid>

          <Grid item xs={12} md={4}>
            <SummaryContent />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
