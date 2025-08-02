import { useState } from "react";
import { ArrowLeft, Package, Upload, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  price: string;
  discount: string;
  image: File | null;
}

const EditLink = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();

  // Текущие данные ссылки (в реальном приложении загружались бы по ID)
  const [currentDomain] = useState("wb-helper.ru");
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [pvzDelivery, setPvzDelivery] = useState("200");
  const [courierDelivery, setCourierDelivery] = useState("300");
  const [products, setProducts] = useState<Product[]>([
    { 
      id: "1", 
      name: "Телевизор Philips 65\"", 
      price: "45000", 
      discount: "15", 
      image: null 
    }
  ]);

  // Доступные домены для выбора
  const availableDomains = [
    { name: "wb-helper.ru", status: "working" },
    { name: "wildberries-shop.com", status: "not-working" },
    { name: "wb-goods.net", status: "working" },
    { name: "ozon-market.ru", status: "working" },
    { name: "marketplace-api.com", status: "working" }
  ];

  const addProduct = () => {
    const newProduct: Product = {
      id: Date.now().toString(),
      name: "",
      price: "",
      discount: "",
      image: null
    };
    setProducts([...products, newProduct]);
  };

  const removeProduct = (productId: string) => {
    if (products.length > 1) {
      setProducts(products.filter(p => p.id !== productId));
    }
  };

  const updateProduct = (productId: string, field: keyof Product, value: string | File | null) => {
    setProducts(products.map(p => 
      p.id === productId ? { ...p, [field]: value } : p
    ));
  };

  const handleImageUpload = (productId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      updateProduct(productId, "image", file);
    }
  };

  const handleSave = () => {
    // Validation
    if (!pvzDelivery || !courierDelivery) {
      toast({
        title: "Ошибка",
        description: "Заполните стоимость доставки",
        variant: "destructive",
      });
      return;
    }

    const hasEmptyProducts = products.some(p => !p.name || !p.price);
    if (hasEmptyProducts) {
      toast({
        title: "Ошибка", 
        description: "Заполните все поля товаров",
        variant: "destructive",
      });
      return;
    }

    // Логика сохранения изменений
    console.log("Saving changes:", { 
      domain: selectedDomain || currentDomain, 
      pvzDelivery, 
      courierDelivery, 
      products 
    });
    
    toast({
      title: "Изменения сохранены!",
      description: "Ссылка успешно обновлена",
    });
    
    navigate(`/view-link/${id}`);
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
              <p className="text-sm text-muted-foreground">{currentDomain}</p>
            </div>
          </div>
        </Card>

        {/* Domain Selection */}
        <Card className="p-4 border-border">
          <h3 className="font-medium mb-4">Изменить домен</h3>
          <div className="space-y-2">
            {availableDomains.map((domain) => (
              <div
                key={domain.name}
                className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-all ${
                  selectedDomain === domain.name
                    ? "border-primary bg-primary/5"
                    : domain.name === currentDomain
                    ? "border-success bg-success/5"
                    : "border-border hover:border-primary/50"
                }`}
                onClick={() => setSelectedDomain(domain.name === currentDomain ? null : domain.name)}
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
                  {domain.name === currentDomain && (
                    <span className="text-xs bg-success text-success-foreground px-2 py-1 rounded">
                      Текущий
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Delivery Costs */}
        <Card className="p-4 border-border">
          <h3 className="font-medium mb-4">Стоимость доставки</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="pvz-delivery">Доставка в ПВЗ (₽)</Label>
              <Input
                id="pvz-delivery"
                type="number"
                placeholder="Введите стоимость"
                value={pvzDelivery}
                onChange={(e) => setPvzDelivery(e.target.value)}
                className="bg-secondary border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="courier-delivery">Доставка курьером (₽)</Label>
              <Input
                id="courier-delivery"
                type="number"
                placeholder="Введите стоимость"
                value={courierDelivery}
                onChange={(e) => setCourierDelivery(e.target.value)}
                className="bg-secondary border-border"
              />
            </div>
          </div>
        </Card>

        {/* Products */}
        <Card className="p-4 border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Товары</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={addProduct}
              className="hover:bg-secondary/80"
            >
              <Plus className="w-4 h-4 mr-1" />
              Добавить
            </Button>
          </div>
          
          <div className="space-y-4">
            {products.map((product, index) => (
              <div key={product.id} className="p-4 bg-secondary/30 rounded-lg border border-border">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium">Товар {index + 1}</span>
                  {products.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeProduct(product.id)}
                      className="hover:bg-destructive/20 text-destructive hover:text-destructive p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label>Название товара</Label>
                    <Input
                      placeholder="Введите название"
                      value={product.name}
                      onChange={(e) => updateProduct(product.id, "name", e.target.value)}
                      className="bg-background border-border"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label>Цена (₽)</Label>
                      <Input
                        type="number"
                        placeholder="0"
                        value={product.price}
                        onChange={(e) => updateProduct(product.id, "price", e.target.value)}
                        className="bg-background border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Скидка (%)</Label>
                      <Input
                        type="number"
                        placeholder="0"
                        value={product.discount}
                        onChange={(e) => updateProduct(product.id, "discount", e.target.value)}
                        className="bg-background border-border"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Изображение товара</Label>
                    <div className="flex items-center gap-3">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(product.id, e)}
                        className="hidden"
                        id={`image-${product.id}`}
                      />
                      <Label
                        htmlFor={`image-${product.id}`}
                        className="flex items-center gap-2 px-3 py-2 bg-secondary hover:bg-secondary/80 rounded-md cursor-pointer border border-border transition-colors"
                      >
                        <Upload className="w-4 h-4" />
                        Выбрать файл
                      </Label>
                      {product.image && (
                        <span className="text-sm text-muted-foreground">
                          {product.image.name}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Save Button */}
        <Button
          onClick={handleSave}
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