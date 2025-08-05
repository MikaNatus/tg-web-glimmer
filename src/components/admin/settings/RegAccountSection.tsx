import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export function RegAccountSection() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Аккаунт REG</h3>
      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground">Настройки аккаунта регистрации</p>
        </CardContent>
      </Card>
    </div>
  );
}