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
import CarSearchForm from "../../CarSearchForm";
import CarFilters from "./CarFilters";
import CarCard from "./CarCard";
import { useGlobalContext } from "@/app/context/GlobalContext";

export default function CarListing({ slug = [] }) {
    const { carSearchData } = useGlobalContext();
    const [isLoading, setIsLoading] = useState(true);
    const [cars, setCars] = useState([]);
    
    // ✅ Filter & Sort States
    const [searchName, setSearchName] = useState("");
    const [priceRange, setPriceRange] = useState([0, 200]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [sortLabel, setSortLabel] = useState("Price: low To high");
    const [anchorEl, setAnchorEl] = useState(null);

    // ✅ Fetch cars from API
    useEffect(() => {
        const fetchCars = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('/api/cars');
                if (!response.ok) throw new Error('Failed to fetch');
                const data = await response.json();
                setCars(data);
            } catch (error) {
                console.error("Error fetching cars:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCars();
    }, []);

    // ✅ Filtering & Sorting Logic
    const filteredCars = cars
        .filter(car => {
            // Name Filter
            const matchesName = car.name.toLowerCase().includes(searchName.toLowerCase());
            
            // Price Filter
            const matchesPrice = car.price >= priceRange[0] && car.price <= priceRange[1];

            // Type Filter
            const matchesType = selectedTypes.length === 0 || selectedTypes.includes(car.type);

            return matchesName && matchesPrice && matchesType;
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
                p: { xs: 0, lg: 1 },
                border: "1px solid #e0e0e0", 
                borderRadius: 2,
            }}>
                <CarSearchForm />
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
                    <CarFilters 
                        carCount={filteredCars.length} 
                        searchName={searchName}
                        onSearchNameChange={setSearchName}
                        priceRange={priceRange}
                        onPriceChange={setPriceRange}
                        selectedTypes={selectedTypes}
                        onTypesChange={setSelectedTypes}
                        carTypes={[...new Set(cars.map(c => c.type))]}
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
                                {filteredCars.length} Car{filteredCars.length !== 1 ? 's' : ''}
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
                        <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
                            <CircularProgress sx={{ color: "#1A53FF" }} />
                        </Box>
                    ) : (
                        <Box sx={{ display: "flex", flexDirection: "column", maxWidth: "680px" }}>
                            {filteredCars.map((car) => (
                                <CarCard key={car.id} car={car} />
                            ))}
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    );
}
