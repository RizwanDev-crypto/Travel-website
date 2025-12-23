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
} from "@mui/material";
import StarIcon from '@mui/icons-material/Star';


/* ======================
   DATA
====================== */
const cars = [
  {
    image: "/styles/CarImage1.png",
    isSpecialCard: true,
    subtitle: "Discover great cars for transfers",
    buttonText: "View More",
  },
  {
    image: "/styles/CarImage4.png",
    price: "USD 200.00",
    title: "Hyundai i10 or similar",
    location: "DXE",
    rating: 5,
  },
  {
    image: "/styles/CarImage3.png",
    price: "USD 275.00",
    title: "Ford Focus 2023",
    location: "DXE",
    rating: 4,
  },
  {
    image: "/styles/CarImage2.png",
    price: "USD 320.00",
    title: "Toyota Camry 2023 full options",
    location: "DXE",
    rating: 3,
  },
];

/* ======================
   SPECIAL CARD COMPONENT
====================== */
const SpecialCard = ({ image, subtitle, buttonText }) => {
  return (
    <Card
      sx={{
        width: "210px",
        borderRadius: "5px",
        overflow: "hidden",
        boxShadow: "0px 6px 20px rgba(0,0,0,0.08)",
        transition: "all 0.3s ease",
        cursor: "pointer",
        position: "relative",
        height: "95%",
      }}
    >
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
        <CardMedia
          component="img"
          image={image}
          alt="Car"
          sx={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
        
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
            p: 3,
            textAlign: "center",
          
          }}
        >
          <Typography
            sx={{
              fontWeight: "700",
              color: "white",
              fontSize: "12px",
              mb: 2,
              lineHeight: 1.2,
            }}
          >
            {subtitle}
          </Typography>
          
          <Button
            variant="contained"
            sx={{
              backgroundColor: "transparent",
              color: "white",
              outline:"1px solid white",
              fontWeight: "600",
              borderRadius: "8px",
              border: "1px solid white",
              textTransform: "none",
              fontSize: "10px",
              px:"44px",
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
const CarCard = ({ image, price, title, location, rating }) => {
  return (
    <Box
      sx={{
        width: "210px",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        height: "95%",
      }}
    >
      {/* Image Container with Border  */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "150px",
          overflow: "hidden",
          borderRadius: "12px",
          border: "1px solid #e0e0e0",
        }}
      >
        <CardMedia
          component="img"
          image={image}
          alt={title}
          sx={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </Box>

      {/* Content without border */}
      <Box sx={{ 
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        padding: 0,
        justifyContent: "space-between",
        px: "10px",
        pt: "10px",
      }}>
        {/* Top Section */}
        <Box>
          <Typography 
            fontWeight="600" 
            sx={{ 
              mb: 0.5, 
              fontSize: "12px",
              lineHeight: 1.3,
              color: "#222",
              mt:"20px"
            }}
          >
            {title}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
            <Box sx={{ display: 'flex' }}>
              {[...Array(5)].map((_, index) => (
                <StarIcon
                  key={index}
                  sx={{
                    fontSize: '12px',
                    color: index < rating ? '#ffc107' : '#e4e5e9',
                  }}
                />
              ))}
            </Box>
          </Box>

          <Typography 
            variant="body2" 
            sx={{ 
              color: "#666",
              fontSize: "12px"
            }}
          >
            {location}
          </Typography>
        </Box>

        {/* Bottom Section: Price and Button */}
        <Box sx={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          mt: "10px",
        }}>
          {/* Price - Bottom Left */}
          <Typography 
            fontWeight="700" 
            sx={{ 
              fontSize: "14px",
              color: "#333"
            }}
          >
            {price}
          </Typography>

          {/* Book Now Button - Bottom Right */}
          <Button
            sx={{
              backgroundColor: "#eef4fb",
              color: "black",
              fontWeight: "600",
              borderRadius: "4px",
              textTransform: "none",
              fontSize: "10px",
            }}
          >
            Book Now
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

/* ======================
   MAIN SECTION
====================== */
const RecommendedCars = () => {
  return (
    <Container maxWidth="lg" 
      sx={{ 
        py: 4, 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center"
      }}
    >
      <Box
        sx={{
          mb: 3,
          width: "79%",
          textAlign: "left",
        }}
      >
        <Typography  fontWeight="700" sx={{ mb: 1, fontSize:"16px" }}>
         Recommended Transfer Cars
        </Typography>
      </Box>

      <Grid container spacing={3} justifyContent="center">
        {cars.map((car, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            {car.isSpecialCard ? (
              <SpecialCard {...car} />
            ) : (
              <CarCard {...car} />
            )}
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default RecommendedCars;
