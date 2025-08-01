import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { Settings } from "./pages/Settings";
import { Links } from "./pages/Links";
import { Services } from "./pages/Services";
import { Domains } from "./pages/Domains";
import { CreateLink } from "./pages/CreateLink";
import ViewLink from "./pages/ViewLink";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/settings" element={<Settings onBack={() => window.history.back()} />} />
          <Route path="/my-links" element={<Links onBack={() => window.history.back()} />} />
          <Route path="/services/:category" element={<Services categoryId="temp" categoryName="temp" onBack={() => window.history.back()} onServiceSelect={() => {}} />} />
          <Route path="/domains/:category/:service" element={<Domains serviceId="temp" serviceName="temp" onBack={() => window.history.back()} onDomainSelect={() => {}} />} />
          <Route path="/create-link/:category/:service/:domain" element={<CreateLink domain="temp" onBack={() => window.history.back()} onLinkCreated={() => {}} />} />
          <Route path="/view-link/:id" element={<ViewLink />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
