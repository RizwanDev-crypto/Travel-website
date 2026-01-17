"use client";

import {
  Box,
  Typography,
  Container,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AppleIcon from '@mui/icons-material/Apple';
import AndroidIcon from '@mui/icons-material/Android';

/* ======================
   MAIN SECTION
====================== */
const AppStore = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
  return (
    <Box sx={{ width: "100%", backgroundColor: "#0b66f9", marginY: isMobile ? 4 : 0 }}>
      <Container maxWidth="lg" 
        sx={{ 
          py: isMobile ? 3 : 2,
          display: "flex", 
          flexDirection: isMobile ? "column" : "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: isMobile ? 3 : 6,
          px: isMobile ? 2 : 6,
          fontFamily: "'Inter', sans-serif",
        }}
      >
  
        {/* Left side - Text content */}
        <Box sx={{ 
          flex: 1,
          display: "flex",
          alignItems: "center",
          color: "white",
          textAlign: isMobile ? "center" : "start",
          position: isMobile ? "static" : "relative",
          left: {xs:"",sm:"", md:80, lg:120},
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? 3 : 0,
          width: isMobile ? "100%" : "auto",
        }}>
  
          {/* Badges */}
          <Box
            sx={{
              display: "flex",
              flexDirection: isMobile ? "row" : "column",
              gap: isMobile ? 2 : 1,
              alignItems: "center",
              justifyContent: isMobile ? "center" : "flex-start",
              width: isMobile ? "100%" : "auto",
            }}
          >
            <Button
              variant="outlined"
              startIcon={<AndroidIcon />}
              sx={{
                color: "white",
                borderColor: "white",
                borderRadius: "4px",
                textTransform: "none",
                fontWeight: "600",
                fontSize: isMobile ? "11px" : "10px",
                px: isMobile ? 3 : 2,
                py: isMobile ? 1.5 : 1.3,
                fontFamily: "'Inter', sans-serif",
                "&:hover": {
                  backgroundColor: "black",
                  borderColor: "white",
                },
                width: isMobile ? "140px" : "auto",
                height: isMobile ? "44px" : "auto",
              }}
            >
              PLAYSTORE
            </Button>
  
            <Button
              variant="outlined"
              startIcon={<AppleIcon />}
              sx={{
                color: "white",
                borderColor: "white",
                borderRadius: "4px",
                textTransform: "none",
                fontWeight: "600",
                fontSize: isMobile ? "11px" : "10px",
                px: isMobile ? 3 : 2.1,
                py: isMobile ? 1.5 : 1.3,
                fontFamily: "'Inter', sans-serif",
                "&:hover": {
                  backgroundColor: "black",
                  borderColor: "white",
                },
                width: isMobile ? "140px" : "auto",
                height: isMobile ? "44px" : "auto",
              }}
            >
              APP STORE
            </Button>
          </Box>
  
          {/* Get the app */}
          <Box sx={{
            alignItems: isMobile ? "center" : "flex-start", 
            position: isMobile ? "static" : "relative", 
            left: isMobile ? 0 : "20px", 
            top: isMobile ? 0 : "16px",
            textAlign: isMobile ? "center" : "left",
            width: isMobile ? "100%" : "auto",
          }}>
            {/* Main heading */}
            <Typography
              variant="h3"
              fontWeight="700"
              sx={{
                fontSize: isMobile ? "16px" : { xs: "12px", md: "16px", lg: "20px" },
                lineHeight: 1.5,
                fontFamily: "'Inter', sans-serif",
                mb: isMobile ? 1 : 0,
              }}
            >
              Get The App!
            </Typography>
  
            {/* Description */}
            <Typography
              sx={{
                mb: isMobile ? 2 : 4,
                fontSize: isMobile ? "12px" : { xs: "10px", md: "13px" },
                lineHeight: 1.6,
                opacity: 0.9,
                maxWidth: isMobile ? "100%" : "500px",
                fontFamily: "'Inter', sans-serif",
                px: isMobile ? 1 : 0,
              }}
            >
              Our app has all your travel needs covered: Secure payment channels, easy 4-step booking process. What more could you ask for?
            </Typography>
          </Box>
        </Box>
  
        {/* Right side - Mobile Image */}
        <Box sx={{ 
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          width: isMobile ? "100%" : "auto",
          mt: isMobile ? 1 : 0,
          mb:isMobile? -3:0
        }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: isMobile ? "80%" : "100%",
              maxWidth: "300px",
              position: isMobile ? "static" : "relative",
              bottom: isMobile ? 0 : -16,
            }}
          >
            <img 
              src="/styles/mobileImg.png" 
              alt="Mobile App" 
              style={{
                width: "100%",
                height: "auto",
                maxHeight: isMobile ? "200px" : "400px",
                objectFit: "contain",
              }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default AppStore;