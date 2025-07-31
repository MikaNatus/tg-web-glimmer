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

interface LinksProps {
  onBack: () => void;
}

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

export const Links = ({ onBack }: LinksProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Mock links data for selected category
  const mockLinks = [
    {
      id: "1",
      title: "Ссылка на товар #1",
      url: "https://example.com/product1",
      clicks: 156,
      profit: 250,
      status: "active",
    },
    {
      id: "2", 
      title: "Ссылка на товар #2",
      url: "https://example.com/product2",
      clicks: 89,
      profit: 180,
      status: "active",
    },
    {
      id: "3",
      title: "Ссылка на товар #3", 
      url: "https://example.com/product3",
      clicks: 23,
      profit: 45,
      status: "pending",
    },
  ];

  if (selectedCategory) {
    const category = categories.find(c => c.id === selectedCategory);
    
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="max-w-md mx-auto p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedCategory(null)}
                  className="hover:bg-secondary/80"
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
                <div className="flex items-center gap-3">
                  {category && <category.icon className={`w-5 h-5 ${category.color}`} />}
                  <h1 className="text-xl font-bold">{category?.name}</h1>
                </div>
              </div>
              <Button size="sm" className="gradient-primary">
                <Plus className="w-4 h-4 mr-1" />
                Добавить
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto p-4 space-y-4">
          {mockLinks.map((link) => (
            <Card key={link.id} className="p-4 shadow-card">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <h3 className="font-medium text-foreground">{link.title}</h3>
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

      <div className="max-w-md mx-auto p-4">
        {/* Categories Grid */}
        <div className="grid grid-cols-2 gap-3">
          {categories.map((category) => (
            <Card
              key={category.id}
              className="p-4 cursor-pointer hover:shadow-glow transition-all duration-200 shadow-card"
              onClick={() => setSelectedCategory(category.id)}
            >
              <div className="space-y-3">
                <div className={`w-12 h-12 rounded-lg ${category.bgColor} flex items-center justify-center`}>
                  <category.icon className={`w-6 h-6 ${category.color}`} />
                </div>
                <div>
                  <h3 className="font-medium text-sm leading-tight">{category.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {category.count} ссылок
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Create New Category Button */}
        <Card className="mt-4 p-4 border-dashed border-2 border-border hover:border-primary/50 cursor-pointer transition-colors">
          <div className="flex items-center justify-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <Plus className="w-5 h-5" />
            <span>Добавить категорию</span>
          </div>
        </Card>
      </div>
    </div>
  );
};