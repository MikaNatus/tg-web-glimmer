import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { QrCode, CreditCard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function PaymentSystemsSection() {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    autoQR: true,
    autoSBPv2: false
  });

  const handleToggle = (setting: 'autoQR' | 'autoSBPv2', value: boolean) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
    
    toast({
      title: "Настройки сохранены",
      description: `${setting === 'autoQR' ? 'Авто QR' : 'Авто СБП v2'} ${value ? 'включено' : 'отключено'}`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        <Card className="shadow-card gradient-secondary border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 rounded-lg gradient-primary shadow-glow">
                <QrCode className="w-5 h-5 text-background" />
              </div>
              Авто QR
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="auto-qr" className="text-base font-medium">
                  Автоматическое создание QR кодов
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Автоматически создавать QR коды для платежей
                </p>
              </div>
              <Switch
                id="auto-qr"
                checked={settings.autoQR}
                onCheckedChange={(checked) => handleToggle('autoQR', checked)}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card gradient-secondary border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 rounded-lg gradient-primary shadow-glow">
                <CreditCard className="w-5 h-5 text-background" />
              </div>
              Авто СБП v2
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="auto-sbp" className="text-base font-medium">
                  Система быстрых платежей v2
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Автоматическая обработка платежей через СБП
                </p>
              </div>
              <Switch
                id="auto-sbp"
                checked={settings.autoSBPv2}
                onCheckedChange={(checked) => handleToggle('autoSBPv2', checked)}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status Summary */}
      <Card className="shadow-card gradient-secondary border-0">
        <CardContent className="p-4">
          <h4 className="font-medium mb-3">Статус платежных систем</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Авто QR</span>
              <span className={`text-xs px-2 py-1 rounded-full ${
                settings.autoQR 
                  ? 'bg-green-500/20 text-green-400' 
                  : 'bg-red-500/20 text-red-400'
              }`}>
                {settings.autoQR ? 'Активно' : 'Отключено'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Авто СБП v2</span>
              <span className={`text-xs px-2 py-1 rounded-full ${
                settings.autoSBPv2 
                  ? 'bg-green-500/20 text-green-400' 
                  : 'bg-red-500/20 text-red-400'
              }`}>
                {settings.autoSBPv2 ? 'Активно' : 'Отключено'}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}