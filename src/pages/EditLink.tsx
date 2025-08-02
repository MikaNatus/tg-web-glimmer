import { useState } from "react";
import { ArrowLeft, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const EditLink = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);

  // Моковые домены для выбора
  const mockDomains = [
    { name: "wb-helper.ru", status: "working" },
    { name: "ozon-market.ru", status: "working" },
    { name: "avito-realty.com", status: "not-working" },
    { name: "marketplace-api.com", status: "working" }
  ];

  const handleSave = () => {
    if (selectedDomain) {
      toast({
        title: "Домен изменен!",
        description: `Домен изменен на ${selectedDomain}`,
      });
      navigate(`/view-link/${id}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-md mx-auto p-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(`/view-link/${id}`)}
              className="hover:bg-secondary/80"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-xl font-bold">Редактирование ссылки</h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Current Domain Info */}
        <Card className="p-4 bg-secondary/50 border-border">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-primary" />
            <div>
              <p className="font-medium">Текущий домен</p>
              <p className="text-sm text-muted-foreground">wb-helper.ru</p>
            </div>
          </div>
        </Card>

        {/* Domain Selection */}
        <Card className="p-4 border-border">
          <h3 className="font-medium mb-4">Выберите новый домен</h3>
          <div className="space-y-2">
            {mockDomains.map((domain) => (
              <div
                key={domain.name}
                className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-all ${
                  selectedDomain === domain.name
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
                onClick={() => setSelectedDomain(domain.name)}
              >
                <div className="flex items-center gap-2">
                  <span className="font-medium">{domain.name}</span>
                  <div
                    className={`w-2 h-2 rounded-full ${
                      domain.status === "working" ? "bg-green-500" : "bg-red-500"
                    }`}
                  />
                  <span className="text-xs text-muted-foreground">
                    {domain.status === "working" ? "Работает" : "Не работает"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Save Button */}
        <Button
          onClick={handleSave}
          disabled={!selectedDomain}
          className="w-full gradient-primary hover:opacity-90"
          size="lg"
        >
          Сохранить изменения
        </Button>
      </div>
    </div>
  );
};

export default EditLink;