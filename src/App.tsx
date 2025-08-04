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
import EditLink from "./pages/EditLink";
import Statistics from "./pages/Statistics";
import { Application } from "./pages/Application";
import { ApplicationRejected } from "./pages/ApplicationRejected";
import { ApplicationPending } from "./pages/ApplicationPending";

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
          <Route path="/edit-link/:id" element={<EditLink />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/application" element={<Application onBack={() => window.history.back()} />} />
          <Route path="/application-rejected" element={<ApplicationRejected onBack={() => window.history.back()} />} />
          <Route path="/application-pending" element={<ApplicationPending onBack={() => window.history.back()} />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
