"use client";

import {
  Box,
  Grid,
  Typography,
  Container,
  Card,
  CardMedia,
  CardContent,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

/* ======================
   DATA
====================== */
const hotels = [
  {
    image: "/styles/FeaturedHotel4.jpg",
    price: "USD 200.00 / Night",
    title: "Movenpick Grand Al Bustan",
    location: "Dubai United Arab Emirates",
    rating: 5,
  },
  {
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWwlMjBkdWJhaXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60",
    price: "USD 320.00 / Night",
    title: "Burj Al Arab",
    location: "Dubai United Arab Emirates",
    rating: 5,
  },
  {
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWwlMjBkdWJhaXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60",
    price: "USD 275.00 / Night",
    title: "Atlantis The Palm",
    location: "Dubai United Arab Emirates",
    rating: 5,
  },
  // Card 4 with ONLY screenshot design (no hotel info)
  {
    image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG90ZWwlMjBkdWJhaXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60",
    isSpecialCard: true, // Flag for special design
    title: "Discover great deals on",
    subtitle: "hotels around the world",
    buttonText: "View More",
  },
];

/* ======================
   SPECIAL CARD COMPONENT (with Bottom Gradient)
====================== */
const SpecialCard = ({ image, title, subtitle, buttonText }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
  return (
    <Card
      sx={{
        width: isMobile ? "100%" : "212px",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0px 6px 20px rgba(0,0,0,0.08)",
        transition: "all 0.3s ease",
        cursor: "pointer",
        mt: isMobile ? "0px" : "3px",
        position: "relative",
        height: isMobile ? "180px" : "93%",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Full card with gradient overlay */}
      <Box
        sx={{
          height: "100%",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Background Image */}
        <CardMedia
          component="img"
          image={image}
          alt={title}
          sx={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
            display: "block",
            backgroundColor: "#f5f5f5",
          }}
        />
        
        {/* Blue Gradient Overlay - Starting from 50% from bottom */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(to bottom, transparent 50%, #1767e8 100%)',
            opacity: 0.9,
          }}
        />
        
        {/* Text and button overlay */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "center",
            p: isMobile ? 2 : 3,
            textAlign: "center",
            pb: isMobile ? 3 : 4,
          }}
        >
          <Typography
            sx={{
              fontWeight: "500",
              color: "white",
              fontSize: isMobile ? "13px" : "14px",
              mb: 0.5,
              lineHeight: 1.2,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {title}
          </Typography>
          
          <Typography
            sx={{
              fontWeight: "700",
              color: "white",
              fontSize: isMobile ? "13px" : "14px",
              mb: isMobile ? 2 : 3,
              lineHeight: 1.2,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {subtitle}
          </Typography>
          
          <Button
            variant="contained"
            sx={{
              backgroundColor: "white",
              color: "white",
              backgroundColor: "transparent",
              outline: "1px solid white",
              fontWeight: "600",
              borderRadius: "8px",
              px: isMobile ? 3 : 4,
              textTransform: "none",
              fontSize: isMobile ? "11px" : "12px",
              fontFamily: "'Inter', sans-serif",
              "&:hover": {
                backgroundColor: "white",
                color: "black"
              },
            }}
          >
            {buttonText}
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

/* ======================
   REGULAR CARD COMPONENT
====================== */
const HotelCard = ({ image, price, title, location, rating }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
  return (
    <Card
      sx={{
        width: isMobile ? "100%" : "215px",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0px 6px 20px rgba(0,0,0,0.08)",
        transition: "all 0.3s ease",
        cursor: "pointer",
        height: isMobile ? "auto" : "94%",
        fontFamily: "'Inter', sans-serif",
        "&:hover": {
          boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.12)",
        },
      }}
    >
      {/* Image Container */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          height: isMobile ? "140px" : "150px",
        }}
      >
        <CardMedia
          component="img"
          image={image}
          alt={title}
          sx={{
            maxHeight: "100%",
            maxWidth: "100%",
            objectFit: "cover",
            display: "block",
            backgroundColor: "#f5f5f5",
          }}
        />
      </Box>

      {/* Content */}
      <CardContent sx={{ py: isMobile ? 1.5 : 2, px: isMobile ? 2 : "inherit" }}>
        {/* Price */}
        <Typography 
          fontWeight="700" 
          color="text.primary" 
          sx={{ 
            mb: 1, 
            fontSize: isMobile ? "12px" : "13px",
            color: "#333",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {price} 
        </Typography>

        {/* Hotel Title */}
        <Typography 
          fontWeight="600" 
          sx={{ 
            mb: 0.5, 
            fontSize: isMobile ? "11px" : "12px",
            lineHeight: 1.3,
            color: "#222",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {title}
        </Typography>

        {/* Location */}
        <Typography 
          variant="body2" 
          sx={{ 
            mb: 1,
            color: "#666",
            fontSize: isMobile ? "11px" : "12px",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {location}
        </Typography>

        {/* Star Rating */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex' }}>
            {[...Array(5)].map((_, index) => (
              <StarIcon
                key={index}
                sx={{
                  fontSize: isMobile ? '14px' : '16px',
                  color: index < rating ? '#ffc107' : '#e4e5e9',
                }}
              />
            ))}
          </Box>
          <Typography 
            variant="body2" 
            sx={{ 
              ml: 1, 
              color: '#555',
              fontWeight: 500,
              fontSize: isMobile ? '12px' : '13px',
              fontFamily: "'Inter', sans-serif",
            }}
          >
            ★ {rating}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

/* ======================
   MAIN SECTION
====================== */
const FeaturedHotels = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  
  return (
    <Container maxWidth="lg" 
      sx={{ 
        py: isMobile ? 3 : 4, 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center",
        fontFamily: "'Inter', sans-serif",
        px: isMobile ? 2 : 3,
      }}
    >
      <Box
        sx={{
          mb: isMobile ? 2 : 3,
          width: isMobile ? "100%" : "79%",
          textAlign: isMobile ? "center" : "left",
        }}
      >
        <Typography 
          fontSize={isMobile ? "16px" : "18px"} 
          fontWeight="700" 
          sx={{ 
            fontFamily: "'Inter', sans-serif",
            mb: isMobile ? 0.5 : 1 
          }}
        >
          Featured Hotels
        </Typography>
        <Typography 
          fontSize={isMobile ? "12px" : "14px"} 
          color="black" 
          sx={{ 
            fontFamily: "'Inter', sans-serif" 
          }}
        >
          These alluring destinations are picked just for you.
        </Typography>
      </Box>

      {/* Mobile Layout - All cards in single column with equal width */}
      {isMobile ? (
        <Box sx={{ width: "100%" }}>
          {hotels.map((hotel, index) => (
            <Box key={index} sx={{ mb: 2, width: "100%" }}>
              {hotel.isSpecialCard ? (
                <SpecialCard {...hotel} />
              ) : (
                <HotelCard {...hotel} />
              )}
            </Box>
          ))}
        </Box>
      ) : (
        /* Desktop & Tablet Layout - Grid */
        <Grid container spacing={isMobile ? 2 : 2} justifyContent="center">
          {hotels.map((hotel, index) => (
            <Grid 
              item 
              xs={12} 
              sm={6} 
              md={3} 
              key={index}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box sx={{ 
                width: isMobile ? "100%" : "auto", 
                maxWidth: isMobile ? "100%" : "300px" 
              }}>
                {hotel.isSpecialCard ? (
                  <SpecialCard {...hotel} />
                ) : (
                  <HotelCard {...hotel} />
                )}
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default FeaturedHotels;