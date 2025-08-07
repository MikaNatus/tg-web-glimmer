import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function InvitesSection() {
  const [chatLink, setChatLink] = useState('https://t.me/example_chat');
  const [profitsLink, setProfitsLink] = useState('https://t.me/example_profits');

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Инвайты</h3>
      
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Ссылка на чат</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="chat-link">Ссылка</Label>
              <Input
                id="chat-link"
                value={chatLink}
                onChange={(e) => setChatLink(e.target.value)}
              />
            </div>
            <Button>Сохранить</Button>
            <Button className="gradient-primary hover:opacity-90">Сохранить</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ссылка на профиты</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="profits-link">Ссылка</Label>
              <Input
                id="profits-link"
                value={profitsLink}
                onChange={(e) => setProfitsLink(e.target.value)}
              />
            </div>
            <Button>Сохранить</Button>
            <Button className="gradient-primary hover:opacity-90">Сохранить</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}