"use client";

import { useState } from "react";
import { 
  Box, 
  Typography, 
  MenuItem, 
  Menu,
  CircularProgress
} from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import HotelSearchForm from "../../HotelSearchForm";
import HotelFilters from "./HotelFilters";
import HotelCard from "./HotelCard";
import { hotelsData } from "@/app/hotels/data/hotelsData";
import { useGlobalContext } from "@/app/context/GlobalContext";

export default function HotelListing({ slug = [] }) {
    const { hotelSearchData } = useGlobalContext();
    const [anchorEl, setAnchorEl] = useState(null);
    const [sortLabel, setSortLabel] = useState("Price: low To high");
    const [isLoading, setIsLoading] = useState(false);
    
    // Extract data from slug
    const city = slug[0] || "";
    const checkIn = slug[1] || "";
    const checkOut = slug[2] || "";
    const adults = slug[3] || 2;
    const children = slug[4] || 0;
    const nationality = slug[5] || "PK";

    const openSort = Boolean(anchorEl);
    const handleSortClick = (event) => setAnchorEl(event.currentTarget);
    const handleSortClose = (option) => {
        if (typeof option === 'string') setSortLabel(option);
        setAnchorEl(null);
    };

    return (
        <Box sx={{ 
            maxWidth: { xs: "100%", sm: "100%", md: "820px", lg: "910px" }, 
            mx: "auto", 
            px: { xs: 1.5, sm: 2, md: 3, lg: 3 },
            pb: 8,
            fontFamily: "'Inter', sans-serif",
            "& .MuiTypography-root": { fontFamily: "inherit" }
        }}>
            {/* Search Form Container */}
            <Box sx={{ 
                mb: 2, 
                mt: 2, 
                p: { xs: 0, lg: 1 },
                border: "1px solid #e0e0e0", 
                borderRadius: 2,
                 
            }}>
                <HotelSearchForm calendarWidth={{ xs: "100%",sm: "98%", md: 280, lg: 345 }} />
            </Box>

            {/* Main Layout: Filters (Left) + Results (Right) */}
            <Box sx={{ 
                display: "flex", 
                flexDirection: { xs: "column", md: "row" },
                gap: { xs: 2, md: 7,lg: 6 },
                mt: 3
            }}>
                {/* Left: Filters Sidebar */}
                <Box sx={{ 
                    width: { xs: "91%",sm: "60%", md: "22%", lg: "22%" }, 
                    flexShrink: 0 
                }}>
                    <HotelFilters hotelCount={hotelsData.length} />
                </Box>

                {/* Right: Results Content */}
                <Box sx={{ flex: 1, minWidth: 0 }}>
                    {/* Results Header */}
                    <Box sx={{ 
                        display: "flex", 
                        justifyContent: "space-between", 
                        alignItems: "center",
                        mb: 2,
                        width: "100%",
                        maxWidth: {xs: "100%", sm: "94%", md: "100%", lg: "100%"},
                    }}>
                        <Box>
                            <Typography sx={{ fontSize: "1.1rem", fontWeight: 700, color: "#1F2937" }}>
                                {hotelsData.length} Hotel{hotelsData.length > 1 ? 's' : ''}
                            </Typography>
                            <Typography variant="caption" sx={{ color: "#6B7280" }}>
                                Found From 1 Supplier(s)
                            </Typography>
                        </Box>

                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Box
                                onClick={handleSortClick}
                                sx={{
                                    bgcolor: "white",
                                    color: "#1F2937",
                                    borderRadius: 1.5,
                                    px: 2,
                                    py: 1,
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1.5,
                                    cursor: "pointer",
                                    fontSize: "0.85rem",
                                    border: "1px solid #E5E7EB",
                                    "&:hover": { borderColor: "#1A53FF" }
                                }}
                            >
                                {sortLabel}
                                <ExpandMoreIcon sx={{ fontSize: 18, color: "#6B7280", transform: openSort ? "rotate(180deg)" : "none", transition: "0.2s" }} />
                            </Box>
                            <Menu
                                anchorEl={anchorEl}
                                open={openSort}
                                onClose={() => handleSortClose()}
                                sx={{
                                    "& .MuiPaper-root": {
                                        borderRadius: 1.5,
                                        mt: 0.5,
                                        minWidth: 160,
                                        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                                        "& .MuiMenuItem-root": {
                                            fontSize: "0.85rem",
                                            py: 1,
                                            "&:hover": { bgcolor: "#EFF6FF", color: "#1A53FF" },
                                        },
                                    }
                                }}
                            >
                                <MenuItem onClick={() => handleSortClose("Price: low To high")}>Price: low To high</MenuItem>
                                <MenuItem onClick={() => handleSortClose("Price: high To low")}>Price: high To low</MenuItem>
                         </Menu>
                        </Box>
                    </Box>

                    {/* Results Cards Mapping */}
                    {isLoading ? (
                        <Box sx={{ display: "flex", justifyContent: "center", p: 2,  }}>
                            <CircularProgress sx={{ color: "#1A53FF" }} />
                        </Box>
                    ) : (
                        <Box sx={{ display: "flex", flexDirection: "column", maxWidth: "680px" }}>
                            {hotelsData.map((hotel) => (
                                <HotelCard key={hotel.id} hotel={hotel} />
                            ))}
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    );
}
