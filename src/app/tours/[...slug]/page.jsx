import TourListing from "@/component/HeroSection/components/Tour/Tourlist/TourListing";
import TourDetails from "@/component/HeroSection/components/Tour/Tourlist/TourDetails";
import { Box } from "@mui/material";

export default async function ToursPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug || [];
  
  console.log("Tour Slug from page:", slug);

  // Check if we are viewing tour details
  if (slug[0] === "details" && slug[1]) {
    const tourId = slug[1];
    return (
      <Box className="bg-white dark:bg-gray-800" sx={{ minHeight: "100vh", overflow: "hidden" }}> 
        <TourDetails tourId={tourId} />
      </Box>
    );
  }
  
  return (
    <Box className="bg-white dark:bg-gray-800" sx={{ minHeight: "100vh", overflow: "hidden" }}> 
      <TourListing slug={slug} />
    </Box>
  );
}
