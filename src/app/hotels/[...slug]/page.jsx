import HotelListing from "@/component/HeroSection/components/Hotel/Hotellist/HotelListing";
import { Box } from "@mui/material";

export default async function HotelsPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug || [];
  
  console.log("Hotel Slug from page:", slug);
  
  return (
    <Box className="bg-white dark:bg-gray-800" sx={{ minHeight: "100vh", overflow: "hidden" }}> 
      <HotelListing slug={slug} />
    </Box>
  );
}
