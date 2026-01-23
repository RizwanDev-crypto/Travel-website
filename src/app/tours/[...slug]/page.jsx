import TourListing from "@/component/HeroSection/components/Tour/Tourlist/TourListing";
import { Box } from "@mui/material";

export default async function ToursPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug || [];
  
  console.log("Tour Slug from page:", slug);
  
  return (
    <Box className="bg-white dark:bg-gray-800" sx={{ minHeight: "100vh", overflow: "hidden" }}> 
      <TourListing slug={slug} />
    </Box>
  );
}
