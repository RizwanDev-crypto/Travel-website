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
import HotelSearchForm from "../../HotelSearchForm";
import HotelFilters from "./HotelFilters";
import HotelCard from "./HotelCard";
import HotelDetails from "./HotelDetails";
import { useGlobalContext } from "@/app/context/GlobalContext";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function HotelListing({ slug = [] }) {
    const { hotelSearchData } = useGlobalContext();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [hotels, setHotels] = useState([]);
    
    // ✅ Filter & Sort States
    const [searchName, setSearchName] = useState("");
    const [priceRange, setPriceRange] = useState([0, 10000]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [selectedStars, setSelectedStars] = useState([]);
    const [sortLabel, setSortLabel] = useState("Price: low To high");
    const [anchorEl, setAnchorEl] = useState(null); // ✅ Restored anchorEl for menu
    const [visibleHotels, setVisibleHotels] = useState(10); // ✅ Added pagination state

    // ✅ Fetch hotels from API
    useEffect(() => {
        const fetchHotels = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('/api/hotels');
                if (!response.ok) throw new Error('Failed to fetch');
                const data = await response.json();
                setHotels(data);
            } catch (error) {
                console.error("Error fetching hotels:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchHotels();
    }, []);

    // ✅ Filtering & Sorting Logic
    const filteredHotels = hotels
        .filter(hotel => {
            // Name Filter
            const matchesName = hotel.name.toLowerCase().includes(searchName.toLowerCase());
            
            // Price Filter
            const matchesPrice = hotel.price >= priceRange[0] && hotel.price <= priceRange[1];

            // Type Filter
            const matchesType = selectedTypes.length === 0 || selectedTypes.includes(hotel.type);

            // Stars Filter
            const matchesStars = selectedStars.length === 0 || selectedStars.includes(hotel.stars);

            return matchesName && matchesPrice && matchesType && matchesStars;
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

    const [activeView, setActiveView] = useState("details");

    return (
        <Box sx={{ 
            maxWidth: { xs: "100%", sm: "100%", md: "820px", lg: "910px" }, 
            mx: "auto", 
            px: { xs: 1.5, sm: 2, md: 3, lg: 3 },
            pb: 8,
            fontFamily: "'Inter', sans-serif",
            "& .MuiTypography-root": { fontFamily: "inherit" }
        }}>
            {/* Search Form Container - Hidden when in booking view */}
            {activeView !== "booking" && (
                <Box sx={{ 
                    mb: 2, 
                    mt: 2, 
                    p: { xs: 0, lg: 1 },
                    border: "1px solid #e0e0e0", 
                    borderRadius: 2,
                }}>
                    <HotelSearchForm calendarWidth={{ xs: "100%",sm: "98%", md: 280, lg: 356, xl: 352}} />
                </Box>
            )}

            {/* Main Layout: Filters (Left) + Results (Right) */}
            <Box sx={{ 
                display: "flex", 
                flexDirection: { xs: "column", md: "row" },
                gap: { xs: 2, md: 7,lg: 6 },
                mt: activeView === "booking" ? 0 : 3
            }}>
                {/* Left: Filters Sidebar - Hidden in detail mode */}
                {slug[0] !== "detail" && (
                    <Box sx={{ 
                        width: { xs: "91%",sm: "60%", md: "22%", lg: "22%" }, 
                        flexShrink: 0 
                    }}>
                        <HotelFilters 
                            hotelCount={filteredHotels.length} 
                            searchName={searchName}
                            onSearchNameChange={setSearchName}
                            priceRange={priceRange}
                            onPriceChange={setPriceRange}
                            selectedTypes={selectedTypes}
                            onTypesChange={setSelectedTypes}
                            selectedStars={selectedStars}
                            onStarsChange={setSelectedStars}
                            hotelTypes={[...new Set(hotels.map(h => h.type))]}
                        />
                    </Box>
                )}

                {/* Right: Results Content */}
                <Box sx={{ flex: 1, minWidth: 0 }}>
                    {slug[0] === "detail" ? (
                        <HotelDetails 
                            hotel={hotels.find(h => h.id.toString() === slug[1])} 
                            isLoading={isLoading}
                            onBack={() => {
                                const searchParams = slug.slice(2).join("/");
                                router.push(`/hotels/${searchParams}`);
                            }}
                            onViewChange={setActiveView}
                        />
                    ) : (
                        <>
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
                                        {filteredHotels.length} Hotel{filteredHotels.length !== 1 ? 's' : ''}
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
                                <Box sx={{ display: "flex", justifyContent: "center", p: 4,  }}>
                                    <CircularProgress sx={{ color: "#1A53FF" }} />
                                </Box>
                            ) : (
                                <Box sx={{ display: "flex", flexDirection: "column", maxWidth: "680px" }}>
                                    {filteredHotels.slice(0, visibleHotels).map((hotel) => (
                                        <HotelCard key={hotel.id} hotel={hotel} />
                                    ))}

                                    {/* See More Button */}
                                    {visibleHotels < filteredHotels.length && (
                                        <Box sx={{ 
                                            display: "flex", 
                                            justifyContent: "center", 
                                            mt: 2,
                                            mb: 4
                                        }}>
                                            <Button
                                                variant="outlined"
                                                onClick={() => setVisibleHotels(prev => prev + 8)}
                                                sx={{
                                                    borderRadius: 1.5,
                                                    textTransform: "none",
                                                    fontSize: "0.85rem",
                                                    fontWeight: 600,
                                                    color: "#1A53FF",
                                                    borderColor: "#1A53FF",
                                                    px: 4,
                                                    "&:hover": {
                                                        bgcolor: "#EFF6FF",
                                                        borderColor: "#0040FF",
                                                    }
                                                }}
                                            >
                                                See More
                                            </Button>
                                        </Box>
                                    )}
                                </Box>
                            )}
                        </>
                    )}
                </Box>
            </Box>
        </Box>
    );
}

