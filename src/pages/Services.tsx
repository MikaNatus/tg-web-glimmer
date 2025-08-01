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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-md mx-auto p-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="hover:bg-secondary/80"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-xl font-bold">{categoryName}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4">
        {/* Services Grid */}
        <div className="grid gap-3">
          {services.map((service) => (
            <Card
              key={service.id}
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
          ))}
        </div>
      </div>
    </div>
  );
};