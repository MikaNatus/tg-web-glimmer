import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Edit2, TrendingUp, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function USDTRateSection() {
  const { toast } = useToast();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newRate, setNewRate] = useState('');
  const [currentRate, setCurrentRate] = useState({
    rate: 92.50,
    lastUpdated: '2024-01-15 14:30',
    previousRate: 91.80
  });

  const handleEdit = () => {
    setNewRate(currentRate.rate.toString());
    setIsEditModalOpen(true);
  };

  const handleSave = () => {
    const rate = parseFloat(newRate);
    if (!rate || rate <= 0) {
      toast({
        title: "Ошибка",
        description: "Введите корректный курс",
        variant: "destructive",
      });
      return;
    }

    const previousRate = currentRate.rate;
    setCurrentRate({
      rate: rate,
      lastUpdated: new Date().toLocaleString('ru-RU'),
      previousRate: previousRate
    });

    setIsEditModalOpen(false);
    setNewRate('');
    toast({
      title: "Успешно",
      description: `Курс USDT обновлен: ${rate} ₽`,
    });
  };

  const resetForm = () => {
    setNewRate('');
    setIsEditModalOpen(false);
  };

  const rateChange = currentRate.rate - currentRate.previousRate;
  const rateChangePercent = (rateChange / currentRate.previousRate) * 100;

  return (
    <div className="space-y-6">
      <Card className="shadow-card gradient-secondary border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg gradient-primary shadow-glow">
                <DollarSign className="w-6 w-6 text-background" />
              </div>
              <div>
                <h4 className="font-medium mb-1">Текущий курс USDT</h4>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-foreground">
                    {currentRate.rate.toFixed(2)} ₽
                  </span>
                  <div className={`flex items-center gap-1 ${
                    rateChange >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    <TrendingUp className={`w-4 h-4 ${rateChange < 0 ? 'rotate-180' : ''}`} />
                    <span className="text-sm">
                      {rateChange >= 0 ? '+' : ''}{rateChange.toFixed(2)} 
                      ({rateChangePercent >= 0 ? '+' : ''}{rateChangePercent.toFixed(2)}%)
                    </span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Обновлен: {currentRate.lastUpdated}
                </p>
                <p className="text-xs text-muted-foreground">
                  Предыдущий курс: {currentRate.previousRate.toFixed(2)} ₽
                </p>
              </div>
            </div>
            <Dialog open={isEditModalOpen} onOpenChange={(open) => {
              setIsEditModalOpen(open);
              if (!open) resetForm();
            }}>
              <DialogTrigger asChild>
                <Button onClick={handleEdit} className="gradient-primary">
                  <Edit2 className="w-4 h-4 mr-2" />
                  Изменить
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Изменить курс USDT</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="usdt-rate">Новый курс (₽)</Label>
                    <Input
                      id="usdt-rate"
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="Введите курс"
                      value={newRate}
                      onChange={(e) => setNewRate(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Текущий курс: {currentRate.rate.toFixed(2)} ₽
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" onClick={resetForm} className="flex-1">
                      Отмена
                    </Button>
                    <Button onClick={handleSave} className="flex-1 gradient-primary">
                      Сохранить
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Rate History */}
      <Card className="shadow-card gradient-secondary border-0">
        <CardContent className="p-4">
          <h4 className="font-medium mb-3">История изменений</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>15.01.2024 14:30</span>
              <span className="text-green-400">+0.70 ₽ (92.50 ₽)</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>15.01.2024 10:15</span>
              <span className="text-red-400">-0.30 ₽ (91.80 ₽)</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>14.01.2024 16:45</span>
              <span className="text-green-400">+1.10 ₽ (92.10 ₽)</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}