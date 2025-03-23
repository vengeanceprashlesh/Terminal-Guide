
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import Index from "./pages/Index";
import Airports from "./pages/Airports";
import AirportDetail from "./pages/AirportDetail";
import Navigation from "./pages/Navigation";
import Luggage from "./pages/Luggage";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/airports" element={<Airports />} />
          <Route path="/airports/:id" element={<AirportDetail />} />
          <Route path="/navigation" element={<Navigation />} />
          <Route path="/luggage" element={<Luggage />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
