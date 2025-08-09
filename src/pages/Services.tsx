import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ServicesProps {
  categoryId: string;
  categoryName: string;
  onBack: () => void;
  onServiceSelect: (serviceId: string, serviceName: string) => void;
}

// Mock services data
const servicesData: Record<string, Array<{id: string, name: string, logo: string}>> = {
  marketplace: [
    { id: "wildberries", name: "Wildberries", logo: "🛍️" },
    { id: "ozon", name: "Ozon", logo: "📦" },
    { id: "avito", name: "Avito", logo: "🏪" },
    { id: "aliexpress", name: "AliExpress", logo: "🛒" },
  ],
  boards: [
    { id: "youla", name: "Youla", logo: "📋" },
    { id: "drom", name: "Drom", logo: "📰" },
  ],
  auto: [
    { id: "auto-ru", name: "Auto.ru", logo: "🚗" },
    { id: "drom-auto", name: "Drom", logo: "🚙" },
  ],
  delivery: [
    { id: "yandex-eda", name: "Яндекс.Еда", logo: "🍕" },
    { id: "delivery-club", name: "Delivery Club", logo: "🥡" },
  ],
  realty: [
    { id: "cian", name: "Циан", logo: "🏠" },
    { id: "avito-realty", name: "Авито Недвижимость", logo: "🏢" },
  ],
  banks: [
    { id: "sberbank", name: "Сбербанк", logo: "🏦" },
    { id: "tinkoff", name: "Тинькофф", logo: "💳" },
  ],
  travel: [
    { id: "aviasales", name: "Aviasales", logo: "✈️" },
    { id: "booking", name: "Booking.com", logo: "🏨" },
  ],
  pets: [
    { id: "petshop", name: "Petshop", logo: "🐕" },
    { id: "zoopassage", name: "Зоопассаж", logo: "🐱" },
  ],
  shops: [
    { id: "mvideo", name: "М.Видео", logo: "📱" },
    { id: "eldorado", name: "Эльдорадо", logo: "💻" },
  ],
};

export const Services = ({ categoryId, categoryName, onBack, onServiceSelect }: ServicesProps) => {
  const services = servicesData[categoryId] || [];

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
            <h1 className="text-xl font-bold">{categoryName}</h1>
          </motion.div>
        </div>
      </div>

      <motion.div 
        className="max-w-md mx-auto p-4"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        {/* Services Grid */}
        <div className="grid gap-3">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className="p-4 cursor-pointer hover:shadow-glow transition-all duration-200 shadow-card"
                onClick={() => onServiceSelect(service.id, service.name)}
              >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-secondary/50 flex items-center justify-center text-2xl">
                  {service.logo}
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{service.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Доступны домены для создания ссылок
                  </p>
                </div>
              </div>
            </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};