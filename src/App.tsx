import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "@/components/Header";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import RequestService from "./pages/RequestService";
import FindProviders from "./pages/FindProviders";
import ProviderProfile from "./pages/ProviderProfile";
import ServiceRequests from "./pages/ServiceRequests";
import Wallet from "./pages/Wallet";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

import { ThemeProvider } from "next-themes"; // ✅ Added import for dark mode

const queryClient = new QueryClient();

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
    {/* ✅ This will automatically change background/text when dark mode is active */}
    <Header />
    <main className="p-4">{children}</main>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ThemeProvider attribute="class" defaultTheme="light">
        {/* ✅ Wrap the entire app with ThemeProvider */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
            <Route path="/request-service" element={<Layout><RequestService /></Layout>} />
            <Route path="/find-providers" element={<Layout><FindProviders /></Layout>} />
            <Route path="/provider/:id" element={<Layout><ProviderProfile /></Layout>} />
            <Route path="/service-requests" element={<Layout><ServiceRequests /></Layout>} />
            <Route path="/wallet" element={<Layout><Wallet /></Layout>} />
            <Route path="/notifications" element={<Layout><Notifications /></Layout>} />
            <Route path="/settings" element={<Layout><Settings /></Layout>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
