import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export function AdminsSection() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Администраторы</h3>
      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground mb-4">Управление администраторами системы</p>
          <Button>Добавить администратора</Button>
        </CardContent>
      </Card>
    </div>
  );
}