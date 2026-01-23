import CarListing from "@/component/HeroSection/components/Car/Carlist/CarListing";
import { Box } from "@mui/material";

export default async function CarsPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug || [];
  
  console.log("Car Slug from page:", slug);
  
  return (
    <Box className="bg-white dark:bg-gray-800" sx={{ minHeight: "100vh", overflow: "hidden" }}> 
      <CarListing slug={slug} />
    </Box>
  );
}
