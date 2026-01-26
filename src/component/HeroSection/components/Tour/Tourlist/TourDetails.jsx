"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Rating,
  Divider,
  IconButton,
  TextField,
  MenuItem,
  CircularProgress,
  Container,
} from "@mui/material";
import {
  LocationOn as LocationIcon,
  AccessTime as DurationIcon,
  Star as StarIcon,
  ChevronLeft as LeftIcon,
  ChevronRight as RightIcon,
  CalendarMonth as CalendarIcon,
  Group as PeopleIcon,
  CheckCircleOutline as CheckIcon,
  CancelOutlined as CancelIcon,
  ArrowBack as BackIcon,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";

export default function TourDetails({ tourId }) {
  const router = useRouter();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [startDate, setStartDate] = useState("2026-01-31");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/tours");
        const data = await response.json();
        const foundTour = data.find((t) => t.id === parseInt(tourId));
        setTour(foundTour);
      } catch (error) {
        console.error("Error fetching tour:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTour();
  }, [tourId]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
        <CircularProgress sx={{ color: "#1A53FF" }} />
      </Box>
    );
  }

  if (!tour) {
    return (
      <Box sx={{ py: 10, textAlign: "center" }}>
        <Typography variant="h5">Tour not found</Typography>
        <Button onClick={() => router.back()} sx={{ mt: 2 }}>Back</Button>
      </Box>
    );
  }

  const images = tour.images || [tour.image];

  return (
    <Box sx={{ 
      maxWidth: { xs: "100%", sm: "100%", md: "820px", lg: "910px" }, 
      mx: "auto", 
      px: { xs: 1.5, sm: 2, md: 3, lg: 3 },
      py: 2 
    }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, md: 4 },
          borderRadius: 4,
          border: "1px solid #E5E7EB",
          bgcolor: "white",
        }}
      >
        <Grid container spacing={4}>
          {/* Main Content Column */}
          <Grid item xs={12} md={8}>
            {/* Header */}
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                <Typography
                  sx={{
                    bgcolor: "#EFF6FF",
                    color: "#1A53FF",
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 1,
                    fontSize: "0.75rem",
                    fontWeight: 700,
                  }}
                >
                  Tour
                </Typography>
                <Rating value={tour.rating} readOnly size="small" precision={0.5} />
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 800, color: "#1F2937", mb: 2 }}>
                {tour.name}
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, color: "#6B7280" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <LocationIcon sx={{ fontSize: 18 }} />
                  <Typography sx={{ fontSize: "0.85rem" }}>{tour.location}</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <DurationIcon sx={{ fontSize: 18 }} />
                  <Typography sx={{ fontSize: "0.85rem" }}>{tour.duration}</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <CalendarIcon sx={{ fontSize: 18 }} />
                  <Typography sx={{ fontSize: "0.85rem" }}>Departure: 31 Jan 2026</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <Typography sx={{ fontSize: "0.85rem", fontWeight: 700, color: "#FBBF24" }}>
                    {tour.rating}
                  </Typography>
                  <Typography sx={{ fontSize: "0.85rem" }}>({tour.reviews} Reviews)</Typography>
                </Box>
              </Box>
            </Box>

            {/* Gallery */}
            <Box sx={{ position: "relative", borderRadius: 3, overflow: "hidden", mb: 4, height: 400 , width:"100%",maxWidth:"80%"}}>
              <Box
                component="img"
                src={images[activeImageIndex]}
                sx={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <IconButton
                onClick={() => setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length)}
                sx={{
                  position: "absolute",
                  left: 16,
                  top: "50%",
                  transform: "translateY(-50%)",
                  bgcolor: "white",
                  "&:hover": { bgcolor: "#f3f4f6" },
                }}
              >
                <LeftIcon />
              </IconButton>
              <IconButton
                onClick={() => setActiveImageIndex((prev) => (prev + 1) % images.length)}
                sx={{
                  position: "absolute",
                  right: 16,
                  top: "50%",
                  transform: "translateY(-50%)",
                  bgcolor: "white",
                  "&:hover": { bgcolor: "#f3f4f6" },
                }}
              >
                <RightIcon />
              </IconButton>
            </Box>

            {/* About Section */}
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>About this tour</Typography>
            <Typography sx={{ color: "#4B5563", lineHeight: 1.8, mb: 4 }}>
              Museu Marítim de Barcelona is one of the top maritime museums in the world. It has
              collections that include large-scale models, figureheads, navigation instruments, and real
              vessels. Its main attraction is a life-size reproduction of the Royal Galley of John of Austria,
              the flagship at the Battle of Lepanto in 1571. The ship is over 60 m long and 6 m wide. The
              museum is located in the Royal Shipyards of Barcelona, a well-preserved example of Gothic
              civil architecture. The museum also has a 1918 schooner, which can be visited when it is in
              port during its opening hours. It is located nearby at Moll Bosch i Alsina in the Port of
              Barcelona.
            </Typography>

            {/* Location Section */}
            {/* <Paper elevation={0} sx={{ border: "1px solid #E5E7EB", borderRadius: 3, p: 3, mb: 4 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                <LocationIcon sx={{ color: "#1A53FF" }} />
                <Typography sx={{ fontWeight: 700 }}>Location</Typography>
              </Box>
              <Box sx={{ 
                height: 300, 
                bgcolor: "#F3F4F6", 
                borderRadius: 2, 
                mb: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden"
              }}>
                <Box 
                  component="img" 
                  src="https://maps.googleapis.com/maps/api/staticmap?center=Barcelona&zoom=13&size=800x400&key=YOUR_API_KEY_HERE" 
                  sx={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(0.5)" }}
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&fit=crop&q=80&w=800&h=400";
                  }}
                />
                <Box sx={{ 
                  position: "absolute", 
                  bgcolor: "white", 
                  p: 1.5, 
                  borderRadius: 2, 
                  bottom: 16, 
                  left: 16,
                  border: "1px solid #E5E7EB",
                  display: "flex",
                  alignItems: "center",
                  gap: 1
                }}>
                  <LocationIcon sx={{ fontSize: 16, color: "#1A53FF" }} />
                  <Typography sx={{ fontSize: "0.75rem", color: "#6B7280" }}>
                    Barcelona Maritime Museum, Av. de les Drassanes, s/n, Ciutat Vella, 08001 Barcelona, Spain
                  </Typography>
                </Box>
              </Box>
            </Paper> */}

            {/* Included / Excluded Section */}
            {/* <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Paper elevation={0} sx={{ border: "1px solid #E5E7EB", borderRadius: 3, p: 2 }}>
                  <Typography sx={{ fontWeight: 700, mb: 2 }}>What's Included</Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                    {tour.amenities.map((item, idx) => (
                      <Box key={idx} sx={{ display: "flex", alignItems: "center", gap: 1, color: "#4B5563" }}>
                        <CheckIcon sx={{ fontSize: 18, color: "#059669" }} />
                        <Typography sx={{ fontSize: "0.85rem" }}>{item}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper elevation={0} sx={{ border: "1px solid #E5E7EB", borderRadius: 3, p: 2 }}>
                  <Typography sx={{ fontWeight: 700, mb: 2 }}>What's Excluded</Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "#4B5563" }}>
                    <CancelIcon sx={{ fontSize: 18, color: "#DC2626" }} />
                    <Typography sx={{ fontSize: "0.85rem" }}>Guided tour</Typography>
                  </Box>
                </Paper>
              </Grid>
            </Grid> */}
          </Grid>

          {/* Sidebar Column */}
          {/* <Grid item xs={12} md={4}>
            <Box sx={{ position: "sticky", top: 24 }}>
              <Paper
                elevation={0}
                sx={{
                  bgcolor: "#1E293B",
                  color: "white",
                  p: 3,
                  borderRadius: 3,
                  border: "1px solid #334155",
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>From USD {tour.price.toFixed(2)}</Typography>
                
                <Box sx={{ mb: 3 }}>
                  <Typography sx={{ fontSize: "0.75rem", fontWeight: 700, mb: 1, color: "#94A3B8" }}>
                    Start Date
                  </Typography>
                  <TextField
                    fullWidth
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    sx={{
                      bgcolor: "#334155",
                      borderRadius: 1.5,
                      "& .MuiOutlinedInput-root": {
                        color: "white",
                        "& fieldset": { borderColor: "transparent" },
                        "&:hover fieldset": { borderColor: "transparent" },
                        "&.Mui-focused fieldset": { borderColor: "#1A53FF" },
                      },
                      "& .MuiInputBase-input": { py: 1.5 },
                    }}
                  />
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                  <Box>
                    <Typography sx={{ fontWeight: 700, fontSize: "0.85rem" }}>Adults</Typography>
                    <Typography sx={{ fontSize: "0.7rem", color: "#94A3B8" }}>Age 18+</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Typography sx={{ fontSize: "0.75rem", color: "#94A3B8" }}>Price USD {tour.price.toFixed(2)}</Typography>
                    <TextField
                      select
                      size="small"
                      value={adults}
                      onChange={(e) => setAdults(e.target.value)}
                      sx={{
                        width: 70,
                        bgcolor: "#334155",
                        borderRadius: 1,
                        "& .MuiOutlinedInput-root": { color: "white", "& fieldset": { border: "none" } },
                      }}
                    >
                      {[1, 2, 3, 4, 5].map((num) => (
                        <MenuItem key={num} value={num}>{num}</MenuItem>
                      ))}
                    </TextField>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
                  <Box>
                    <Typography sx={{ fontWeight: 700, fontSize: "0.85rem" }}>Children</Typography>
                    <Typography sx={{ fontSize: "0.7rem", color: "#94A3B8" }}>Age 2-17</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Typography sx={{ fontSize: "0.75rem", color: "#94A3B8" }}>Price USD {(tour.price * 0.8).toFixed(2)}</Typography>
                    <TextField
                      select
                      size="small"
                      value={children}
                      onChange={(e) => setChildren(e.target.value)}
                      sx={{
                        width: 70,
                        bgcolor: "#334155",
                        borderRadius: 1,
                        "& .MuiOutlinedInput-root": { color: "white", "& fieldset": { border: "none" } },
                      }}
                    >
                      {[0, 1, 2, 3, 4].map((num) => (
                        <MenuItem key={num} value={num}>{num}</MenuItem>
                      ))}
                    </TextField>
                  </Box>
                </Box>

                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<CalendarIcon />}
                  sx={{
                    bgcolor: "#1A53FF",
                    "&:hover": { bgcolor: "#0040FF" },
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 700,
                    fontSize: "1rem",
                    mb: 3,
                  }}
                >
                  Book Now
                </Button>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
                    <CheckIcon sx={{ color: "#059669", fontSize: 20, mt: 0.3 }} />
                    <Box>
                      <Typography sx={{ fontWeight: 700, fontSize: "0.85rem" }}>Reserve Now, Pay Later</Typography>
                      <Typography sx={{ fontSize: "0.7rem", color: "#94A3B8" }}>
                        Secure your spot with a flexible reservation
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Box sx={{ width: 20, height: 20, borderRadius: "50%", border: "1px solid #94A3B8", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Typography sx={{ fontSize: "0.6rem", fontWeight: 700 }}>$</Typography>
                    </Box>
                    <Typography sx={{ fontSize: "0.7rem", color: "#94A3B8" }}>Free cancellation available</Typography>
                  </Box>
                </Box>
              </Paper>
            </Box>
          </Grid> */}
        </Grid>
      </Paper>
    </Box>
  );
}
