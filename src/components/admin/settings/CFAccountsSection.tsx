import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export function CFAccountsSection() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">CF Аккаунты</h3>
      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground">Cloudflare аккаунты</p>
        </CardContent>
      </Card>
    </div>
  );
}