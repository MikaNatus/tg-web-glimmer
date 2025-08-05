import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export function USDTRateSection() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Курс USDT</h3>
      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground">Управление курсом USDT</p>
        </CardContent>
      </Card>
    </div>
  );
}