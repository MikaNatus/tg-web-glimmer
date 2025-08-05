import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export function PaymentSystemsSection() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Платежки</h3>
      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground">Настройки платежных систем</p>
        </CardContent>
      </Card>
    </div>
  );
}