"use client";

import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Button, 
  Rating, 
  Chip, 
  Divider,
  CircularProgress,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
  Radio,
  RadioGroup,
  FormControlLabel,
  Card,
  CardContent
} from "@mui/material";
import { 
  ArrowBack as BackIcon,
  LocationOn as LocationIcon,
  Wifi as WifiIcon,
  Pool as PoolIcon,
  LocalParking as ParkingIcon,
  Coffee as BreakfastIcon,
  Tv as TvIcon,
  AirplanemodeActive as ShuttleIcon,
  Check as CheckIcon,
  ChevronLeft as LeftIcon,
  ChevronRight as RightIcon,
  Star as StarIcon,
  ThumbUp as ThumbUpIcon,
  CalendarMonth as CalendarIcon,
  People as PeopleIcon,
  Bed as BedIcon,
  SquareFoot as SquareFootIcon,
  InfoOutlined as InfoIcon,
  CheckCircleOutline as VerifiedIcon,
  KingBed as KingBedIcon,
  Hotel as SingleBedIcon
} from "@mui/icons-material";
import TravellersDropDown from "../../TravellersDropDown";
import HotelBooking from "./HotelBooking";
import { useState, useEffect, useRef } from "react";

export default function HotelDetails({ hotel, isLoading, onBack, onViewChange }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [galleryImages, setGalleryImages] = useState([]);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [travellers, setTravellers] = useState({ adults: 2, children: 0, rooms: 1 });
  const [selectedFilter, setSelectedFilter] = useState("All rooms");
  const [activeTab, setActiveTab] = useState("Overview");
  const [view, setView] = useState("details");
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    if (onViewChange) {
      onViewChange(view);
    }
  }, [view, onViewChange]);

  // Refs for smooth navigation
  const overviewRef = useRef(null);
  const aboutRef = useRef(null);
  const roomsRef = useRef(null);
  const policyRef = useRef(null);

  const handleTabClick = (tab, ref) => {
    setActiveTab(tab);
    if (ref.current) {
      const offset = 100; // Offset to account for sticky headers if any
      const elementPosition = ref.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };
  const [rooms, setRooms] = useState([]);
  const [roomsLoading, setRoomsLoading] = useState(true);

  const checkInDateRef = useRef(null);
  const checkOutDateRef = useRef(null);

  useEffect(() => {
    if (hotel) {
      setGalleryImages(hotel.images || [hotel.image]);
    }
  }, [hotel]);

  // Set initial dates
  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    setCheckIn(today.toISOString().split("T")[0]);
    setCheckOut(tomorrow.toISOString().split("T")[0]);
  }, []);

  // Update check-out date if check-in date changes to be after it
  useEffect(() => {
    if (checkIn && checkOut) {
      if (checkOut < checkIn) {
        setCheckOut(checkIn);
      }
    }
  }, [checkIn]);

  useEffect(() => {
    const fetchRooms = async () => {
      if (!hotel?.id) return;
      try {
        setRoomsLoading(true);
        const response = await fetch(`/api/hotels/rooms?hotelId=${hotel.id}`);
        const data = await response.json();
        setRooms(data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      } finally {
        setRoomsLoading(false);
      }
    };
    fetchRooms();
  }, [hotel?.id]);

  const getAmenityIcon = (type) => {
    switch (type) {
      case "parking": return <ParkingIcon sx={{ fontSize: 18, color: "#059669" }} />;
      case "size": return <SquareFootIcon sx={{ fontSize: 18, color: "#374151" }} />;
      case "sleeps": return <PeopleIcon sx={{ fontSize: 18, color: "#374151" }} />;
      case "beds": return <SingleBedIcon sx={{ fontSize: 18, color: "#374151" }} />;
      case "payment": return <CheckIcon sx={{ fontSize: 18, color: "#374151" }} />;
      case "wifi": return <WifiIcon sx={{ fontSize: 18, color: "#374151" }} />;
      case "room": return <BedIcon sx={{ fontSize: 18, color: "#374151" }} />;
      default: return <InfoIcon sx={{ fontSize: 18, color: "#374151" }} />;
    }
  };

  const RoomCard = ({ room }) => {
    const [selectedExtra, setSelectedExtra] = useState("no_extras");
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    const handleNextImage = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setActiveImageIndex((prev) => (prev + 1) % room.images.length);
    };

    const handlePrevImage = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setActiveImageIndex((prev) => (prev - 1 + room.images.length) % room.images.length);
    };

    return (
      <Card sx={{ 
        height: "100%", 
        width: "100%",
        display: "flex", 
        flexDirection: "column",
        borderRadius: 3,
        border: "1px solid #E5E7EB",
        boxShadow: "none",
        overflow: "hidden"
      }}>
        {/* Image Section with Carousel */}
        <Box sx={{ position: "relative", height: 180 }}>
          <Box
            component="img"
            src={room.images[activeImageIndex]}
            alt={room.name}
            sx={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          
          {room.images.length > 1 && (
            <>
              <IconButton
                onClick={handlePrevImage}
                sx={{
                  position: "absolute",
                  left: 8,
                  top: "50%",
                  transform: "translateY(-50%)",
                  bgcolor: "white",
                  color: "#1F2937",
                  width: 24,
                  height: 24,
                  "&:hover": { bgcolor: "#f3f4f6" },
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                }}
              >
                <LeftIcon sx={{ fontSize: 18 }} />
              </IconButton>
              <IconButton
                onClick={handleNextImage}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: "50%",
                  transform: "translateY(-50%)",
                  bgcolor: "white",
                  color: "#1F2937",
                  width: 24,
                  height: 24,
                  "&:hover": { bgcolor: "#f3f4f6" },
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                }}
              >
                <RightIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </>
          )}

          <Box sx={{ 
            position: "absolute", 
            bottom: 12, 
            right: 12,
            bgcolor: "rgba(0, 0, 0, 0.6)",
            color: "white",
            px: 1,
            py: 0.3,
            borderRadius: 1.5,
            display: "flex",
            alignItems: "center",
            gap: 0.5
          }}>
            <TvIcon sx={{ fontSize: 14 }} />
            <Typography sx={{ fontSize: "0.75rem", fontWeight: 700 }}>{room.images.length}</Typography>
          </Box>
        </Box>

        {/* Content Section */}
        <CardContent sx={{ p: 2, flexGrow: 1, display: "flex", flexDirection: "column" }}>
          <Typography sx={{ fontWeight: 700, fontSize: "0.95rem", mb: 1, color: "#1F2937", lineHeight: 1.3 }}>
            {room.name}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <Box sx={{ 
              bgcolor: "#006837", 
              color: "white", 
              px: 0.6, 
              py: 0.1, 
              borderRadius: 0.8, 
              fontSize: "0.7rem", 
              fontWeight: 800 
            }}>
              {room.rating.toFixed(1)}
            </Box>
            <Typography sx={{ fontSize: "0.75rem", fontWeight: 700, color: "#1F2937" }}>
              {room.ratingLabel || "Very good"}
            </Typography>
            <Typography sx={{ fontSize: "0.75rem", color: "#6B7280" }}>
              {room.reviewsCount} review{room.reviewsCount !== 1 ? 's' : ''}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 2.5 }}>
            {room.amenities.map((amenity, idx) => (
              <Box key={idx} sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Box sx={{ display: "flex" }}>
                  {getAmenityIcon(amenity.type)}
                </Box>
                <Typography sx={{ 
                  fontSize: "0.8rem", 
                  color: amenity.type === "parking" ? "#059669" : "#374151",
                  fontWeight: amenity.type === "parking" ? 600 : 400
                }}>
                  {amenity.text}
                </Typography>
              </Box>
            ))}
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography sx={{ fontSize: "0.8rem", color: "#059669", fontWeight: 600, display: "flex", alignItems: "center", gap: 0.5 }}>
              {room.refundability} <InfoIcon sx={{ fontSize: 14 }} />
            </Typography>
            <Typography sx={{ fontSize: "0.75rem", color: "#6B7280", mt: 0.1 }}>
              {room.refundableUntil}
            </Typography>
          </Box>

          <Typography 
            component="a" 
            href="#" 
            sx={{ 
              display: "flex", 
              alignItems: "center", 
              gap: 0.5, 
              fontSize: "0.8rem", 
              color: "#1A53FF", 
              textDecoration: "none",
              fontWeight: 600,
              mb: 3
            }}
          >
            More details <RightIcon sx={{ fontSize: 16 }} />
          </Typography>

          <Divider sx={{ mx: -2, mb: 2 }} />

          {/* Extras */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
              <Typography sx={{ fontSize: "0.8rem", fontWeight: 700 }}>Extras</Typography>
              <Typography sx={{ fontSize: "0.7rem", color: "#6B7280" }}>per night</Typography>
            </Box>
            <RadioGroup
              value={selectedExtra}
              onChange={(e) => setSelectedExtra(e.target.value)}
            >
              {room.extras.map((extra) => (
                <Box key={extra.id} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <FormControlLabel
                    value={extra.id}
                    control={<Radio size="small" sx={{ 
                      p: 0.5, 
                      color: "#D1D5DB",
                      '&.Mui-checked': { color: "#004CB0" }
                    }} />}
                    label={<Typography sx={{ fontSize: "0.8rem", color: "#374151" }}>{extra.name}</Typography>}
                    sx={{ m: 0 }}
                  />
                  <Typography sx={{ fontSize: "0.8rem", color: "#374151", fontWeight: 500 }}>
                    + ${extra.price}
                  </Typography>
                </Box>
              ))}
            </RadioGroup>
          </Box>

          <Box sx={{ mt: "auto" }}>
            {/* Price Section */}
            <Box sx={{ textAlign: "right", mb: 2 }}>
              <Typography sx={{ fontSize: "0.85rem", fontWeight: 500, color: "#1F2937" }}>
                ${room.priceNightly} nightly
              </Typography>
              <Typography sx={{ fontSize: "1.2rem", fontWeight: 800, color: "#1F2937", lineHeight: 1.2 }}>
                ${room.priceTotal.toLocaleString()} total
              </Typography>
              <Typography sx={{ 
                fontSize: "0.65rem", 
                color: "#059669", 
                fontWeight: 600, 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "flex-end", 
                gap: 0.5,
                mt: 0.5
              }}>
                 <CheckIcon sx={{ fontSize: 12 }} /> Total with taxes and fees
              </Typography>
            </Box>

            {room.leftCount && (
              <Typography sx={{ fontSize: "0.75rem", color: "#DC2626", fontWeight: 700, mb: 1 }}>
                We have {room.leftCount} left
              </Typography>
            )}

            <Button 
              variant="contained" 
              fullWidth
              onClick={() => {
                setSelectedRoom(room);
                setView("booking");
                window.scrollTo(0, 0);
              }}
              sx={{ 
                bgcolor: "#004CB0", 
                borderRadius: 2, 
                py: 1.2, 
                fontSize: "0.9rem", 
                fontWeight: 700,
                textTransform: "none",
                mb: 1.5,
                boxShadow: "none",
                "&:hover": { bgcolor: "#003a8c", boxShadow: "none" }
              }}
            >
              Reserve
            </Button>
            <Typography sx={{ fontSize: "0.7rem", color: "#6B7280", textAlign: "center" }}>
              You will not be charged yet
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );
  };

  const handleDateInputClick = (ref) => {
    if (ref.current) {
      ref.current.showPicker();
    }
  };

  const handleImageSwap = (index) => {
    const newImages = [...galleryImages];
    const temp = newImages[0];
    newImages[0] = newImages[index];
    newImages[index] = temp;
    setGalleryImages(newImages);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress sx={{ color: "#1A53FF" }} />
      </Box>
    );
  }

  if (!hotel) {
    return (
      <Box sx={{ py: 4, textAlign: "center" }}>
        <Typography variant="h6" color="text.secondary">Hotel not found</Typography>
        <Button onClick={onBack} sx={{ mt: 2, color: "#1A53FF" }}>Back to results</Button>
      </Box>
    );
  }

  const images = hotel.images || [hotel.image];

  const handleNext = () => setCurrentImageIndex((prev) => (prev + 1) % images.length);
  const handlePrev = () => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);

  if (view === "booking") {
    return (
      <HotelBooking 
        hotel={hotel}
        room={selectedRoom}
        travellers={travellers}
        checkIn={checkIn}
        checkOut={checkOut}
        onBack={() => setView("details")}
      />
    );
  }

  return (
    <Box sx={{ pb: 4 }}>
      {/* Back Button */}
      <Button
        startIcon={<BackIcon />}
        onClick={onBack}
        sx={{ 
          mb: 1, 
          textTransform: "none", 
          color: "#6B7280",
          "&:hover": { color: "#1A53FF", bgcolor: "transparent" }
        }}
      >
        Back to search results
      </Button>

      <Paper 
        elevation={0} 
        sx={{ 
          p: { xs: 2, md: 3 }, 
          borderRadius: 3, 
          border: "1px solid #E5E7EB",
          bgcolor: "white"
        }}
      >
        <Grid container spacing={2}>      
          {/* Gallery Section - Main image with small images to the right */}
          <Grid item xs={12}>
            <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 2 }}>
              {/* Main Large Image */}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Box 
                  sx={{ 
                    position: "relative", 
                    borderRadius: 2, 
                    overflow: "hidden", 
                    height: { xs: 300, sm: 200, md: 400, lg: 300 },
                    width: "100%",
                    cursor: "pointer",
                    "&:hover img": { transform: "scale(1.02)" }
                  }}
                >
                  <Box 
                    component="img"
                    src={galleryImages[0]}
                    alt={`${hotel.name} main`}
                    sx={{ 
                      width: "100%", 
                      height: "100%", 
                      objectFit: "cover",
                      transition: "transform 0.5s ease"
                    }}
                  />
                </Box>
              </Box>

              {/* Small Images Container to the right */}
              <Box sx={{ 
                flex: 1, 
                minWidth: 0,
                display: "flex", 
                flexDirection: "column",
                gap: 1
              }}>
                <Box sx={{ 
                  display: "flex", 
                  flexWrap: "wrap", 
                  gap: 1,
                  height: "100%"
                }}>
                  {galleryImages.slice(1, 5).map((img, idx) => (
                    <Box 
                      key={idx}
                      onClick={() => handleImageSwap(idx + 1)}
                      sx={{ 
                        flex: "1 1 calc(50% - 8px)",
                        minWidth: "calc(50% - 8px)",
                        height: { xs: 146, sm: 96, md: 196, lg: 146 }, // (MainHeight - 8px gap) / 2
                        borderRadius: 2, 
                        overflow: "hidden",
                        position: "relative",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        "&:hover": { 
                          boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                          "& img": { transform: "scale(1.08)" }
                        }
                      }}
                    >
                      <Box 
                        component="img"
                        src={img}
                        alt={`${hotel.name} gallery ${idx + 2}`}
                        sx={{ 
                          width: "100%", 
                          height: "100%", 
                          objectFit: "cover",
                          transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
                        }}
                      />
                      {idx === 3 && galleryImages.length > 5 && (
                        <Box 
                          sx={{ 
                            position: "absolute", 
                            inset: 0, 
                            bgcolor: "rgba(0,0,0,0.5)", 
                            display: "flex", 
                            alignItems: "center", 
                            justifyContent: "center",
                            color: "white",
                            backdropFilter: "blur(2px)",
                            transition: "all 0.3s ease",
                            "&:hover": { bgcolor: "rgba(0,0,0,0.4)" }
                          }}
                        >
                          <Box sx={{ textAlign: "center" }}>
                            <Typography variant="h6" sx={{ fontWeight: 800, fontSize: "1.25rem" }}>
                              +{galleryImages.length - 5}
                            </Typography>
                            <Typography variant="caption" sx={{ fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>Photos</Typography>
                          </Box>
                        </Box>
                      )}
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Navigation Tabs */}
          <Grid item xs={12}>
            <Box sx={{ 
              borderBottom: 1, 
              borderColor: "divider", 
              mb: 3,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: {xs: 10, sm: 20, md: 30, lg: 50, xl: 50}
            }}>
              <Box sx={{ display: "flex", gap: 3}}>
                {[
                  { label: "Overview", ref: overviewRef },
                  { label: "About", ref: aboutRef },
                  { label: "Rooms", ref: roomsRef },
                  { label: "Accessibility", ref: null },
                  { label: "Policies", ref: policyRef }
                ].map((tab) => (
                  <Box 
                    key={tab.label}
                    onClick={() => tab.ref && handleTabClick(tab.label, tab.ref)}
                    sx={{ 
                      py: 1.5, 
                      cursor: tab.ref ? "pointer" : "default",
                      borderBottom: 2,
                      borderColor: activeTab === tab.label ? "#1A53FF" : "transparent",
                      color: activeTab === tab.label ? "#1A53FF" : "#4B5563",
                      fontWeight: 500,
                      fontSize: "0.7rem",
                      "&:hover": { color: tab.ref ? "#1A53FF" : "#4B5563" }
                    }}
                  >
                    {tab.label}
                  </Box>
                ))}
              </Box>
              <Button 
                variant="contained" 
                onClick={() => handleTabClick("Rooms", roomsRef)}
                sx={{ 
                  bgcolor: "#004CB0",
                  borderRadius: 50,
                  textTransform: "none",
                  fontSize: "0.7rem",
                  fontWeight: 500,
                  boxShadow: "none",
                  "&:hover": { 
                    bgcolor: "#003d8f",
                    boxShadow: "none"
                  }
                }}
              >
                Select a room
              </Button>
            </Box>
          </Grid>

        

          {/* Main Content Area - Two Column Layout */}
          <Grid container item xs={12} spacing={29}>
            {/* Left Column - Overview Content */}
            <Grid item xs={12} md={9} ref={overviewRef}>
              <Box>
                {/* Title and Rating */}
                <Typography sx={{ 
                  fontWeight: 700, 
                  color: "#1F2937", 
                  mb: 0.5,
                  fontSize: { xs: "1rem", md: "1.2rem", lg: "1.5rem" }
                }}>
                  {hotel.name}
                </Typography>
                
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 1 }}>
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} sx={{ color: "#374151", fontSize: 14 }} />
                  ))}
                </Box>

                {/* Badges */}
                <Box sx={{ display: "flex", gap: 2, mb: 1, flexWrap: "wrap" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CheckIcon sx={{ color: "#059669", fontSize: 14 }} />
                    <Typography sx={{ color: "#059669", fontWeight: 500, fontSize: "0.7rem" }}>Fully refundable</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CheckIcon sx={{ color: "#059669", fontSize: 14 }} />
                    <Typography sx={{ color: "#059669", fontWeight: 500, fontSize: "0.7rem" }}>Reserve now, pay later</Typography>
                  </Box>
                </Box>

                {/* Score Box */}
                <Box sx={{ display: "flex", alignItems: "baseline", gap: 1, mb: 0.5 }}>
                  <Box sx={{ 
                    bgcolor: "#abb2beff", 
                    color: "#000", 
                    px: 0.5,
                    py: 0.3,
                    borderRadius: 1,
                    fontWeight: 500, fontSize: "0.7rem"
                  }}>
                    {hotel.rating?.toFixed(1) || "7.2"}
                  </Box>
                  <Typography sx={{ fontWeight: 500, fontSize: "1rem" }}>Good</Typography>
                </Box>
                <Typography 
                  component="a" 
                  href="#" 
                  sx={{ 
                    color: "#1A53FF", 
                    textDecoration: "none", 
                    fontWeight: 500,
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    mb: 3,
                    fontSize: "0.7rem",
                    "&:hover": { textDecoration: "underline" }
                  }}
                >
                  See all 1,002 reviews <RightIcon sx={{ fontSize: 14 }} />
                </Typography>

                {/* Highlights Section */}
                <Box>
                  <Typography sx={{ fontWeight: 600, mb: 2, fontSize: "1rem" }}>
                    Highlights for your 1-night trip
                  </Typography>
                  
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    {/* Item 1 */}
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <Box sx={{ 
                        minWidth: 40, 
                        height: 40, 
                        bgcolor: "#F3F4F6", 
                        borderRadius: "50%", 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center" 
                      }}>
                        <BreakfastIcon sx={{ color: "#374151", fontSize: 20 }} />
                      </Box>
                      <Box>
                        <Typography sx={{ fontWeight: 600, color: "#1F2937", fontSize: "0.8rem" }}>Top rated breakfast</Typography>
                        <Typography variant="body2" sx={{ color: "#4B5563", fontSize: "0.6rem" }}>
                          Experience delightful mornings with the top rated breakfast.
                        </Typography>
                      </Box>
                    </Box>

                    {/* Item 2 */}
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <Box sx={{ 
                        minWidth: 40, 
                        height: 40, 
                        bgcolor: "#F3F4F6", 
                        borderRadius: "50%", 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center" 
                      }}>
                        <ShuttleIcon sx={{ color: "#374151", fontSize: 20, transform: "rotate(45deg)" }} />
                      </Box>
                      <Box>
                        <Typography sx={{ fontWeight: 600, color: "#1F2937", fontSize: "0.8rem" }}>Airport shuttle</Typography>
                        <Typography variant="body2" sx={{ color: "#4B5563", fontSize: "0.6rem" }}>
                          A rare find - convenient airport shuttle service for easy travel.
                        </Typography>
                      </Box>
                    </Box>

                    {/* Item 3 */}
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <Box sx={{ 
                        minWidth: 40, 
                        height: 40, 
                        bgcolor: "#F3F4F6", 
                        borderRadius: "50%", 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center" 
                      }}>
                        <ThumbUpIcon sx={{ color: "#374151", fontSize: 20 }} />
                      </Box>
                      <Box>
                        <Typography sx={{ fontWeight: 600, color: "#1F2937", fontSize: "0.8rem" }}>Easy to get around</Typography>
                        <Typography variant="body2" sx={{ color: "#4B5563", fontSize: "0.6rem" }}>
                          Guests love the convenient spot for exploring the area.
                        </Typography>
                      </Box>
                    </Box>

                    {/* Item 4 */}
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <Box sx={{ 
                        minWidth: 40, 
                        height: 40, 
                        bgcolor: "#F3F4F6", 
                        borderRadius: "50%", 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center" 
                      }}>
                        <LocationIcon sx={{ color: "#374151", fontSize: 20 }} />
                      </Box>
                      <Box>
                        <Typography sx={{ fontWeight: 600, color: "#1F2937", fontSize: "0.8rem" }}>Discover nearby landmarks</Typography>
                        <Typography variant="body2" sx={{ color: "#4B5563", fontSize: "0.6rem" }}>
                          Close to Prophet's Mosque
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>

            {/* Right Column - Explore Area Sidebar */}
            <Grid item xs={12} md={3}>
              <Box sx={{ 
                position: "sticky", 
                top: 20,
                bgcolor: "#F9FAFB",
                p: 2,
                borderRadius: 2,
                ml: "auto",
                maxWidth: "100%"
              }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, fontSize: "1rem" }}>Explore the area</Typography>
                
                {/* Map Placeholder */}
                <Box sx={{ 
                  width: "100%", 
                  height: 180, 
                  bgcolor: "#E5E7EB", 
                  borderRadius: 2, 
                  mb: 2,
                  backgroundImage: "linear-gradient(45deg, #E5E7EB 25%, #D1D5DB 25%, #D1D5DB 50%, #E5E7EB 50%, #E5E7EB 75%, #D1D5DB 75%, #D1D5DB 100%)",
                  backgroundSize: "20px 20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid #D1D5DB",
                  position: "relative"
                }}>
                  {/* Location Pin */}
                  <Box sx={{ 
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 30,
                    height: 30,
                    bgcolor: "#DC2626",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "2px solid white",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
                  }}>
                    <LocationIcon sx={{ color: "white", fontSize: 16 }} />
                  </Box>
                  
                  {/* Fallback if no image */}
                  <Box sx={{ textAlign: "center", p: 2, bgcolor: "rgba(255,255,255,0.9)", borderRadius: 1 }}>
                    <Typography variant="caption" sx={{ display: "block", mb: 0.5, fontWeight: 600 }}>Hotel Location</Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.7rem" }}>Central Zone, Madinah</Typography>
                  </Box>
                </Box>
                
                <Box sx={{ mb: 3 }}>
                  <Typography sx={{ fontSize: "0.7rem", color: "#374151" }}>
                    Central Zone, P.O. Box 41340, Madinah, 41340
                  </Typography>
                  <Typography 
                    component="a" 
                    href="#" 
                    sx={{ 
                      color: "#1A53FF", 
                      textDecoration: "none", 
                      fontSize: "0.6rem",
                      fontWeight: 500,
                      display: "flex", 
                      alignItems: "center",
                      gap: 0.5,
                      mt: 0.5
                    }}
                  >
                    View in a map <RightIcon sx={{ fontSize: 12 }} />
                  </Typography>
                </Box>

                {/* Landmarks List */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                  {[
                    { name: "Prophet's Mosque", dist: "0.5 km" },
                    { name: "The Green Dome", dist: "0.6 km" },
                    { name: "Al-Baqi Cemetery", dist: "0.8 km" },
                    { name: "Madinah Airport", dist: "15 km", icon: <ShuttleIcon sx={{ fontSize: 14, transform: "rotate(45deg)" }} /> }
                  ].map((item, idx) => (
                    <Box key={idx} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <LocationIcon sx={{ fontSize: 14, color: "#374151" }} />
                        <Typography variant="body2" sx={{ color: "#374151", fontSize: "0.7rem" }}>{item.name}</Typography>
                      </Box>
                      <Typography variant="caption" sx={{ color: "#6B7280", fontSize: "0.7rem" }}>{item.dist}</Typography>
                    </Box>
                  ))}
                </Box>
                
                <Typography 
                  component="a" 
                  href="#" 
                  sx={{ 
                    color: "#1A53FF", 
                    textDecoration: "none", 
                    fontSize: "0.7rem",
                    fontWeight: 500,
                    display: "flex", 
                    alignItems: "center",
                    gap: 0.5,
                    mt: 3
                  }}
                >
                  See all about this area <RightIcon sx={{ fontSize: 12 }} />
                </Typography>
              </Box>
              
            </Grid>
            
          </Grid>
          
        </Grid>
          {/* About this property Section */}
          <Grid item xs={12} ref={aboutRef}>
            <Box sx={{ 
              bgcolor: "white",
              borderRadius: 2
            }}>
              <Typography sx={{ 
                fontWeight: 700, 
                fontSize: "1.1rem",
                color: "#1F2937",
                mb: 1
              }}>
                About this property
              </Typography>
              
              <Typography sx={{ 
                fontSize: "0.875rem",
                color: "#4B5563",
                mb: 3
              }}>
                4-star hotel near shopping mall
              </Typography>

              {/* Amenities Grid */}
              <Grid container spacing={3} sx={{ mb: 2 }}>
                {/* Left Column */}
                <Grid item xs={12} md={6}>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {/* Local cuisine breakfast */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <BreakfastIcon sx={{ color: "#1F2937", fontSize: 20 }} />
                      <Typography sx={{ fontSize: "0.8rem", color: "#1F2937" }}>
                        Local cuisine breakfast available
                      </Typography>
                    </Box>

                    {/* Shuttle available */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <ShuttleIcon sx={{ color: "#1F2937", fontSize: 20, transform: "rotate(45deg)" }} />
                      <Typography sx={{ fontSize: "0.8rem", color: "#1F2937" }}>
                        Shuttle available
                      </Typography>
                    </Box>

                    {/* Free WiFi */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <WifiIcon sx={{ color: "#1F2937", fontSize: 20 }} />
                      <Typography sx={{ fontSize: "0.8rem", color: "#1F2937" }}>
                        Free WiFi
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                {/* Right Column */}
                <Grid item xs={12} md={6}>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {/* Self-parking included */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <ParkingIcon sx={{ color: "#1F2937", fontSize: 20 }} />
                      <Typography sx={{ fontSize: "0.8rem", color: "#1F2937" }}>
                        Self-parking included
                      </Typography>
                    </Box>

                    {/* 2 restaurants */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <BreakfastIcon sx={{ color: "#1F2937", fontSize: 20 }} />
                      <Typography sx={{ fontSize: "0.8rem", color: "#1F2937" }}>
                        2 restaurants
                      </Typography>
                    </Box>

                    {/* 24-hour fitness center */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <BreakfastIcon sx={{ color: "#1F2937", fontSize: 20 }} />
                      <Typography sx={{ fontSize: "0.8rem", color: "#1F2937" }}>
                        24-hour fitness center
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>

              {/* See all link */}
              <Typography 
                component="a" 
                href="#" 
                sx={{ 
                  color: "#1A53FF", 
                  textDecoration: "none", 
                  fontSize: "0.7rem",
                  fontWeight: 500,
                  display: "inline-flex", 
                  alignItems: "center",
                  gap: 0.5,
                  mt: 1,
                  "&:hover": { textDecoration: "underline" }
                }}
              >
                See all about this property <RightIcon sx={{ fontSize: 16 }} />
              </Typography>
            </Box>
          </Grid>

          {/* Choose your room Section */}
          <Grid item xs={12} sx={{ mt: 4 }} ref={roomsRef}>
            <Typography sx={{ 
              fontWeight: 700, 
              fontSize: "1.2rem", 
              color: "#1F2937", 
              mb: 2 
            }}>
              Choose your room
            </Typography>

            {/* Selection Bar */}
            <Box sx={{ 
              display: "flex", 
              flexDirection: { xs: "column", md: "row" }, 
              gap: 2, 
              mb: 3 
            }}>
              {/* Start Date */}
              <Box sx={{ flex: 1 }}>
                <FormControl fullWidth variant="outlined" size="small">
                  <InputLabel shrink sx={{ fontSize: "12px", color: "#6B7280", top: "13px", fontWeight: 600 }}>
                    Start date
                  </InputLabel>
                  <OutlinedInput
                    type="date"
                    value={checkIn}
                    onChange={(e) => {
                      setCheckIn(e.target.value);
                      setTimeout(() => {
                        if (checkOutDateRef.current) {
                          checkOutDateRef.current.showPicker();
                        }
                      }, 100);
                    }}
                    inputRef={checkInDateRef}
                    onClick={() => handleDateInputClick(checkInDateRef)}
                    inputProps={{
                      min: new Date().toISOString().split("T")[0]
                    }}
                    sx={{
                      height: 52,
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      color: "#1F2937",
                      cursor: "pointer",
                      pt: "15px",
                      borderRadius: 2,
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#D1D5DB",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#1A53FF",
                      },
                      "& input::-webkit-calendar-picker-indicator": {
                        display: "none",
                      }
                    }}
                  />
                </FormControl>
              </Box>

              {/* End Date */}
              <Box sx={{ flex: 1 }}>
                <FormControl fullWidth variant="outlined" size="small">
                  <InputLabel shrink sx={{ fontSize: "12px", color: "#6B7280", top: "13px", fontWeight: 600 }}>
                    End date
                  </InputLabel>
                  <OutlinedInput
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    inputRef={checkOutDateRef}
                    onClick={() => handleDateInputClick(checkOutDateRef)}
                    inputProps={{
                      min: checkIn || new Date().toISOString().split("T")[0]
                    }}
                    sx={{
                      height: 52,
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      color: "#1F2937",
                      cursor: "pointer",
                      pt: "15px",
                      borderRadius: 2,
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#D1D5DB",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#1A53FF",
                      },
                      "& input::-webkit-calendar-picker-indicator": {
                        display: "none",
                      }
                    }}
                  />
                </FormControl>
              </Box>

              {/* Travelers */}
              <Box sx={{ flex: { xs: 1, md: 2 } }}>
                <Box sx={{ 
                   border: "1px solid #D1D5DB", 
                   borderRadius: 2, 
                   height: 52,
                   display: "flex",
                   alignItems: "center",
                   px: 0.5,
                   "&:hover": { borderColor: "#1A53FF" }
                }}>
                  <TravellersDropDown 
                    mode="hotel"
                    travellers={travellers}
                    onTravellersChange={(newVal) => setTravellers(newVal)}
                    sx={{ 
                      height: "100%", 
                      border: 'none', 
                      "&:hover": { border: 'none' },
                      "&.Mui-focused": { border: 'none' }
                    }}
                  />
                </Box>
              </Box>
            </Box>

            {/* Filter Chips Horizontal Scroll */}
            {(() => {
              const getBedCount = (room) => {
                const bedsAmenity = room.amenities.find(a => a.type === "beds");
                if (!bedsAmenity) return 0;
                const numbers = bedsAmenity.text.match(/\d+/g);
                if (!numbers) return 1;
                return numbers.reduce((sum, num) => sum + parseInt(num), 0);
              };

              const filteredRooms = rooms.filter(room => {
                if (selectedFilter === "All rooms") return true;
                const bedCount = getBedCount(room);
                if (selectedFilter === "1 bed") return bedCount === 1;
                if (selectedFilter === "2 beds") return bedCount === 2;
                if (selectedFilter === "3+ beds") return bedCount >= 3;
                return true;
              });

              return (
                <>
                  <Box sx={{ 
                    display: "flex", 
                    justifyContent: "space-between", 
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 2
                  }}>
                    <Box sx={{ display: "flex", gap: 1, overflowX: "auto", pb: 1 }}>
                      {["All rooms", "2 beds", "3+ beds", "1 bed"].map((filter) => (
                        <Chip
                          key={filter}
                          label={filter}
                          onClick={() => setSelectedFilter(filter)}
                          sx={{ 
                            borderRadius: 50,
                            px: 1,
                            bgcolor: selectedFilter === filter ? "#1F2937" : "white",
                            color: selectedFilter === filter ? "white" : "#1F2937",
                            border: "1px solid #D1D5DB",
                            fontWeight: 500,
                            fontSize: "0.75rem",
                            "&:hover": { 
                              bgcolor: selectedFilter === filter ? "#1F2937" : "#F3F4F6" 
                            }
                          }}
                        />
                      ))}
                    </Box>
                    <Typography sx={{ fontSize: "0.75rem", color: "#6B7280" }}>
                      Showing {filteredRooms.length} of {rooms.length} rooms
                    </Typography>
                  </Box>

                  {/* Room Cards Grid */}
                  <Box sx={{ mt: 3 }}>
                    {roomsLoading ? (
                      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                        <CircularProgress size={30} sx={{ color: "#004CB0" }} />
                      </Box>
                    ) : (
                      <Grid container spacing={1}>
                        {filteredRooms.map((room) => (
                          <Grid item xs={12} sm={6} md={4} key={room.id}>
                            <RoomCard room={room} />
                          </Grid>
                        ))}
                      </Grid>
                    )}
                  </Box>
                </>
              );
            })()}
          </Grid>
           {/* Policies Section */}
      <Box sx={{ mt: 6, px: { xs: 2, md: 3 } }} ref={policyRef}>
        <Grid container spacing={4}>
          {/* Left Column - Title */}
          <Grid item xs={12} md={3}>
            <Typography sx={{ fontWeight: 700, color: "#1F2937", fontSize: "1.1rem" }}>
              Policies
            </Typography>
          </Grid>

          {/* Right Column - Policy Details */}
          <Grid item xs={12} md={9}>
            <Grid container spacing={4}>
              {/* Check-in / Check-out */}
              <Grid item xs={12} sm={6}>
                <Typography sx={{ fontWeight: 700, mb: 1, color: "#1F2937", fontSize: "0.8rem" }}>
                  Check-in
                </Typography>
                <Typography sx={{ color: "#4B5563", mb: 0.5, fontSize: "0.7rem" }}>
                  Check-in start time: 5 PM; Check-in end time: midnight
                </Typography>
                <Typography sx={{ color: "#4B5563", mb: 0.5, fontSize: "0.7rem" }}>
                  Express check-in available
                </Typography>
                <Typography sx={{ color: "#4B5563", fontSize: "0.7rem" }}>
                  Minimum check-in age: 18
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography sx={{ fontWeight: 700, mb: 1, color: "#1F2937", fontSize: "0.8rem" }}>
                  Check-out
                </Typography>
                <Typography sx={{ color: "#4B5563", mb: 0.5, fontSize: "0.7rem" }}>
                  Check-out before noon
                </Typography>
                <Typography sx={{ color: "#4B5563", mb: 0.5, fontSize: "0.7rem" }}>
                  Contactless check-out available
                </Typography>
                <Typography sx={{ color: "#4B5563", fontSize: "0.7rem" }}>
                  Express check-out available
                </Typography>
              </Grid>

              {/* Special check-in instructions */}
              <Grid item xs={12}>
                <Typography sx={{ fontWeight: 700, mb: 1, color: "#1F2937", fontSize: "0.8rem" }}>
                  Special check-in instructions
                </Typography>
                <Typography sx={{ color: "#4B5563", mb: 1.5, lineHeight: 1.6, fontSize: "0.7rem" }}>
                  This property offers transfers from the airport (surcharges may apply); guests must contact the property with arrival details before travel, using the contact information on the booking confirmation
                </Typography>
                <Typography sx={{ color: "#4B5563", mb: 1.5, fontSize: "0.7rem" }}>
                  Front desk staff will greet guests on arrival at the property
                </Typography>
                <Typography sx={{ color: "#6B7280", fontStyle: "italic", fontSize: "0.75rem" }}>
                  Information provided by the property may be translated using automated translation tools
                </Typography>
              </Grid>

              {/* Access methods */}
              <Grid item xs={12}>
                <Typography sx={{ fontWeight: 700, mb: 1, color: "#1F2937", fontSize: "0.8rem" }}>
                  Access methods
                </Typography>
                <Typography sx={{ color: "#4B5563", fontSize: "0.7rem" }}>
                  Staffed front desk
                </Typography>
              </Grid>

              {/* Pets */}
              <Grid item xs={12}>
                <Typography sx={{ fontWeight: 700, mb: 1, color: "#1F2937", fontSize: "0.8rem" }}>
                  Pets
                </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Typography sx={{ color: "#4B5563", fontSize: "0.8rem", lineHeight: 0.8 }}>•</Typography>
                  <Typography sx={{ color: "#4B5563", fontSize: "0.7rem" }}>
                    Pets and service animals are not allowed at Anwar Al Madinah Mövenpick Hotel
                  </Typography>
                </Box>
              </Grid>

              {/* Children and extra beds */}
              <Grid item xs={12}>
                <Typography sx={{ fontWeight: 700, mb: 1, color: "#1F2937", fontSize: "0.8rem" }}>
                  Children and extra beds
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Typography sx={{ color: "#4B5563", fontSize: "0.8rem", lineHeight: 0.8 }}>•</Typography>
                    <Typography sx={{ color: "#4B5563", fontSize: "0.7rem" }}>
                      Children are welcome.
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Typography sx={{ color: "#4B5563", fontSize: "0.8rem", lineHeight: 0.8 }}>•</Typography>
                    <Typography sx={{ color: "#4B5563", fontSize: "0.7rem" }}>
                      Kids stay free! Children 12 years old and younger stay free when using existing bedding.
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Typography sx={{ color: "#4B5563", fontSize: "0.8rem", lineHeight: 0.8 }}>•</Typography>
                    <Typography sx={{ color: "#4B5563", fontSize: "0.7rem" }}>
                      Rollaway/extra beds are available for SAR 100.0 per night.
                    </Typography>
                  </Box>
                </Box>
              </Grid>

              {/* Property payment types */}
              <Grid item xs={12} sx={{ mt: 1 }}>
                <Typography sx={{ fontWeight: 700, mb: 1.5, color: "#1F2937", fontSize: "0.8rem" }}>
                  Property payment types
                </Typography>
                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", alignItems: "center" }}>
                  <Box 
                    component="img" 
                    src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg"
                    alt="American Express"
                    sx={{ height: 28, width: "auto" }}
                  />
                  <Box 
                    component="img" 
                    src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                    alt="Mastercard"
                    sx={{ height: 30, width: "auto" }}
                  />
                  <Box 
                    component="img" 
                    src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
                    alt="Visa"
                    sx={{ height: 18, width: "auto" }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      </Paper>

     
      
      <Divider sx={{ mt: 6, mb: 4 }} />
    </Box>
  );
}