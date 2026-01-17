"use client";

import {
  Box,
  Grid,
  Typography,
  Container,
  Card,
  CardMedia,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import StarIcon from '@mui/icons-material/Star';

/* ======================
   DATA WITH NEW IMAGES
====================== */
const hotels = [
  {
    image: "/styles/FeatureTour1.jpg",
    price: "USD 105.00",
    title: "Dubai",
    subtitle: "Stunning Dubai",
    rating: 5,
    width: "200px",
      height: "190px",
  },
  {
    image: "/styles/FeatureTour2.jpg",
    price: "USD 320.00",
    title: "Petra",
    subtitle: "Day Visit of Petra From Oman",
    rating: 1,
    width: "200px",
      height: "190px",
  },
  {
    image: "/styles/FeatureTour3.jpg",
    price: "USD 190.00",
    title: "Delhi",
    subtitle: "Old and New Delhi City Tour",
    rating: 2,
    width: "200px",
    height: "190px",  
  },
  {
    image: "/styles/bag.jpg",
    isSimpleImage: true, 
    width: "200px"
  },
  {
    image: "styles/FeatureTour5.jpg",
    price: "USD 45.00",
    title: "Hong Kong",
    subtitle: "Hong Kong island tour",
    rating: 4,
    width: "413px",
    height: "200px",
  },
  {
    image: "styles/FeatureTour4.jpg",
    price: "USD 860.00",
    title: "Thailand", 
    subtitle: "6 Days around Thailand",
    rating: 4,
    width: "200px", 
    height: "200px",
  },
  {
    isSpecialCard: true,
    title: "Limited budget?",
    subtitle: "Find price drops and travel as far as you can with our exclusive deals.",
    buttonText: "View More",
    width: "240px", 
  },
];

/* ======================
   SIMPLE IMAGE CARD COMPONENT (Card 4)
====================== */
const SimpleImageCard = ({ image, width }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  
  return (
    <Box sx={{ fontFamily: "'Inter', sans-serif" }}>
      <Box
        sx={{
          height: isMobile ? "160px" : isTablet ? "200px" : "175px",
          width: {xs:"100%", sm:"100%", md:"175px", lg:"260px"},
          position: "relative",
          overflow: "hidden",
        }}
      >
        <CardMedia
          component="img"
          image={image}
          alt="Tour"
          sx={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
            display: "block",
            backgroundColor: "#f5f5f5",
          }}
        />
      </Box>
    </Box>
  );
};

/* ======================
   SPECIAL CARD COMPONENT - WHITE BACKGROUND VERSION
====================== */
const SpecialCard = ({ title, subtitle, buttonText, width }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  
  return (
    <Card
      sx={{
        width: isMobile ? "90%" : isTablet ? "100%" : {md:"130px", lg:"210px"},
        overflow: "hidden",
        boxShadow: "0px 6px 20px rgba(0,0,0,0.08)",
        transition: "all 0.3s ease",
        cursor: "pointer",
        position: "relative",
        height: isMobile ? "auto" : isTablet ? "154px" : "154px",
        borderRadius: "0px",
        backgroundColor: "#eef4fb", 
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        p: isMobile ? 2 : isTablet ? 2 : 3,
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <Box
        sx={{
          textAlign: "start",
          mb: isMobile ? 2 : isTablet ? 2 : 3,
          width: "100%",
        }}
      >
        <Typography
          sx={{
            fontWeight: "800",
            color: "black",
            fontSize: isMobile ? "16px" : isTablet ? "16px" : "18px",
            mb: isMobile ? 1 : isTablet ? 1 : 2,
            lineHeight: 1.2,
            alignItems: "start",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {title}
        </Typography>
        
        <Typography
          sx={{
            fontWeight: "400",
            color: "text.secondary",
            fontSize: isMobile ? "12px" : isTablet ? "12px" : "12px",
            lineHeight: 1.4,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {subtitle}
        </Typography>
      </Box>
      
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#212529", 
          color: "white", 
          width: "100%",
          borderRadius: "8px",
          textTransform: "none",
          fontSize: isMobile ? "13px" : isTablet ? "13px" : "14px",
          height: isMobile ? 40 : isTablet ? 40 : "auto",
          fontFamily: "'Inter', sans-serif",
          "&:hover": {
            backgroundColor: "#145acf",
          },
          transition: "all 0.3s ease",
        }}
      >
        {buttonText}
      </Button>
    </Card>
  );
};

/* ======================
   REGULAR CARD COMPONENT - With Horizontal Line on Hover
====================== */
const HotelCard = ({ image, price, title, subtitle, rating, width, height }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  
  return (
    <Card
      sx={{
        width: isMobile ? "100%" : isTablet ? "100%" : (width || "225px"), 
        overflow: "hidden",
        boxShadow: "0px 6px 20px rgba(0,0,0,0.08)",
        transition: "all 0.3s ease",
        cursor: "pointer",
        borderRadius: "0px",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <Box
        sx={{
          height: isMobile ? "160px" : isTablet ? "200px" : (height || "180px"),
          width: "100%",
          position: "relative",
          overflow: "hidden",
          "&:hover .image-overlay": {
            backgroundColor: "rgba(0, 0, 0, 0.2)",
          },
          "&:hover .subtitle": {
            top: "50%",
            transform: "translateY(20%)",
          },
          "&:hover .price": {
            opacity: 1,
            visibility: "visible",
            bottom: isTablet ? "40px" : "45px",
          },
          "&:hover .horizontal-line": {
            opacity: 1,
            visibility: "visible",
            bottom: isTablet ? "30px" : "35px",
          },
          "&:hover .rating": {
            bottom: "10px",
          },
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
            backgroundColor: "#f5f5f5",
          }}
        />
        
        <Box
          className="image-overlay"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            transition: "all 0.3s ease",
          }}
        />
        
        <Typography
          sx={{
            position: "absolute",
            top: "10px",
            left: "10px",
            color: "white",
            fontSize: isMobile ? "13px" : isTablet ? "13px" : "14px",
            fontWeight: "600",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
            zIndex: 2,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {title}
        </Typography>
        
        <Typography
          className="subtitle"
          sx={{
            position: "absolute",
            bottom: isTablet ? "25px" : "30px",
            left: "10px",
            color: "white",
            fontSize: isMobile ? "11px" : isTablet ? "11px" : "12px",
            fontWeight: "500",
            textShadow: "1px 1px 3px rgba(0, 0, 0, 0.7)",
            zIndex: 2,
            maxWidth: "90%",
            transition: "all 0.3s ease",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {subtitle}
        </Typography>
        
        <Typography
          className="price"
          sx={{
            position: "absolute",
            left: "10px",
            bottom: "20px",
            color: "white",
            fontSize: isMobile ? "12px" : isTablet ? "12px" : "13px",
            fontWeight: "700",
            textShadow: "1px 1px 3px rgba(0, 0, 0, 0.7)",
            zIndex: 2,
            opacity: 0,
            visibility: "hidden",
            transition: "all 0.3s ease",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {price}
        </Typography>
        
        <Box
          className="horizontal-line"
          sx={{
            position: "absolute",
            left: "10%",
            right: "10%",
            bottom: "25px",
            height: "1px",
            backgroundColor: "white",
            opacity: 0.7,
            opacity: 0,
            visibility: "hidden",
            transition: "all 0.3s ease",
            zIndex: 2,
          }}
        />
        
        <Box
          className="rating"
          sx={{
            position: "absolute",
            bottom: "10px",
            left: "10px",
            display: "flex",
            alignItems: "center",
            zIndex: 2,
            transition: "all 0.3s ease",
          }}
        >
          <StarIcon
            sx={{
              fontSize: isMobile ? "13px" : isTablet ? "13px" : "14px",
              color: "#ffc107",
              mr: 0.5,
            }}
          />
          <Typography
            sx={{
              color: "white",
              fontSize: isMobile ? "11px" : isTablet ? "11px" : "12px",
              fontWeight: "500",
              textShadow: "1px 1px 3px rgba(0, 0, 0, 0.7)",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            ★ {rating}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

/* ======================
   MAIN SECTION
====================== */
const FeaturedTours = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  
  return (
    <Container maxWidth="lg" 
      sx={{ 
        py: isMobile ? 3 : isTablet ? 4 : 4,
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center",
        fontFamily: "'Inter', sans-serif",
        px: isMobile ? 2 : isTablet ? 2 : 3,
      }}
    >
      <Box
        sx={{
          mb: isMobile ? 2 : isTablet ? 2.5 : 3,
          width: isMobile ? "100%" : "79%",
          textAlign: "left",
          ml: { xs: 0,sm :-6, md: -6 ,lg:0},
        }}
      >
        <Typography fontWeight="700" sx={{ 
          fontSize: isMobile ? "18px" : isTablet ? "19px" : "20px",
          fontFamily: "'Inter', sans-serif",
          mb: isMobile ? 0.5 : isTablet ? 0.75 : 1
        }}>
          Popular Tours
        </Typography>
        <Typography sx={{ 
          fontSize: isMobile ? "11px" : isTablet ? "12px" : "12px",
          color: "black", 
          fontFamily: "'Inter', sans-serif" 
        }}>
          These alluring destinations are picked just for you.
        </Typography>
      </Box>

      {/* Mobile Layout - All cards in single column with equal width */}
      {isMobile ? (
        <Box sx={{ width: "100%" }}>
          {hotels.map((hotel, index) => (
            <Box key={index} sx={{ mb: 2, width: "100%" }}>
              {hotel.isSimpleImage ? (
                <SimpleImageCard {...hotel} />
              ) : hotel.isSpecialCard ? (
                <SpecialCard {...hotel} />
              ) : (
                <HotelCard {...hotel} />
              )}
            </Box>
          ))}
        </Box>
      ) : (
        /* Desktop & Tablet Layout */
        <Grid container spacing={isTablet ? 1.5 : 2} justifyContent="center">
          {hotels.map((hotel, index) => (
            <Grid
              item
              xs={12}
              sm={12}
              md={index === 4 ? 6 : 3}
              lg={index === 4 ? 6 : 3}
              key={index}
              sx={{
                display: "flex",
                justifyContent: "center",
                // Card 5 (Hong Kong) - Tablet par equal width
                ...(index === 4 && isTablet && {
                  '& > *': {
                    width: "88%",
               
                  }
                }),
                // Card 7 (Special card) - Tablet par full width (2 cards k equal)
                ...(hotel.isSpecialCard && isTablet && {
                  xs: 12,
                  '& > *': {
                    width: "100%",
                    mt:2
                  }
                }),
                    // ✅ Card 6 - Tablet LEFT SPACE FIX
    ...(index === 5 && isTablet && {
      position:"relative",
      left: "-20px",  
      // 👈 yahan value adjust kar sakte ho
    }),
  }}
              
            >
              {hotel.isSimpleImage ? (
                <SimpleImageCard {...hotel} />
              ) : hotel.isSpecialCard ? (
                <SpecialCard {...hotel} />
              ) : (
                <HotelCard {...hotel} />
              )}
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default FeaturedTours;