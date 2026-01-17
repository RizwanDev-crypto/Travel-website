import React from "react";
import Link from "next/link";
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Divider,
  IconButton,
  Stack,
  Link as MuiLink,
  List,
  ListItem,
  useMediaQuery,
  useTheme,
  colors,
} from "@mui/material";
import {
  Facebook,
  Twitter,
  YouTube,
  Instagram,
} from "@mui/icons-material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  // Custom TextField with floating label
  const CustomTextField = ({ label, type = "text", ...props }) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const [hasValue, setHasValue] = React.useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = (e) => {
      setIsFocused(false);
      setHasValue(!!e.target.value);
    };
    const handleChange = (e) => {
      setHasValue(!!e.target.value);
      if (props.onChange) props.onChange(e);
    };

    const isShrunk = isFocused || hasValue;

    return (
      <Box sx={{ position: "relative", height: 44, width: "100%" }}>
        {/* Custom Label */}
        <Box
          sx={{
            position: "absolute",
            top: isShrunk ? "4px" : "50%",
            left: "14px",
            transform: isShrunk ? "none" : "translateY(-50%)",
            transition: "all 0.2s ease",
            pointerEvents: "none",
            zIndex: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: isShrunk ? "10px" : "12px",
              color: "#514c4cff", // Fixed color - doesn't change on focus
              fontWeight: 400,
              transition: "all 0.2s ease",
              lineHeight: 1,
            }}
          >
            {label}
          </Typography>
        </Box>

        <TextField
          type={type}
          variant="outlined"
          size="small"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          InputProps={{
            sx: {
              height: 44,
              fontSize: "10px",
              fontWeight: 600,
              color: "#000000",
              paddingTop: isShrunk ? "18px" : "6px",
              backgroundColor: "white",
              fontFamily: "'Inter', sans-serif",
              width: "100%",
              "& input": {
                color: "#000000",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#c0c0c0",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#1976d2",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#1976d2",
                borderWidth: 1,
              },
            },
          }}
          {...props}
        />
      </Box>
    );
  };

  return (
    <Box
      component="footer"
      sx={{
        borderTop: 1,
        borderColor: "divider",
        color: "text.primary",
        width: "100%",
        position: "relative",
        pt: isMobile ? 4 : 4,
        pb: isMobile ? 3 : 0,
        fontFamily: "'Inter', sans-serif",
        margin: "0 auto",
      }}
    >
      <Container 
        maxWidth={false}
        sx={{
          px: { xs: 2, sm: 3, md: 4, lg: 5, xl: 6 },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: { md: "800px", lg: "910px" },
            margin: "0 auto",
          }}
        >
          {/* Top section: 4 columns grid */}
          <Grid container spacing={isMobile ? 4 : isTablet ? 6 : 16} sx={{ mb: isMobile ? 3 : 4 }}>
            {/* Column 1 - About Us */}
            <Grid item xs={6} sm={6} md={3}>
              <List dense disablePadding>
                <ListItem disablePadding sx={{ mb: 1 }}>
                  <MuiLink
                    component={Link}
                    href="/privacy-policy"
                    color="inherit"
                    underline="none"
                    sx={{ 
                      fontSize: isMobile ? "12px" : "12px", 
                      textDecoration: "none", 
                      fontWeight: 500, 
                      fontFamily: "'Inter', sans-serif",
                      display: "block",
                      py: isMobile ? 0.5 : 0
                    }}
                  >
                    About Us
                  </MuiLink>
                </ListItem>
                <ListItem disablePadding sx={{ mb: 1 }}>
                  <MuiLink
                    component={Link}
                    href="/privacy-policy"
                    color="inherit"
                    underline="none"
                    sx={{ 
                      fontSize: isMobile ? "12px" : "12px", 
                      textDecoration: "none", 
                      fontWeight: 500, 
                      fontFamily: "'Inter', sans-serif",
                      display: "block",
                      py: isMobile ? 0.5 : 0
                    }}
                  >
                    Privacy Policy
                  </MuiLink>
                </ListItem>
                <ListItem disablePadding>
                  <MuiLink
                    component={Link}
                    href="/file-claim"
                    color="inherit"
                    underline="none"
                    sx={{ 
                      fontSize: isMobile ? "12px" : "12px", 
                      textDecoration: "none", 
                      fontWeight: 500, 
                      fontFamily: "'Inter', sans-serif",
                      display: "block",
                      py: isMobile ? 0.5 : 0
                    }}
                  >
                    File A Claim
                  </MuiLink>
                </ListItem>
              </List>
            </Grid>

            {/* Column 2 - Contact Us */}
            <Grid item xs={6} sm={6} md={3}>
              <List dense disablePadding>
                <ListItem disablePadding sx={{ mb: 1 }}>
                  <MuiLink
                    component={Link}
                    href="/become-supplier"
                    color="inherit"
                    underline="none"
                    sx={{ 
                      fontSize: isMobile ? "12px" : "12px", 
                      textDecoration: "none", 
                      fontWeight: 500, 
                      fontFamily: "'Inter', sans-serif",
                      display: "block",
                      py: isMobile ? 0.5 : 0
                    }}
                  >
                    Contact Us
                  </MuiLink>
                </ListItem>
                <ListItem disablePadding sx={{ mb: 1 }}>
                  <MuiLink
                    component={Link}
                    href="/become-supplier"
                    color="inherit"
                    underline="none"
                    sx={{ 
                      fontSize: isMobile ? "12px" : "12px", 
                      textDecoration: "none", 
                      fontWeight: 500, 
                      fontFamily: "'Inter', sans-serif",
                      display: "block",
                      py: isMobile ? 0.5 : 0,
                    }}
                  >
                    Become A Supplier
                  </MuiLink>
                </ListItem>
                <ListItem disablePadding>
                  <MuiLink
                    component={Link}
                    href="/careers"
                    color="inherit"
                    underline="none"
                    sx={{ 
                      fontSize: isMobile ? "12px" : "12px", 
                      textDecoration: "none", 
                      fontWeight: 500, 
                      fontFamily: "'Inter', sans-serif",
                      display: "block",
                      py: isMobile ? 0.5 : 0
                    }}
                  >
                    Careers And Jobs
                  </MuiLink>
                </ListItem>
              </List>
            </Grid>

            {/* Column 3 - Terms Of Use */}
            <Grid item xs={6} sm={6} md={3}>
              <List dense disablePadding>
                <ListItem disablePadding sx={{ mb: 1 }}>
                  <MuiLink
                    component={Link}
                    href="/faq"
                    color="inherit"
                    underline="none"
                    sx={{ 
                      fontSize: isMobile ? "12px" : "12px", 
                      textDecoration: "none", 
                      fontWeight: 500, 
                      fontFamily: "'Inter', sans-serif",
                      display: "block",
                      py: isMobile ? 0.5 : 0
                    }}
                  >
                    Terms Of Use
                  </MuiLink>
                </ListItem>
                <ListItem disablePadding sx={{ mb: 1 }}>
                  <MuiLink
                    component={Link}
                    href="/faq"
                    color="inherit"
                    underline="none"
                    sx={{ 
                      fontSize: isMobile ? "12px" : "12px", 
                      textDecoration: "none", 
                      fontWeight: 500, 
                      fontFamily: "'Inter', sans-serif",
                      display: "block",
                      py: isMobile ? 0.5 : 0
                    }}
                  >
                    FAQ
                  </MuiLink>
                </ListItem>
                <ListItem disablePadding>
                  <MuiLink
                    component={Link}
                    href="/how-to-book"
                    color="inherit"
                    underline="none"
                    sx={{ 
                      fontSize: isMobile ? "12px" : "12px", 
                      textDecoration: "none", 
                      fontWeight: 500, 
                      fontFamily: "'Inter', sans-serif",
                      display: "block",
                      py: isMobile ? 0.5 : 0
                    }}
                  >
                    How To Book
                  </MuiLink>
                </ListItem>
              </List>
            </Grid>

            {/* Column 4 */}
            <Grid item xs={6} sm={6} md={3}>
              <List dense disablePadding>
                <ListItem disablePadding sx={{ mb: 1 }}>
                  <MuiLink
                    component={Link}
                    href="/cookies-policy"
                    color="inherit"
                    underline="none"
                    sx={{ 
                      fontSize: isMobile ? "12px" : "12px", 
                      textDecoration: "none", 
                      fontWeight: 500, 
                      fontFamily: "'Inter', sans-serif",
                      display: "block",
                      py: isMobile ? 0.5 : 0
                    }}
                  >
                    Cookies Policy
                  </MuiLink>
                </ListItem>
                <ListItem disablePadding>
                  <MuiLink
                    component={Link}
                    href="/booking-tips"
                    color="inherit"
                    underline="none"
                    sx={{ 
                      fontSize: isMobile ? "12px" : "12px", 
                      textDecoration: "none", 
                      fontWeight: 500, 
                      fontFamily: "'Inter', sans-serif",
                      display: "block",
                      py: isMobile ? 0.5 : 0
                    }}
                  >
                    Booking Tips
                  </MuiLink>
                </ListItem>
              </List>
            </Grid>
          </Grid>

          {/* Contact & Newsletter */}
          <Box
            sx={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "space-between",
              alignItems: isMobile ? "flex-start" : "center",
              gap: isMobile ? 4 : isTablet ? 8 : 10,
              py: 2,
              borderTop: 1,
              borderColor: "divider",
            }}
          >
            {/* Contact Info */}
            <Box sx={{ 
              display: "flex", 
              alignItems: "center", 
              width: isMobile ? "100%" : "auto",
              flexDirection: isMobile ? "column" : "row",
              textAlign: isMobile ? "center" : "left",
              gap: isMobile ? 2 : 0
            }}>
              <Box
                component="img"
                src="/logo without name.png"
                alt="Logo"
                sx={{
                  width: isMobile ? 40 : 48,
                  height: isMobile ? 40 : 48,
                  objectFit: "contain",
                  flexShrink: 0,
                }}
              />
              <Box sx={{ ml: isMobile ? 0 : 2, mt: isMobile ? 0 : 0 }}>
                <List dense disablePadding>
                  <ListItem disablePadding sx={{ justifyContent: isMobile ? "center" : "flex-start" }}>
                    <Typography color="text.secondary" sx={{ 
                      fontFamily: "'Inter', sans-serif", 
                      fontSize: isMobile ? "11px" : "12px",
                    }}>
                      +123456789
                    </Typography>
                  </ListItem>
                  <ListItem disablePadding sx={{ justifyContent: isMobile ? "center" : "flex-start" }}>
                    <MuiLink
                      component={Link}
                      href="/privacy-policy"
                      color="text.primary"
                      underline="none"
                      sx={{ 
                        fontWeight: 800,
                        fontFamily: "'Inter', sans-serif", 
                        fontSize: isMobile ? "11px" : "11px"
                      }}
                    >
                      email@agency.com
                    </MuiLink>
                  </ListItem>
                  <ListItem disablePadding sx={{ justifyContent: isMobile ? "center" : "flex-start" }}>
                    <MuiLink
                      component={Link}
                      href="/file-claim"
                      color="text.primary"
                      underline="none"
                      sx={{ 
                        fontWeight: 800, 
                        fontFamily: "'Inter', sans-serif", 
                        fontSize: isMobile ? "11px" : "11px"
                      }}
                    >
                      Contact Us
                    </MuiLink>
                  </ListItem>
                </List>
              </Box>
            </Box>

            {/* Newsletter Signup */}
            <Box sx={{ width: isMobile ? "100%" : "auto" }}>
              <Stack
                direction={isMobile ? "column" : "row"}
                spacing={isMobile ? 1.5 : 1}
                sx={{ width: "100%" }}
              >
                <Box sx={{ 
                  width: { xs: "100%", sm: "100%", md: "auto" },
                  flexGrow: { xs: 1, sm: 1, md: 0 }
                }}>
                  <CustomTextField
                    label="Name"
                    sx={{ width: "100%" }}
                  />
                </Box>
                <Box sx={{ 
                  width: { xs: "100%", sm: "100%", md: "auto" },
                  flexGrow: { xs: 1, sm: 1, md: 0 }
                }}>
                  <CustomTextField
                    label="Email"
                    type="email"
                    sx={{ width: "100%" }}
                  />
                </Box>
          <Box sx={{ 
  width: { xs: "100%", sm: "100%", md: "auto" },
  flexGrow: { xs: 1, sm: 1, md: 0 }
}}>
  <Button
    variant="contained"
    color="primary"
    sx={{
      fontSize: isMobile ? "12px" : "10px",
      fontWeight: 600,
      px: isMobile ? 2 : 4,
      whiteSpace: "nowrap",
      width: { xs: "100%", sm: "100%", md: "auto" },
      height: isMobile ? 40 : 44,
      fontFamily: "'Inter', sans-serif",
      backgroundColor: "#0B66F9",
      display: "block",
      "&:hover": {
        backgroundColor: "#000000", // Black background on hover
        color: "#ffffff", // White text on hover
      }
    }}
  >
    Signup Newsletter
  </Button>
</Box>
              </Stack>
            </Box>
          </Box>

          {/* Bottom section */}
          <Divider sx={{ mt: isMobile ? 2 : 0 }} />
          <Box
            sx={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: isMobile ? 2 : 3,
              py: isMobile ? 2 : 3,
            }}
          >
            {/* Copyright */}
            <Typography 
              color="text.primary"
              sx={{ 
                textAlign: isMobile ? "center" : "left",
                width: isMobile ? "100%" : "auto",
                fontFamily: "'Inter', sans-serif",
                fontSize: isMobile ? "11px" : "12px",
                order: isMobile ? 3 : 1
              }}
            >
              © 2026 All Rights Reserved by PHPTRAVELS
            </Typography>

            {/* Powered by */}
            <Box sx={{ 
              display: "flex", 
              alignItems: "center", 
              gap: 1,
              order: isMobile ? 1 : 2
            }}>
              <Typography variant="body2" color="text.secondary" sx={{ 
                fontFamily: "'Inter', sans-serif",
                fontSize: isMobile ? "11px" : "10px"
              }}>
                Powered by
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
                <Box
                  component="img"
                  src="/logo without name.png"
                  alt="PHPTRAVELS"
                  sx={{ width: isMobile ? 16 : 20, height: isMobile ? 16 : 16 }}
                />
                <Typography variant="body2" sx={{ 
                  fontWeight: 600, 
                  fontFamily: "'Inter', sans-serif",
                  fontSize: isMobile ? "11px" : "10px"
                }}>
                  PHPTRAVELS
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ 
                  fontFamily: "'Inter', sans-serif",
                  fontSize: isMobile ? "11px" : "10px"
                }}>
                  v3.1
                </Typography>
              </Box>
            </Box>

            {/* Social Icons */}
            <Stack direction="row" spacing={1} sx={{ order: isMobile ? 2 : 3 }}>
              <IconButton 
                size="small" 
                color="inherit" 
                sx={{ 
                  p: isMobile ? 0.5 : 1,
                  backgroundColor: "transparent",
                  "&:hover": {
                    backgroundColor: "transparent"
                  },
                  "&.Mui-focusVisible": {
                    backgroundColor: "transparent"
                  },
                  "&.Mui-active": {
                    backgroundColor: "transparent"
                  }
                }}
              >
                <Facebook fontSize={isMobile ? "small" : "small"} />
              </IconButton>
              
              <IconButton 
                size="small" 
                color="inherit" 
                sx={{ 
                  p: isMobile ? 0.5 : 1,
                  backgroundColor: "transparent",
                  "&:hover": {
                    backgroundColor: "transparent"
                  },
                  "&.Mui-focusVisible": {
                    backgroundColor: "transparent"
                  },
                  "&.Mui-active": {
                    backgroundColor: "transparent"
                  }
                }}
              >
                <Twitter fontSize={isMobile ? "small" : "small"} />
              </IconButton>
              
              <IconButton 
                size="small" 
                color="inherit" 
                sx={{ 
                  p: isMobile ? 0.5 : 1,
                  backgroundColor: "transparent",
                  "&:hover": {
                    backgroundColor: "transparent"
                  },
                  "&.Mui-focusVisible": {
                    backgroundColor: "transparent"
                  },
                  "&.Mui-active": {
                    backgroundColor: "transparent"
                  }
                }}
              >
                <LinkedInIcon fontSize={isMobile ? "small" : "small"} />
              </IconButton>
              
              <IconButton 
                size="small" 
                color="inherit" 
                sx={{ 
                  p: isMobile ? 0.5 : 1,
                  backgroundColor: "transparent",
                  "&:hover": {
                    backgroundColor: "transparent"
                  },
                  "&.Mui-focusVisible": {
                    backgroundColor: "transparent"
                  },
                  "&.Mui-active": {
                    backgroundColor: "transparent"
                  }
                }}
              >
                <YouTube fontSize={isMobile ? "small" : "small"} />
              </IconButton>
              
              <IconButton 
                size="small" 
                color="inherit" 
                sx={{ 
                  p: isMobile ? 0.5 : 1,
                  backgroundColor: "transparent",
                  "&:hover": {
                    backgroundColor: "transparent"
                  },
                  "&.Mui-focusVisible": {
                    backgroundColor: "transparent"
                  },
                  "&.Mui-active": {
                    backgroundColor: "transparent"
                  }
                }}
              >
                <Instagram fontSize={isMobile ? "small" : "small"} />
              </IconButton>
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;