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
  Message as MessageIcon
} from "@mui/icons-material";
import { useState } from "react";

export default function HotelBooking({ hotel, room, travellers, checkIn, checkOut, onBack }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const calculateNights = (start, end) => {
    if (!start || !end) return 1;
    const s = new Date(start);
    const e = new Date(end);
    const diff = Math.ceil((e - s) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  };

  const nights = calculateNights(checkIn, checkOut);

  // Reusable Summary Content
  const SummaryContent = () => (
    <>
      <Paper elevation={0} sx={{ borderRadius: 2, border: "1px solid #E5E7EB", overflow: "hidden", width: "100%", mb: 2 }}>
        <Box sx={{ position: "relative", height: 140 }}>
          <Box 
            component="img"
            src={room.images[activeImageIndex]}
            alt={hotel.name}
            sx={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          {room.images.length > 1 && (
            <>
              <IconButton 
                onClick={() => setActiveImageIndex(prev => (prev - 1 + room.images.length) % room.images.length)}
                sx={{ 
                  position: "absolute", left: 4, top: "50%", transform: "translateY(-50%)",
                  bgcolor: "rgba(255,255,255,0.8)", "&:hover": { bgcolor: "white" },
                  padding: 0.5
                }}
              >
                <LeftIcon sx={{ fontSize: 18 }} />
              </IconButton>
              <IconButton 
                onClick={() => setActiveImageIndex(prev => (prev + 1) % room.images.length)}
                sx={{ 
                  position: "absolute", right: 4, top: "50%", transform: "translateY(-50%)",
                  bgcolor: "rgba(255,255,255,0.8)", "&:hover": { bgcolor: "white" },
                  padding: 0.5
                }}
              >
                <RightIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </>
          )}
        </Box>

        <Box sx={{ p: 2 }}>
          <Typography sx={{ fontWeight: 700, color: "#1F2937", mb: 2, fontSize: "1rem", lineHeight: 1.2 }}>
            {hotel.name}
          </Typography>
          
          <Divider sx={{ mb: 1}} />
          
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            <Box sx={{ bgcolor: "#003580", color: "white", px: 0.6, py: 0.3, borderRadius: 1, fontSize: "0.7em", fontWeight: 700 }}>
              {hotel.rating?.toFixed(1) || 9}
            </Box>
            <Box>
              <Typography sx={{ fontSize: "0.7rem", fontWeight: 700, color: "#1F2937" }}>Wonderful</Typography>
              <Typography sx={{ fontSize: "0.6rem", color: "#6B7280" }}>(1,002 reviews)</Typography>
            </Box>
          </Box>

          <Box sx={{ mb: 1 }}>
            <Typography sx={{ fontSize: "0.7rem", fontWeight: 700, color: "#1F2937", mb: 0.5 }}>
              1 Room: <Typography component="span" sx={{ fontWeight: 400 , fontSize: "0.7rem"}}>{room.name}</Typography>
            </Typography>
            <Typography sx={{ fontSize: "0.6rem", color: "#6B7280", display: "flex", alignItems: "center", gap: 0.5 }}>
              Non-refundable <InfoIcon sx={{ fontSize: 16 }} />
            </Typography>
          </Box>

          <Box sx={{ mb: 1 }}>
            <Typography sx={{ fontSize: "0.7rem", fontWeight: 700, color: "#374151" }}>
              Check-in: <Typography component="span" sx={{ fontWeight: 400, fontSize: "0.7rem" }}>{formatDate(checkIn)}</Typography>
            </Typography>
            <Typography sx={{ fontSize: "0.7rem", fontWeight: 700, color: "#374151" }}>
              Check-out: <Typography component="span" sx={{ fontWeight: 400, fontSize: "0.7rem" }}>{formatDate(checkOut)}</Typography>
            </Typography>
            <Typography sx={{ fontSize: "0.6rem", color: "#6B7280" }}>{nights}-night stay</Typography>
          </Box>

          <Divider sx={{ mb: 0 }} />
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", py: 1, "&:hover": { color: "#003580" } }}>
            <Typography sx={{ fontWeight: 700 , fontSize: "0.7rem" }}>Special Requests (optional)</Typography>
          </Box>
        </Box>
      </Paper>

      <Paper elevation={0} sx={{ borderRadius: 2, border: "1px solid #E5E7EB", overflow: "hidden", width: "100%", mb: 2 }}>
        <Box sx={{ p: 2, bgcolor: "#fff" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
            <Typography sx={{ fontSize: "0.7rem", color: "#006837", fontWeight: 500 }}>
              You have good taste! Book now before someone else grabs it!
            </Typography>
          </Box>

          <Typography sx={{ fontWeight: 700, fontSize: "1rem", mb: 2, color: "#000" }}>Price details</Typography>
          <Divider sx={{ mb: 2 }} />

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1.5 }}>
            <Typography sx={{ fontSize: "0.75rem", color: "#4B5563" }}>1 room x {nights} night</Typography>
            <Typography sx={{ fontSize: "0.75rem", color: "#000", fontWeight: 500 }}>${room.priceTotal - 62.21}</Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography sx={{ fontSize: "0.75rem", color: "#4B5563" }}>Taxes</Typography>
            <Typography sx={{ fontSize: "0.75rem", color: "#000", fontWeight: 500 }}>$62.21</Typography>
          </Box>

          <Divider sx={{ mb: 2 }} />

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography sx={{ fontWeight: 800, fontSize: "1rem", color: "#000" }}>Total</Typography>
            <Typography sx={{ fontWeight: 800, fontSize: "1rem", color: "#000" }}>${room.priceTotal}</Typography>
          </Box>

          <Divider sx={{ mb: 2 }} />

          <Box sx={{ mb: 2 }}>
            <Typography sx={{ fontWeight: 700, fontSize: "0.75rem", color: "#000", mb: 0.5 }}>Not included in your total</Typography>
            <Typography sx={{ fontSize: "0.7rem", color: "#4B5563", lineHeight: 1.4 }}>
              Additional charges collected by the property. <Typography component="span" sx={{ color: "#1A53FF", cursor: "pointer", fontSize: "0.7rem" }}>Details</Typography>
            </Typography>
          </Box>

          <Typography sx={{ color: "#1A53FF", fontSize: "0.75rem", fontWeight: 500, cursor: "pointer", mb: 2 }}>
            Use a coupon, credit, or promotion code
          </Typography>

          <Typography sx={{ fontSize: "0.55rem", color: "#6B7280", lineHeight: 1.3 }}>
            Rates are quoted in <strong>US dollars</strong>. Taxes and Fees due at the property are based on current exchange rates, and are payable in local currency.
          </Typography>
        </Box>
      </Paper>
    </>
  );

  return (
    <Box sx={{ py: 2 }}>
      {/* Header Area */}
      <Box sx={{ mb: 4 }}>
        <Typography 
          sx={{ 
            fontWeight: 700, 
            color: "#003580", 
            fontSize: { xs: "1rem", md: "1.2rem", lg: "1.2rem" }
          }}
        >
          Secure booking — only takes 2 minutes!
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, py: 1 }}>
          <CheckIcon sx={{ color: "#059669", fontSize: 20 }} />
          <Typography sx={{ color: "#065F46", fontSize: "0.7rem", fontWeight: 500 }}>
            You've picked a winner! This hotel is rated {hotel.rating?.toFixed(1) || 9}/10.
          </Typography>
        </Box>

        <Box sx={{ 
          display: "flex", alignItems: "center", justifyContent: "space-between",
          bgcolor: "white", p: 1.5, borderRadius: 1, border: "1px solid #E5E7EB",
          cursor: "pointer", "&:hover": { bgcolor: "#F9FAFB" }
        }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <LockIcon sx={{ color: "#003580", fontSize: 16 }} />
            <Typography sx={{ color: "#003580", fontWeight: 700, fontSize: "0.8rem" }}>
              Sign in to book faster
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Main Container */}
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 2 }}>
        
        {/* Left Column */}
        <Box sx={{ width: { xs: "90%", sm: "95.5%", md: "80%"  } }}>
          
          {/* Who's checking in section */}
          <Paper elevation={0} sx={{ p: 2, borderRadius: 2, border: "1px solid #E5E7EB", width: { xs: "100%", md: "90%" }, mb: 3 }}>
            <Typography sx={{ fontWeight: 700, mb: 0.5, color: "#000", fontSize: "1rem" }}>Who's checking in?</Typography>
            <Typography sx={{ color: "#000", fontSize: "0.7rem", mb: 1 }}>* Required</Typography>

            <Box sx={{ mb: 2 }}>
              <Typography sx={{ fontWeight: 700, mb: 1, color: "#000", fontSize: "0.7rem" }}>
                Room 1: <Typography component="span" sx={{ fontWeight: 400, color: "#000", fontSize: "0.7rem" }}>
                  {travellers.adults} Adults, {room.amenities.find(a => a.type === "beds")?.text || "1 King Bed"}, Non-smoking
                </Typography>
              </Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Typography sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "#059669", fontSize: "0.7rem", fontWeight: 600 }}>
                  <CheckIcon sx={{ fontSize: 16 }} /> Free parking
                </Typography>
                <Typography sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "#059669", fontSize: "0.7rem", fontWeight: 600 }}>
                  <CheckIcon sx={{ fontSize: 16 }} /> Free WiFi
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ fontSize: "0.7rem", fontWeight: 500, mb: 0.5, color: "#4B5563" }}>First name *</Typography>
                  <TextField fullWidth placeholder="(e.g. John)" variant="outlined" size="small" sx={{ "& .MuiOutlinedInput-root": { borderRadius: 1, height: 30, bgcolor: "#fff" }, "& .MuiInputBase-input": { fontSize: "0.7rem", py: 0 } }} />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ fontSize: "0.7rem", fontWeight: 500, mb: 0.5, color: "#4B5563" }}>Last name *</Typography>
                  <TextField fullWidth placeholder="(e.g. Smith)" variant="outlined" size="small" sx={{ "& .MuiOutlinedInput-root": { borderRadius: 1, height: 30, bgcolor: "#fff" }, "& .MuiInputBase-input": { fontSize: "0.7rem", py: 0 } }} />
                </Box>
              </Box>
              <Box>
                <Typography sx={{ fontSize: "0.7rem", fontWeight: 500, mb: 0.5, color: "#4B5563" }}>Email address *</Typography>
                <TextField fullWidth placeholder="Email for confirmation" variant="outlined" size="small" sx={{ "& .MuiOutlinedInput-root": { borderRadius: 1, height: 30, bgcolor: "#fff" }, "& .MuiInputBase-input": { fontSize: "0.7rem", py: 0 } }} />
              </Box>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ fontSize: "0.7rem", fontWeight: 500, mb: 0.5, color: "#4B5563" }}>Country/Territory Code *</Typography>
                  <TextField select fullWidth defaultValue="USA +1" variant="outlined" size="small" sx={{ "& .MuiOutlinedInput-root": { borderRadius: 1, height: 30, bgcolor: "#fff" }, "& .MuiInputBase-input": { fontSize: "0.6rem", py: 0 } }}>
                    <MenuItem value="USA +1">USA +1</MenuItem>
                    <MenuItem value="PAK +92">Pakistan +92</MenuItem>
                    <MenuItem value="UK +44">UK +44</MenuItem>
                  </TextField>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ fontSize: "0.7rem", fontWeight: 500, mb: 0.5, color: "#4B5563" }}>Phone number *</Typography>
                  <TextField fullWidth variant="outlined" size="small" sx={{ "& .MuiOutlinedInput-root": { borderRadius: 1, height: 30, bgcolor: "#fff" }, "& .MuiInputBase-input": { fontSize: "0.7rem", py: 0 } }} />
                </Box>
              </Box>
              <FormControlLabel
                control={<Checkbox defaultChecked sx={{ '&.Mui-checked': { color: "#003580" } }} />}
                label={<Typography sx={{ fontSize: "0.6rem", color: "#1F2937", fontWeight: 500 }}>Receive text alerts about this trip. Message and data rates may apply.</Typography>}
              />
            </Box>
          </Paper>

          {/* Protect your stay section */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <Typography sx={{ fontWeight: 700, fontSize: "1rem", color: "#000" }}>Protect your stay</Typography>
              <VerifiedIcon sx={{ color: "#7CA5E9", fontSize: 24 }} />
            </Box>
            <Typography sx={{ fontSize: "0.7rem", color: "#1A53FF", mb: 2, cursor: "pointer" }}>
              Resident of New York or Washington? <Typography component="span" sx={{ textDecoration: "underline", fontSize: "0.7rem" }}>View plan available for your state</Typography>
            </Typography>
            <Typography sx={{ fontWeight: 700, fontSize: "0.75rem", mb: 2, color: "#000" }}>Select an option to continue *</Typography>

            <Paper elevation={0} sx={{ p: 2, borderRadius: 2, border: "2px solid #003580", bgcolor: "#F0F6FF", mb: 2, width: { xs: "100%", md: "90%" } }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <Box>
                  <Chip label="Recommended" size="small" sx={{ bgcolor: "#006837", color: "#fff", borderRadius: 1, height: 20, fontSize: "0.6rem", fontWeight: 700, mb: 1 }} />
                  <Typography sx={{ fontWeight: 700, fontSize: "0.85rem", color: "#000" }}>Stay Protection Plan</Typography>
                  <Typography sx={{ fontWeight: 700, fontSize: "0.9rem", color: "#000", mt: 0.5 }}>$11.28</Typography>
                  <Typography sx={{ fontSize: "0.6rem", color: "#6B7280" }}>per person</Typography>
                  <Box sx={{ mt: 2 }}>
                    <Typography sx={{ fontWeight: 700, fontSize: "0.7rem", mb: 1, color: "#000" }}>Includes coverage for:</Typography>
                    {[
                      { icon: <CrossIcon sx={{ fontSize: 14 }} />, text: "Cancellation protection up to 100% of stay cost" },
                      { icon: <DateIcon sx={{ fontSize: 14 }} />, text: "Interruption protection up to 100% of stay cost" },
                      { icon: <HospitalIcon sx={{ fontSize: 14 }} />, text: "Emergency evacuation up to $50,000" },
                      { icon: <HospitalIcon sx={{ fontSize: 14 }} />, text: "Medical expenses up to $10,000 per person" },
                      { icon: <HospitalIcon sx={{ fontSize: 14 }} />, text: "Certain hotel or meal expenses due to trip delay up to $200 per person" }
                    ].map((item, idx) => (
                      <Box key={idx} sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                        <Box sx={{ color: "#4B5563" }}>{item.icon}</Box>
                        <Typography sx={{ fontSize: "0.65rem", color: "#4B5563" }}>{item.text}</Typography>
                      </Box>
                    ))}
                  </Box>
                  <Typography sx={{ fontSize: "0.7rem", color: "#1A53FF", mt: 2, cursor: "pointer", textDecoration: "underline" }}>View benefit summaries</Typography>
                </Box>
                <Radio checked color="primary" size="small" />
              </Box>
            </Paper>

            <Paper elevation={0} sx={{ p: 2, borderRadius: 2, border: "1px solid #E5E7EB", mb: 2, width: { xs: "100%", md: "90%" } }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <Box sx={{ pr: 4 }}>
                  <Typography sx={{ fontWeight: 700, fontSize: "0.85rem", color: "#000", mb: 0.5 }}>No protection</Typography>
                  <Typography sx={{ fontSize: "0.7rem", color: "#4B5563", lineHeight: 1.4 }}>
                    I'm willing to risk my ${room.priceTotal} stay. I understand I may be responsible for certain cancellation fees and delay expenses.
                  </Typography>
                </Box>
                <Radio color="primary" size="small" />
              </Box>
            </Paper>

            <Box sx={{ display: "flex", gap: 1.5, mb: 3, width: { xs: "100%", md: "90%" } }}>
              <MessageIcon sx={{ color: "#6B7280", fontSize: 20 }} />
              <Box>
                <Typography sx={{ fontWeight: 700, fontSize: "0.7rem", color: "#000", mb: 0.5 }}>Mr. Rodman</Typography>
                <Typography sx={{ fontSize: "0.7rem", color: "#4B5563", fontStyle: "italic", lineHeight: 1.4 }}>
                  "Things happened outside of my control which caused the trip to be canceled. The Travel Protection was valuable in reducing the losses to me when we had to cancel the trip."
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Mobile-only Summary and Price Details (Toggle Visibility) */}
          <Box sx={{ display: { xs: "block", md: "none" }, width: { xs: "100%", md: "90%", lg: "90%" }, mb: 3 }}>
            <SummaryContent />
          </Box>

          {/* Payment method section */}
          <Box sx={{ mb: 3, width: { xs: "100%", md: "90%", lg: "95.5%" } }}>
            <Typography sx={{ fontWeight: 700, fontSize: "1rem", color: "#000", mb: 1 }}>Payment method</Typography>
            <Box sx={{ display: "flex", gap: 3, mb: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <CheckIcon sx={{ color: "#006837", fontSize: 14 }} />
                <Typography sx={{ fontSize: "0.65rem", color: "#006837", fontWeight: 500 }}>We use secure transmission</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <CheckIcon sx={{ color: "#006837", fontSize: 14 }} />
                <Typography sx={{ fontSize: "0.65rem", color: "#006837", fontWeight: 500 }}>We protect your personal information</Typography>
              </Box>
            </Box>

            <Paper elevation={0} sx={{ p: 2, borderRadius: 2, border: "1px solid #E5E7EB", bgcolor: "#fff" }}>
              <Box sx={{ display: "flex", gap: 3, borderBottom: "1px solid #E5E7EB", pb: 1, mb: 2 }}>
                <Typography sx={{ fontSize: "0.7rem", fontWeight: 700, color: "#1A53FF", cursor: "pointer", borderBottom: "2px solid #1A53FF", pb: 1 }}>Debit/Credit Card</Typography>
                <Typography sx={{ fontSize: "0.7rem", fontWeight: 500, color: "#4B5563", cursor: "pointer" }}>PayPal</Typography>
                <Typography sx={{ fontSize: "0.7rem", fontWeight: 500, color: "#4B5563", cursor: "pointer" }}>Monthly Payments</Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
                {["visa", "mastercard", "amex", "discover"].map((card) => (
                  <Box key={card} component="img" src={`https://img.icons8.com/color/48/000000/${card}.png`} sx={{ height: 20 }} />
                ))}
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 2 , width: { xs: "100%", md: "90%", lg: "95.5%" }}}>
                <Box sx={{ width: { xs: "100%", md: "90%", lg: "70%" }}}>
                  <Typography sx={{ fontSize: "0.7rem", fontWeight: 700, mb: 0.5, color: "#000" }}>Name on Card *</Typography>
                  <TextField fullWidth variant="outlined" size="small" sx={{ "& .MuiOutlinedInput-root": { borderRadius: 1, height: 34, bgcolor: "#fff" }, "& .MuiInputBase-input": { fontSize: "0.7rem", py: 0 } }} />
                </Box>
                <Box sx={{ width: { xs: "100%", md: "90%", lg: "50%" }}}>
                  <Typography sx={{ fontSize: "0.7rem", fontWeight: 700, mb: 0.5, color: "#000" }}>Debit/Credit card number *</Typography>
                  <TextField fullWidth placeholder="0000 0000 0000 0000" variant="outlined" size="small" sx={{ "& .MuiOutlinedInput-root": { borderRadius: 1, height: 34, bgcolor: "#fff" }, "& .MuiInputBase-input": { fontSize: "0.7rem", py: 0 } }} />
                </Box>
              </Box>
              <Grid container spacing={2}>
                
                <Grid item xs={12}>
                  <Typography sx={{ fontSize: "0.7rem", fontWeight: 700, mb: 0.5, color: "#000" }}>Expiration date *</Typography>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <TextField select defaultValue="Month" variant="outlined" size="small" sx={{ width: 100, "& .MuiOutlinedInput-root": { borderRadius: 1, height: 34, bgcolor: "#f3f4f6" }, "& .MuiInputBase-input": { fontSize: "0.7rem", py: 0 } }}><MenuItem value="Month">Month</MenuItem></TextField>
                    <TextField select defaultValue="Year" variant="outlined" size="small" sx={{ width: 100, "& .MuiOutlinedInput-root": { borderRadius: 1, height: 34, bgcolor: "#f3f4f6" }, "& .MuiInputBase-input": { fontSize: "0.7rem", py: 0 } }}><MenuItem value="Year">Year</MenuItem></TextField>
                  </Box>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Typography sx={{ fontSize: "0.7rem", fontWeight: 700, mb: 0.5, color: "#000" }}>Security code *</Typography>
                  <TextField fullWidth variant="outlined" size="small" sx={{ "& .MuiOutlinedInput-root": { borderRadius: 1, height: 34, bgcolor: "#fff" }, "& .MuiInputBase-input": { fontSize: "0.7rem", py: 0 } }} />
                </Grid>
                <Grid item xs={6} md={4}>
                  <Typography sx={{ fontSize: "0.7rem", fontWeight: 700, mb: 0.5, color: "#000" }}>Billing ZIP code *</Typography>
                  <TextField fullWidth variant="outlined" size="small" sx={{ "& .MuiOutlinedInput-root": { borderRadius: 1, height: 34, bgcolor: "#fff" }, "& .MuiInputBase-input": { fontSize: "0.7rem", py: 0 } }} />
                </Grid>
              </Grid>
            </Paper>
          </Box>

          {/* Cancellation Policy section */}
          <Box sx={{ mb: 3, width: { xs: "100%", md: "90%" } }}>
            <Typography sx={{ fontWeight: 700, fontSize: "1rem", color: "#000", mb: 2 }}>Cancellation policy</Typography>
            <Paper elevation={0} sx={{ p: 2, borderRadius: 2, border: "1px solid #E5E7EB", bgcolor: "#fff" }}>
              <Box component="ul" sx={{ m: 0, pl: 2, color: "#4B5563", fontSize: "0.7rem", lineHeight: 1.8 }}>
                <li>This rate is non-refundable. If you change or cancel your booking you will not get a refund or credit to use for a future stay.</li>
                <li>No refunds will be issued for late check-in or early check-out.</li>
                <li>Stay extensions require a new reservation.</li>
              </Box>
            </Paper>
          </Box>

          {/* Important Information section */}
          <Box sx={{ mb: 3, width: { xs: "100%", md: "90%" }, pb: 4 }}>
            <Typography sx={{ fontWeight: 700, fontSize: "1rem", color: "#000", mb: 2 }}>Important information</Typography>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 2, border: "1px solid #E5E7EB", bgcolor: "#fff" }}>
              <Box component="ul" sx={{ m: 0, pl: 2, color: "#4B5563", fontSize: "0.7rem", lineHeight: 1.8, mb: 3 }}>
                <li>Front desk staff will greet guests on arrival at the property.</li>
                <li>Deposit: SAR 500 per accommodation, per stay (under 12 years old). Payable by bank transfer.</li>
              </Box>
              <Divider sx={{ mb: 3 }} />
              <Box sx={{ display: "flex", gap: 6, mb: 3 }}>
                <Box>
                  <Typography sx={{ fontWeight: 700, fontSize: "0.75rem", color: "#000" }}>Check-in:</Typography>
                  <Typography sx={{ fontSize: "0.7rem", color: "#4B5563" }}>Fri, Feb 6, 4:00 PM</Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 700, fontSize: "0.75rem", color: "#000" }}>Check-out:</Typography>
                  <Typography sx={{ fontSize: "0.7rem", color: "#4B5563" }}>Sat, Feb 7, noon</Typography>
                </Box>
              </Box>
              <Typography sx={{ fontSize: "0.65rem", color: "#4B5563", mb: 3, lineHeight: 1.5 }}>
                By clicking on the button below, I acknowledge that I have reviewed the Privacy Statement and Terms of Use.
              </Typography>
              <Button variant="contained" sx={{ bgcolor: "#003580", color: "#fff", textTransform: "none", fontWeight: 700, borderRadius: 1, px: 2, py: 1, fontSize: "0.7rem", mb: 4, "&:hover": { bgcolor: "#002252" } }}>
                Complete Booking <KeyboardArrowRight sx={{ ml: 1 }} />
              </Button>
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
                <LockIcon sx={{ color: "#4B5563", fontSize: 16, mt: 0.3 }} />
                <Box>
                  <Typography sx={{ fontSize: "0.65rem", color: "#4B5563", fontWeight: 700 }}>Secure transmission and encrypted storage.</Typography>
                  <Typography sx={{ fontSize: "0.6rem", color: "#6B7280" }}>Payments are processed in the U.S. unless noted otherwise.</Typography>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Box>

        {/* Right Column (Desktop Only) */}
        <Box sx={{ width: { xs: "100%",sm: "100%", md: "30%", lg: "45%" }, display: { xs: "none", md: "block" } }}>
          <SummaryContent />
        </Box>

      </Box>
    </Box>
  );
}
