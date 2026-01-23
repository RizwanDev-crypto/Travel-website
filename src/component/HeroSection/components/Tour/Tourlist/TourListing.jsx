"use client";

import { useState, useEffect } from "react";
import { 
  Box, 
  Typography, 
  MenuItem, 
  Menu,
  CircularProgress
} from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import TourSearchForm from "../../TourSearchForm";
import TourFilters from "./TourFilters";
import TourCard from "./TourCard";

export default function TourListing({ slug = [] }) {
    const [isLoading, setIsLoading] = useState(true);
    const [tours, setTours] = useState([]);
    
    // ✅ Filter & Sort States
    const [searchName, setSearchName] = useState("");
    const [priceRange, setPriceRange] = useState([0, 5000]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [selectedDurations, setSelectedDurations] = useState([]);
    const [minRating, setMinRating] = useState(0);
    const [sortLabel, setSortLabel] = useState("Price: low To high");
    const [anchorEl, setAnchorEl] = useState(null);

    // Extract data from slug if needed (placeholder for now)
    const location = slug[0] || "";

    useEffect(() => {
        const fetchTours = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('/api/tours');
                if (!response.ok) throw new Error('Failed to fetch');
                const data = await response.json();
                setTours(data);
            } catch (error) {
                console.error("Error fetching tours:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTours();
    }, []);

    // ✅ Filtering & Sorting Logic
    const filteredTours = tours
        .filter(tour => {
            // Name Filter
            const matchesName = tour.name.toLowerCase().includes(searchName.toLowerCase());
            
            // Price Filter
            const matchesPrice = tour.price >= priceRange[0] && tour.price <= priceRange[1];

            // Type Filter
            const matchesType = selectedTypes.length === 0 || selectedTypes.includes(tour.type);

            // Duration Filter
            const matchesDuration = selectedDurations.length === 0 || selectedDurations.some(range => {
                const durationValue = parseFloat(tour.duration); // Handles "6 Hours", "3 Hours", "45 Mins" (basic)
                const isMins = tour.duration.toLowerCase().includes('min');
                const hours = isMins ? durationValue / 60 : durationValue;
                const isMulti = tour.duration.toLowerCase().includes('day');

                if (range === "0-3 Hours") return hours > 0 && hours <= 3 && !isMulti;
                if (range === "3-5 Hours") return hours > 3 && hours <= 5 && !isMulti;
                if (range === "5-7 Hours") return hours > 5 && hours <= 7 && !isMulti;
                if (range === "Full Day") return hours > 7 && hours <= 24 && !isMulti;
                if (range === "Multi-Day") return isMulti;
                return false;
            });

            // Rating Filter
            const matchesRating = tour.rating >= minRating;

            return matchesName && matchesPrice && matchesType && matchesDuration && matchesRating;
        })
        .sort((a, b) => {
            if (sortLabel === "Price: low To high") return a.price - b.price;
            if (sortLabel === "Price: high To low") return b.price - a.price;
            return 0;
        });

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
                border: "1px solid #e0e0e0", 
                borderRadius: 2,
                 
            }}>
                <TourSearchForm calendarWidth={{ xs: "100%",sm: "43%", md: 224, lg: 314 }} />
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
                    <TourFilters 
                        tourCount={filteredTours.length} 
                        searchName={searchName}
                        onSearchNameChange={setSearchName}
                        priceRange={priceRange}
                        onPriceChange={setPriceRange}
                        selectedTypes={selectedTypes}
                        onTypesChange={setSelectedTypes}
                        selectedDurations={selectedDurations}
                        onDurationsChange={setSelectedDurations}
                        minRating={minRating}
                        onRatingChange={setMinRating}
                        tourTypes={[...new Set(tours.map(t => t.type))]}
                    />
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
                                {filteredTours.length} Tour{filteredTours.length !== 1 ? 's' : ''}
                            </Typography>
                            <Typography variant="caption" sx={{ color: "#6B7280" }}>
                                {location ? `Found in ${location}` : "Top Suggestions"}
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
                        <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
                            <CircularProgress sx={{ color: "#1A53FF" }} />
                        </Box>
                    ) : (
                        <Box sx={{ display: "flex", flexDirection: "column", maxWidth: "680px" }}>
                            {filteredTours.map((tour) => (
                                <TourCard key={tour.id} tour={tour} />
                            ))}
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    );
}

