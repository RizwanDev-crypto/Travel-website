import Flightlisting from "@/component/HeroSection/components/flight/flightlist/flightlisting"; 
import { Box } from "@mui/material";

export default async function FlightsPage({ params }) {
  // Next.js 14+ mein params ek Promise hai, await karna zaroori hai
  const resolvedParams = await params;
  const slug = resolvedParams.slug || [];
  
  console.log("Slug from page:", slug);
  
  return (
    <Box className="bg-white dark:bg-gray-800" sx={{ minHeight: "100vh", overflow: "hidden" }}> 
      <Flightlisting slug={slug} />
    </Box>
  );
}