import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Info, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DomainInfoModal } from "@/components/DomainInfoModal";

interface DomainsProps {
  serviceId: string;
  serviceName: string;
  onBack: () => void;
  onDomainSelect: (domain: string) => void;
}

interface Domain {
  name: string;
  status: string;
  yandexCT: number;
  googleCT: number;
  megafonCT: number;
}

// Mock domains data
const domainsData: Record<string, Domain[]> = {
  wildberries: [
    { name: "wb-helper.ru", status: "работает", yandexCT: 1250, googleCT: 890, megafonCT: 340 },
    { name: "wildberries-shop.com", status: "не работает", yandexCT: 0, googleCT: 0, megafonCT: 0 },
    { name: "wb-goods.net", status: "работает", yandexCT: 760, googleCT: 1100, megafonCT: 520 },
  ],
  ozon: [
    { name: "ozon-market.ru", status: "работает", yandexCT: 980, googleCT: 1340, megafonCT: 290 },
    { name: "ozon-delivery.com", status: "работает", yandexCT: 650, googleCT: 800, megafonCT: 180 },
  ],
  // Add more domains for other services...
};

export const Domains = ({ serviceId, serviceName, onBack, onDomainSelect }: DomainsProps) => {
  const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  
  const domains = domainsData[serviceId] || [];

  const handleInfoClick = (domain: Domain, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedDomain(domain);
    setIsInfoModalOpen(true);
  };

  return (
    <motion.div 
      className="min-h-screen bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-md mx-auto p-4">
          <motion.div 
            className="flex items-center gap-3"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="hover:bg-secondary/80"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-xl font-bold">{serviceName}</h1>
          </motion.div>
        </div>
      </div>

      <motion.div 
        className="max-w-md mx-auto p-4"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <div className="space-y-3">
          {domains.map((domain, index) => (
            <motion.div
              key={domain.name}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className="p-4 cursor-pointer hover:shadow-glow transition-all duration-200 shadow-card"
                onClick={() => onDomainSelect(domain.name)}
              >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <Globe className="w-5 h-5 text-primary" />
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">{domain.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge 
                        variant={domain.status === "работает" ? "default" : "destructive"}
                        className={domain.status === "работает" ? "bg-success text-success-foreground" : ""}
                      >
                        {domain.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => handleInfoClick(domain, e)}
                  className="hover:bg-secondary/80 p-2"
                >
                  <Info className="w-4 h-4" />
                </Button>
              </div>
            </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {selectedDomain && (
        <DomainInfoModal
          isOpen={isInfoModalOpen}
          onClose={() => setIsInfoModalOpen(false)}
          domain={selectedDomain}
        />
      )}
    </motion.div>
  );
};