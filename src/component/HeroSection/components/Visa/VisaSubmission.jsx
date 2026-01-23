"use client";

import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { 
  AccessTime as TimeIcon,
  UnfoldMore as UnfoldMoreIcon 
} from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useGlobalContext } from "@/app/context/GlobalContext";


// Custom TextField with floating label
const FloatingTextField = ({ name, label, type = "text", value, onChange, placeholder, multiline = false, rows = 4, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const isShrunk = isFocused || !!value;

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
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
            color: "#514c4cff",
            fontWeight: 400,
            transition: "all 0.2s ease",
            lineHeight: 1,
          }}
        >
          {label}
        </Typography>
      </Box>

      <TextField
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        variant="outlined"
        size="small"
        fullWidth
        multiline={multiline}
        rows={rows}
        InputProps={{
          ...props.InputProps,
          sx: {
            height: multiline ? '120px' : 44,
            fontSize: "14px",
            fontWeight: 600,
            color: "#000000",
            paddingTop: isShrunk ? "18px" : "6px",
            backgroundColor: "white",
            fontFamily: "'Inter', sans-serif",
            width: "100%",
            "& input": {
              color: "#000000",
              fontSize: "inherit",
            },
            "& textarea": {
              color: "#000000",
              fontSize: "14px",
              paddingTop: "8px",
              lineHeight: 1.5,
              overflow: "auto",
              resize: "none",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#d1d5db",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#1976d2",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#1976d2",
              borderWidth: 1,
            },
            ...props.InputProps?.sx,
          },
        }}
        placeholder={placeholder}
        {...props}
      />
    </Box>
  );
};

export default function VisaSubmission() {
  const { visaSearchData } = useGlobalContext();
  const [timeLeft, setTimeLeft] = useState(367); // 06:07 in seconds

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const formatDateDMY = (dateStr) => {
  if (!dateStr) return "";

  const [year, month, day] = dateStr.split("-");
  return `${day}-${month}-${year}`;
};


  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    notes: "",
    entryType: "Single",
    visaType: "Tourist",
    numberOfDays: 30, // Default value
  });

  const handleIncrement = () => {
    setFormState(prev => ({ ...prev, numberOfDays: prev.numberOfDays + 1 }));
  };

  const handleDecrement = () => {
    setFormState(prev => ({ ...prev, numberOfDays: Math.max(1, prev.numberOfDays - 1) }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box sx={{ bgcolor: "#f8f9fa", minHeight: "100vh", pb: 8, fontFamily: "'Inter', sans-serif" }}>
      {/* Header with country names and date */}
      <Box sx={{
  position: "relative",
  overflow: "hidden",
  py: 6,
  borderBottom: "1px solid #e5e7eb",

  /* Background Image */
  backgroundImage: 'url(/image/VisaSecImage.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: 'top',
  backgroundRepeat: 'no-repeat',

  /* Gradient Overlay */
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(to bottom, #0004ffe8, #5e8dfc)',
    opacity: 0.85,          // adjust if needed
    zIndex: 1,
  },

  /* Make content appear above overlay */
  '& > *': {
    position: 'relative',
    zIndex: 2,
  }
}}
>
        <Container sx={{ maxWidth: "960px !important", position: "relative", zIndex: 2 }}>
          <Box sx={{ 
            display: "flex", 
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center"
          }}>
            <Box sx={{ 
              alignItems: "center", 
              justifyContent: "center",
              display: "flex",
              flexDirection: "column"
            }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: "white" }}>
                {visaSearchData?.from || "NORWAY"} → {visaSearchData?.to || "AFGHANISTAN"}
              </Typography>
           <Typography variant="body2" sx={{ color: "white", mt: 0.5 }}>
  {formatDateDMY(visaSearchData?.date) || "24-01-2026"}
</Typography>

            </Box>
          </Box>
        </Container>
      </Box>

      <Container sx={{ maxWidth: "960px !important", mt: 4 }}>
        {/* Timer */}
        <Paper
          elevation={0}
          sx={{
            p: 2,
            borderRadius: 2,
            border: "1px solid #e5e7eb",
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            minWidth: 180,
            mb: {xs:2, sm:2,md:3,lg:3},
            width: {xs:"90%",sm:"95%", md:"86.3%",lg:"95.9%"},
            margin: "0 auto",
          }}
        >
          <Box sx={{ display: "flex",alignItems:"center", justifyContent: "space-between", width: "100%" }}>
            <Typography sx={{ fontSize: "11px", fontWeight: 600, color: "#6b7280",  }}>
              Time Remaining
            </Typography>
            <Typography sx={{ fontSize: "24px", fontWeight: 800, color: "#111827", lineHeight: 1 }}>
              {formatTime(timeLeft)}
            </Typography>
          </Box>
        </Paper>

        {/* Form Title */}
        <Box sx={{
          width: {xs:"100%",sm:"100%", md:"90%",lg:"99.9%"},
          margin: "0 auto"
        }}>
            <Typography sx={{ fontSize: "11px", fontWeight: 600, color: "#6b7280" , border: "1px solid #e5e7eb" , p: 2}}>
              Submission Form
            </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Main Container - Form Fields, Button and Image */}
          <Grid item xs={12} sm={12} md={12}>
            <TableContainer 
              component={Paper} 
              elevation={0}
              sx={{ 
                border: "1px solid #e5e7eb", 
                borderRadius: 0,
                overflow: "hidden",
                maxWidth: "960px",
                width: {xs:"99.5%",sm:"118%", md:"90%",lg:"99.9%"},
                margin: "0 auto"
                
              }}
            >
              <Box sx={{ display: "flex", flexDirection: { xs: "column",sm:"column", md: "row" } }}>
                {/* Left Side - Form Fields */}
                <Box sx={{ flex: 1, p: 1 }}>
                  <Table>
                    <TableBody>
                      {/* First Name & Last Name Row */}
                      <TableRow>
                        <TableCell sx={{ width: "50%", bgcolor: "#f9fafb", borderBottom: "none", px: 1, py: 2 }}>
                          <FloatingTextField
                            name="firstName"
                            label="First Name"
                            value={formState.firstName}
                            onChange={handleChange}
                          />
                        </TableCell>
                        <TableCell sx={{ width: "50%", bgcolor: "#f9fafb", borderBottom: "none", px: 1, py: 2 }}>
                          <FloatingTextField
                            name="lastName"
                            label="Last Name"
                            value={formState.lastName}
                            onChange={handleChange}
                          />
                        </TableCell>
                      </TableRow>

                      {/* Email & Phone Row */}
                      <TableRow>
                        <TableCell sx={{ bgcolor: "#f9fafb", borderBottom: "none", px: 1, py: 2 }}>
                          <FloatingTextField
                            name="email"
                            label="Email"
                            type="email"
                            value={formState.email}
                            onChange={handleChange}
                          />
                        </TableCell>
                        <TableCell sx={{ bgcolor: "#f9fafb", borderBottom: "none", px: 1, py: 2 }}>
                          <FloatingTextField
                            name="phone"
                            label="Phone"
                            type="tel"
                            value={formState.phone}
                            onChange={handleChange}
                          />
                        </TableCell>
                      </TableRow>

                      {/* Number of Days & Date Row */}
                      <TableRow>
                        <TableCell sx={{ py: 2, bgcolor: "#f9fafb", borderBottom: "none", px: 1 }}>
                          <FloatingTextField
                            name="numberOfDays"
                            label="Number of Day"
                            value={formState.numberOfDays}
                            onChange={(e) => {
                              const val = parseInt(e.target.value);
                              if (!isNaN(val)) {
                                setFormState(prev => ({ ...prev, numberOfDays: val }));
                              } else if (e.target.value === "") {
                                setFormState(prev => ({ ...prev, numberOfDays: "" }));
                              }
                            }}
                            InputProps={{
                              readOnly: true,
                              endAdornment: (
                                <InputAdornment position="end">
                                  <Box sx={{ display: "flex", flexDirection: "column", mr: -1 }}>
                                    <IconButton
                                      size="small"
                                      onClick={handleIncrement}
                                      sx={{ pb: 2, height: "14px", minWidth: "20px" }}
                                    >
                                      <UnfoldMoreIcon sx={{ fontSize: "1.2rem", color: "#000" }} />
                                    </IconButton>
                                  </Box>
                                </InputAdornment>
                              ),
                              sx: {
                                height: 44,
                                fontSize: "12px",
                                fontWeight: 700,
                                pt: "10px",
                                cursor: "pointer",
                                "& .MuiOutlinedInput-notchedOutline": {
                                  borderColor: "#d1d5db",
                                },
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                  borderColor: "#1976d2",
                                },
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                  borderColor: "#1976d2",
                                  borderWidth: 1,
                                },
                                "& .MuiInputAdornment-root": {
                                  cursor: "pointer",
                                  "&:hover": { color: "#1976d2" }
                                }
                              }
                            }}
                            onClick={(e) => {
                              // Detect if click was on top half or bottom half of the icon area
                              const rect = e.currentTarget.getBoundingClientRect();
                              const y = e.clientY - rect.top;
                              if (y < rect.height / 2) {
                                handleIncrement();
                              } else {
                                handleDecrement();
                              }
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ py: 2, bgcolor: "#f9fafb", borderBottom: "none", px: 1 }}>
                          <FormControl fullWidth variant="outlined" size="small">
                            <InputLabel shrink sx={{ fontSize: "12px", color: "#A0A0A0", top: "12px" }}>
                              Date
                            </InputLabel>
                            <TextField 
                              fullWidth 
                              size="small" 
                              value={visaSearchData?.date || "24-01-2026"}
                              InputProps={{ readOnly: true }}
                              sx={{ 
                                "& .MuiOutlinedInput-root": { 
                                  height: 44,
                                  fontSize: "12px",
                                  fontWeight: 700,
                                  bgcolor: "white",
                                  pt: "15px",
                                  "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#d1d5db",
                                  },
                                  "&:hover .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#1976d2",
                                  },
                                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#1976d2",
                                    borderWidth: 1,
                                  },
                                } 
                              }}
                            />
                          </FormControl>
                        </TableCell>
                      </TableRow>

                      {/* Entry Type & Visa Type Row */}
                      <TableRow>
                        <TableCell sx={{ py: 2, bgcolor: "#f9fafb", borderBottom: "none", px: 1 }}>
                          <FormControl fullWidth variant="outlined" size="small">
                            <InputLabel shrink sx={{ fontSize: "12px", color: "#A0A0A0", top: "13px" }}>
                              Entry Type
                            </InputLabel>
                            <Select
                              name="entryType"
                              value={formState.entryType}
                              onChange={handleChange}
                              sx={{ 
                                height: 44,
                                fontSize: "12px",
                                fontWeight: 700,
                                bgcolor: "white",
                                pt: "8px",
                                "& .MuiOutlinedInput-notchedOutline": { 
                                  borderColor: "#d1d5db",
                                  "&:hover": { borderColor: "#1976d2" },
                                },
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                  borderColor: "#1976d2",
                                },
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                  borderColor: "#1976d2",
                                  borderWidth: 1,
                                },
                              }}
                            >
                              <MenuItem value="Single" sx={{ fontSize: "14px" }}>Single</MenuItem>
                              <MenuItem value="Multiple" sx={{ fontSize: "14px" }}>Multiple</MenuItem>
                            </Select>
                          </FormControl>
                        </TableCell>
                        <TableCell sx={{ py: 2, bgcolor: "#f9fafb", borderBottom: "none", px: 1 }}>
                          <FormControl fullWidth variant="outlined" size="small">
                            <InputLabel shrink sx={{ fontSize: "12px", color: "#A0A0A0", top: "12px" }}>
                              Visa Type
                            </InputLabel>
                            <Select
                              name="visaType"
                              value={formState.visaType}
                              onChange={handleChange}
                              sx={{ 
                                height: 44,
                                fontSize: "12px",
                                fontWeight: 700,
                                bgcolor: "white",
                                pt: "8px",
                                "& .MuiOutlinedInput-notchedOutline": { 
                                  borderColor: "#d1d5db",
                                  "&:hover": { borderColor: "#1976d2" },
                                },
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                  borderColor: "#1976d2",
                                },
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                  borderColor: "#1976d2",
                                  borderWidth: 1,
                                },
                              }}
                            >
                              <MenuItem value="Tourist" sx={{ fontSize: "14px" }}>Tourist</MenuItem>
                              <MenuItem value="Business" sx={{ fontSize: "14px" }}>Business</MenuItem>
                            </Select>
                          </FormControl>
                        </TableCell>
                      </TableRow>

                      {/* Notes Row - Full Width - Fixed height */}
                        <TableRow >
                        <TableCell colSpan={2} sx={{ bgcolor: "#f9fafb", borderBottom: "none", px: 1, py: 2 }}>
                          <FloatingTextField
                          fullWidth
                            name="notes"
                            label="Notes"
                            value={formState.notes}
                            onChange={handleChange}
                         
                          />
                        </TableCell>
                      </TableRow>

                      {/* Submit Button Row - Full Width */}
                      <TableRow>
                        <TableCell colSpan={2} sx={{ borderBottom: "none", px: 1, py: 2 }}>
                          <Button
                            fullWidth
                            variant="contained"
                            sx={{
                              bgcolor: "#0b66f9",
                              py: 1.5,
                              borderRadius: 1,
                              fontWeight: 700,
                              textTransform: "none",
                              fontSize: "16px",
                              "&:hover": { bgcolor: "#000", color :"white" },
                              height: "50px",
                            }}
                          >
                            Submit
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Box>

                {/* Right Side - Passport Image with equal spacing */}
                <Box sx={{ 
                  width: { xs: "100%", md: "400px" }, 
                  borderLeft: { md: "1px solid #e5e7eb" },
                  borderTop: { xs: "1px solid #e5e7eb", md: "none" },
                  display: "flex",
                  flexDirection: "column",
                  p: 3, // Added padding to match left side (p: 3 = 24px)
                }}>
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      minHeight: "400px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        height: "100%",
                        maxHeight: "500px",
                        overflow: "hidden",
                        border: "1px solid #e5e7eb",
                        bgcolor: "white",
                      }}
                    >
                      <Box 
                        component="img" 
                        src="/image/visaside.png"
                        alt="Passport"
                        onError={(e) => {
                          e.target.src = "/image/visaside.png";
                        }}
                        sx={{ 
                          width: "100%", 
                          height: "100%", 
                          objectFit: "cover",
                          display: "block"
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </TableContainer>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}