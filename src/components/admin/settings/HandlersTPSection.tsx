import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export function HandlersTPSection() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Ручки/ТП</h3>
      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground">Управление ручками и ТП</p>
        </CardContent>
      </Card>
    </div>
  );
}