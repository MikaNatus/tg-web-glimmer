import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function PercentagesSection() {
  const [percentages, setPercentages] = useState({
    payment: '5',
    refund: '3',
    low: '2',
    sbp: '1.5',
    qr: '2',
    qrUzbek: '3',
    direct: '4',
    minAmount: '100',
    lowAmount: '50'
  });

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Проценты</h3>
      
      <Card>
        <CardHeader>
          <CardTitle>Настройка процентов</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Оплата (%)</Label>
              <Input value={percentages.payment} onChange={(e) => setPercentages({...percentages, payment: e.target.value})} />
            </div>
            <div>
              <Label>Возврат (%)</Label>
              <Input value={percentages.refund} onChange={(e) => setPercentages({...percentages, refund: e.target.value})} />
            </div>
            <div>
              <Label>Лоу (%)</Label>
              <Input value={percentages.low} onChange={(e) => setPercentages({...percentages, low: e.target.value})} />
            </div>
            <div>
              <Label>СБП (%)</Label>
              <Input value={percentages.sbp} onChange={(e) => setPercentages({...percentages, sbp: e.target.value})} />
            </div>
            <div>
              <Label>QR (%)</Label>
              <Input value={percentages.qr} onChange={(e) => setPercentages({...percentages, qr: e.target.value})} />
            </div>
            <div>
              <Label>QR UZBEK (%)</Label>
              <Input value={percentages.qrUzbek} onChange={(e) => setPercentages({...percentages, qrUzbek: e.target.value})} />
            </div>
            <div>
              <Label>Прямой (%)</Label>
              <Input value={percentages.direct} onChange={(e) => setPercentages({...percentages, direct: e.target.value})} />
            </div>
            <div>
              <Label>Мин. сумма</Label>
              <Input value={percentages.minAmount} onChange={(e) => setPercentages({...percentages, minAmount: e.target.value})} />
            </div>
            <div>
              <Label>Лоу сумма</Label>
              <Input value={percentages.lowAmount} onChange={(e) => setPercentages({...percentages, lowAmount: e.target.value})} />
            </div>
          </div>
          <Button className="mt-4">Сохранить изменения</Button>
        </CardContent>
      </Card>
    </div>
  );
}