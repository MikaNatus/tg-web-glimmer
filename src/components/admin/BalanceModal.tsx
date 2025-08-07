import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface User {
  id: number;
  name: string;
  username: string;
  balance: number;
  hold: number;
}

interface BalanceModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

export function BalanceModal({ user, isOpen, onClose }: BalanceModalProps) {
  const [balanceAmount, setBalanceAmount] = useState('');
  const [holdAmount, setHoldAmount] = useState('');

  if (!user) return null;

  const handleUpdateBalance = () => {
    console.log('Updating balance for user:', user.id, 'amount:', balanceAmount);
    setBalanceAmount('');
    onClose();
  };

  const handleUpdateHold = () => {
    console.log('Updating hold for user:', user.id, 'amount:', holdAmount);
    setHoldAmount('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Изменить баланс - {user.name}</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="balance" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="balance">Баланс</TabsTrigger>
            <TabsTrigger value="hold">Холд</TabsTrigger>
          </TabsList>
          
          <TabsContent value="balance" className="space-y-4">
            <div>
              <Label htmlFor="current-balance">Текущий баланс</Label>
              <Input
                id="current-balance"
                value={`$${user.balance.toFixed(3)}`}
                disabled
                className="bg-muted"
              />
            </div>
            <div>
              <Label htmlFor="new-balance">Новый баланс</Label>
              <Input
                id="new-balance"
                placeholder="0.000"
                value={balanceAmount}
                onChange={(e) => setBalanceAmount(e.target.value)}
                type="number"
                step="0.001"
              />
            </div>
            <Button onClick={handleUpdateBalance} className="w-full">
            <Button onClick={handleUpdateBalance} className="w-full gradient-primary hover:opacity-90">
              Обновить баланс
            </Button>
          </TabsContent>
          
          <TabsContent value="hold" className="space-y-4">
            <div>
              <Label htmlFor="current-hold">Текущий холд</Label>
              <Input
                id="current-hold"
                value={`$${user.hold.toFixed(3)}`}
                disabled
                className="bg-muted"
              />
            </div>
            <div>
              <Label htmlFor="new-hold">Новый холд</Label>
              <Input
                id="new-hold"
                placeholder="0.000"
                value={holdAmount}
                onChange={(e) => setHoldAmount(e.target.value)}
                type="number"
                step="0.001"
              />
            </div>
            <Button onClick={handleUpdateHold} className="w-full">
            <Button onClick={handleUpdateHold} className="w-full gradient-primary hover:opacity-90">
              Обновить холд
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}