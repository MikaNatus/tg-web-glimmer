import { useState } from "react";
import { ArrowLeft, Package, Upload, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface CreateLinkProps {
  domain: string;
  onBack: () => void;
  onLinkCreated: () => void;
}

interface Product {
  id: string;
  name: string;
  price: string;
  discount: string;
  image: File | null;
}

export const CreateLink = ({ domain, onBack, onLinkCreated }: CreateLinkProps) => {
  const { toast } = useToast();
  const [pvzDelivery, setPvzDelivery] = useState("");
  const [courierDelivery, setCourierDelivery] = useState("");
  const [products, setProducts] = useState<Product[]>([
    { id: "1", name: "", price: "", discount: "", image: null }
  ]);

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

  const removeProduct = (id: string) => {
    if (products.length > 1) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const updateProduct = (id: string, field: keyof Product, value: string | File | null) => {
    setProducts(products.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    ));
  };

  const handleImageUpload = (id: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      updateProduct(id, "image", file);
    }
  };

  const handleCreateLink = () => {
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

    // Here would be the link creation logic
    console.log("Creating link:", { domain, pvzDelivery, courierDelivery, products });
    
    toast({
      title: "Успешно",
      description: "Ссылка создана успешно",
    });
    
    onLinkCreated();
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
              onClick={onBack}
              className="hover:bg-secondary/80"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-xl font-bold">Создание ссылки</h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Domain Info */}
        <Card className="p-4 bg-secondary/50 border-border">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-primary" />
            <div>
              <p className="font-medium">Домен</p>
              <p className="text-sm text-muted-foreground">{domain}</p>
            </div>
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

        {/* Create Button */}
        <Button
          onClick={handleCreateLink}
          className="w-full gradient-primary hover:opacity-90"
          size="lg"
        >
          Создать ссылку
        </Button>
      </div>
    </div>
  );
};