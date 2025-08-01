import { useState } from "react";
import { 
  ArrowLeft, 
  ShoppingBag, 
  MessageSquare, 
  Car, 
  Truck, 
  Home, 
  CreditCard, 
  Plane, 
  Heart, 
  Store,
  Plus,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Services } from "./Services";
import { Domains } from "./Domains";
import { CreateLink } from "./CreateLink";

interface LinksProps {
  onBack: () => void;
  mode?: "create" | "view";
}

type ViewState = "categories" | "services" | "domains" | "create" | "links";

const categories = [
  {
    id: "marketplace",
    name: "Маркет-плейсы",
    icon: ShoppingBag,
    color: "text-green-400",
    bgColor: "bg-green-400/10",
    count: 15,
  },
  {
    id: "boards",
    name: "Доски объявлений",
    icon: MessageSquare,
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    count: 8,
  },
  {
    id: "auto",
    name: "Авто",
    icon: Car,
    color: "text-red-400",
    bgColor: "bg-red-400/10",
    count: 12,
  },
  {
    id: "delivery",
    name: "Доставки",
    icon: Truck,
    color: "text-orange-400",
    bgColor: "bg-orange-400/10",
    count: 6,
  },
  {
    id: "realty",
    name: "Недвижимость",
    icon: Home,
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
    count: 9,
  },
  {
    id: "banks",
    name: "Банки",
    icon: CreditCard,
    color: "text-yellow-400",
    bgColor: "bg-yellow-400/10",
    count: 7,
  },
  {
    id: "travel",
    name: "Поездки/перелеты",
    icon: Plane,
    color: "text-cyan-400",
    bgColor: "bg-cyan-400/10",
    count: 4,
  },
  {
    id: "pets",
    name: "Животные",
    icon: Heart,
    color: "text-pink-400",
    bgColor: "bg-pink-400/10",
    count: 3,
  },
  {
    id: "shops",
    name: "Магазины",
    icon: Store,
    color: "text-indigo-400",
    bgColor: "bg-indigo-400/10",
    count: 11,
  },
];

export const Links = ({ onBack, mode = "view" }: LinksProps) => {
  const [viewState, setViewState] = useState<ViewState>(mode === "create" ? "categories" : "links");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<{id: string, name: string} | null>(null);
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);

  // Mock links data
  const mockLinks = [
    {
      id: "1",
      title: "Ссылка на товар Wildberries #1", 
      url: "https://wb-helper.ru/product1",
      clicks: 156,
      profit: 250,
      status: "active",
      category: "Маркет-плейсы",
      service: "Wildberries",
      domain: "wb-helper.ru"
    },
    {
      id: "2", 
      title: "Ссылка на товар Ozon #1",
      url: "https://ozon-market.ru/product2", 
      clicks: 89,
      profit: 180,
      status: "active",
      category: "Маркет-плейсы",
      service: "Ozon",
      domain: "ozon-market.ru"
    },
    {
      id: "3",
      title: "Ссылка Авито Недвижимость", 
      url: "https://avito-realty.com/product3",
      clicks: 23,
      profit: 45,
      status: "pending",
      category: "Недвижимость", 
      service: "Авито",
      domain: "avito-realty.com"
    },
  ];

  // Navigation handlers
  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setViewState("services");
  };

  const handleServiceSelect = (serviceId: string, serviceName: string) => {
    setSelectedService({ id: serviceId, name: serviceName });
    setViewState("domains");
  };

  const handleDomainSelect = (domain: string) => {
    setSelectedDomain(domain);
    setViewState("create");
  };

  const handleLinkCreated = () => {
    setViewState("links");
    // Reset state
    setSelectedCategory(null);
    setSelectedService(null);
    setSelectedDomain(null);
  };

  // Render different views based on state
  if (viewState === "services" && selectedCategory) {
    const category = categories.find(c => c.id === selectedCategory);
    return (
      <Services
        categoryId={selectedCategory}
        categoryName={category?.name || ""}
        onBack={() => setViewState("categories")}
        onServiceSelect={handleServiceSelect}
      />
    );
  }

  if (viewState === "domains" && selectedService) {
    return (
      <Domains
        serviceId={selectedService.id}
        serviceName={selectedService.name}
        onBack={() => setViewState("services")}
        onDomainSelect={handleDomainSelect}
      />
    );
  }

  if (viewState === "create" && selectedDomain) {
    return (
      <CreateLink
        domain={selectedDomain}
        onBack={() => setViewState("domains")}
        onLinkCreated={handleLinkCreated}
      />
    );
  }

  // Links view (показать все ссылки)
  if (viewState === "links") {
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
              <h1 className="text-xl font-bold">Мои ссылки</h1>
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto p-4 space-y-4">
          {mockLinks.map((link) => (
            <Card key={link.id} className="p-4 shadow-card">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-foreground">{link.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {link.category} • {link.service}
                    </p>
                  </div>
                  <Badge 
                    variant={link.status === "active" ? "default" : "secondary"}
                    className={link.status === "active" ? "bg-success text-success-foreground" : ""}
                  >
                    {link.status === "active" ? "Активна" : "Ожидает"}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ExternalLink className="w-3 h-3" />
                  <span className="truncate">{link.url}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Переходов: <span className="text-foreground font-medium">{link.clicks}</span>
                  </span>
                  <span className="text-muted-foreground">
                    Профит: <span className="text-success font-medium">{link.profit}₽</span>
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Categories view (для создания ссылок)
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
            <h1 className="text-xl font-bold">Создать ссылку</h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4">
        {/* Categories Grid */}
        <div className="grid grid-cols-2 gap-3">
          {categories.map((category) => (
            <Card
              key={category.id}
              className="p-4 cursor-pointer hover:shadow-glow transition-all duration-200 shadow-card"
              onClick={() => handleCategorySelect(category.id)}
            >
              <div className="space-y-3">
                <div className={`w-12 h-12 rounded-lg ${category.bgColor} flex items-center justify-center`}>
                  <category.icon className={`w-6 h-6 ${category.color}`} />
                </div>
                <div>
                  <h3 className="font-medium text-sm leading-tight">{category.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {category.count} сервисов
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