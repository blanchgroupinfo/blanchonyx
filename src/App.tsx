import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import HeritageJudah from "./pages/HeritageJudah";
import HeedHealth from "./pages/heed/Health";
import HeedEducation from "./pages/heed/Education";
import HeedEnterprising from "./pages/heed/Enterprising";
import HeedDevelopment from "./pages/heed/Development";
import Membership from "./pages/Membership";
import BlanchOnyxDLT from "./pages/BlanchOnyxDLT";
import UniversalBusinessNetwork from "./pages/UniversalBusinessNetwork";
import Marketplace from "./pages/Marketplace";
import SocialClub from "./pages/SocialClub";
import Press from "./pages/Press";
import Tokens from "./pages/Tokens";
import Coin from "./pages/Coin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/heritage/judah" element={<HeritageJudah />} />
          <Route path="/heed/health" element={<HeedHealth />} />
          <Route path="/heed/education" element={<HeedEducation />} />
          <Route path="/heed/enterprising" element={<HeedEnterprising />} />
          <Route path="/heed/development" element={<HeedDevelopment />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/dlt" element={<BlanchOnyxDLT />} />
          <Route path="/universal-business-network" element={<UniversalBusinessNetwork />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/social-club" element={<SocialClub />} />
          <Route path="/press" element={<Press />} />
          <Route path="/tokens" element={<Tokens />} />
          <Route path="/coin" element={<Coin />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
