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

  return (
    <Box
      component="footer"
      sx={{
        borderTop: 1,
        borderColor: "divider",
        color: "text.primary",
        px: isMobile ? 2 : isTablet ? 4 : { xs: 3, md: 12 },
        width: isMobile ? "100%" : "78%",
        position: "relative",
        left: isMobile ? 0 : "-10px",
        pt: isMobile ? 4 : 6,
        pb: isMobile ? 3 : 0,
        fontFamily: "'Inter', sans-serif",
        margin: "0 auto",
      }}
    >
      <Container maxWidth="lg">
        {/* Top section: 4 columns grid - Mobile: 2 columns, Tablet: 3 columns */}
        <Grid container spacing={isMobile ? 4 : isTablet ? 6 : 10} sx={{ mb: isMobile ? 3 : 4 }}>
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
                    fontSize: isMobile ? "13px" : "14px", 
                    textDecoration: "none", 
                    fontWeight: 400, 
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
                    fontSize: isMobile ? "13px" : "14px", 
                    textDecoration: "none", 
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
                    fontSize: isMobile ? "13px" : "14px", 
                    textDecoration: "none", 
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
                    fontSize: isMobile ? "13px" : "14px", 
                    textDecoration: "none", 
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
                    fontSize: isMobile ? "13px" : "14px", 
                    textDecoration: "none", 
                    fontFamily: "'Inter', sans-serif",
                    display: "block",
                    py: isMobile ? 0.5 : 0
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
                    fontSize: isMobile ? "13px" : "14px", 
                    textDecoration: "none", 
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
                    fontSize: isMobile ? "13px" : "14px", 
                    textDecoration: "none", 
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
                    fontSize: isMobile ? "13px" : "14px", 
                    textDecoration: "none", 
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
                    fontSize: isMobile ? "13px" : "14px", 
                    textDecoration: "none", 
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
                    fontSize: isMobile ? "13px" : "14px", 
                    textDecoration: "none", 
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
                    fontSize: isMobile ? "13px" : "14px", 
                    textDecoration: "none", 
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
                    fontSize: isMobile ? "11px" : "12px"
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
                      fontSize: isMobile ? "11px" : "12px"
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
                      fontSize: isMobile ? "11px" : "12px"
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
              <TextField
                placeholder="Name"
                variant="outlined"
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "white",
                    fontFamily: "'Inter', sans-serif",
                    height: isMobile ? 44 : "auto",
                  },
                  "& .MuiInputBase-input": {
                    fontFamily: "'Inter', sans-serif",
                    fontSize: isMobile ? "14px" : "inherit",
                  },
                }}
              />
              <TextField
                type="email"
                placeholder="Email"
                variant="outlined"
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "white",
                    fontFamily: "'Inter', sans-serif",
                    height: isMobile ? 44 : "auto",
                  },
                  "& .MuiInputBase-input": {
                    fontFamily: "'Inter', sans-serif",
                    fontSize: isMobile ? "14px" : "inherit",
                  },
                }}
              />
              <Button
                variant="contained"
                color="primary"
                sx={{
                  fontSize: isMobile ? "12px" : "10px",
                  fontWeight: 600,
                  px: isMobile ? 2 : 4,
                  whiteSpace: "nowrap",
                  width: isMobile ? "100%" : "auto",
                  height: isMobile ? 44 : "auto",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Signup Newsletter
              </Button>
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
            © {new Date().getFullYear()} All Rights Reserved by PHPTRAVELS
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
              fontSize: isMobile ? "11px" : "inherit"
            }}>
              Powered by
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box
                component="img"
                src="/logo without name.png"
                alt="PHPTRAVELS"
                sx={{ width: isMobile ? 16 : 20, height: isMobile ? 16 : 20 }}
              />
              <Typography variant="body2" sx={{ 
                fontWeight: 600, 
                fontFamily: "'Inter', sans-serif",
                fontSize: isMobile ? "11px" : "inherit"
              }}>
                PHPTRAVELS
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ 
                fontFamily: "'Inter', sans-serif",
                fontSize: isMobile ? "11px" : "inherit"
              }}>
                v3.1
              </Typography>
            </Box>
          </Box>

          {/* Social Icons */}
          <Stack direction="row" spacing={1} sx={{ order: isMobile ? 2 : 3 }}>
            <IconButton size="small" color="inherit" sx={{ p: isMobile ? 0.5 : 1 }}>
              <Facebook fontSize={isMobile ? "small" : "small"} />
            </IconButton>
            <IconButton size="small" color="inherit" sx={{ p: isMobile ? 0.5 : 1 }}>
              <Twitter fontSize={isMobile ? "small" : "small"} />
            </IconButton>
            <IconButton size="small" color="inherit" sx={{ p: isMobile ? 0.5 : 1 }}>
              <LinkedInIcon fontSize={isMobile ? "small" : "small"} />
            </IconButton>
            <IconButton size="small" color="inherit" sx={{ p: isMobile ? 0.5 : 1 }}>
              <YouTube fontSize={isMobile ? "small" : "small"} />
            </IconButton>
            <IconButton size="small" color="inherit" sx={{ p: isMobile ? 0.5 : 1 }}>
              <Instagram fontSize={isMobile ? "small" : "small"} />
            </IconButton>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;