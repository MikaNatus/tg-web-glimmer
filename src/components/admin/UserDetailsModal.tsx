import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Edit, Ban, ShoppingCart, DollarSign } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { BalanceModal } from './BalanceModal';

interface User {
  id: number;
  name: string;
  username: string;
  balance: number;
  status: 'active' | 'blocked';
  lastActive: string;
  avatar?: string;
  tag: string;
  activeAds: number;
  profitsCount: number;
  profitsSum: number;
  lastProfit: string;
  teamDuration: string;
  hold: number;
}

interface UserDetailsModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

export function UserDetailsModal({ user, isOpen, onClose }: UserDetailsModalProps) {
  const [isBalanceModalOpen, setIsBalanceModalOpen] = useState(false);

  if (!user) return null;

  const handleToggleBlock = () => {
    console.log('Toggling block status for user:', user.id);
  };

  const handleBuyDomain = () => {
    console.log('Buying .ru domain for user:', user.id);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Информация о пользователе</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* User Basic Info */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl font-semibold text-primary">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold">{user.name}</h3>
                <p className="text-muted-foreground">{user.username}</p>
                <Badge variant={user.status === 'active' ? 'default' : 'destructive'} className="mt-1">
                  {user.status === 'active' ? 'Активен' : 'Заблокирован'}
                </Badge>
              </div>
            </div>

            <Separator />

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">ID</label>
                  <p className="font-mono text-sm">{user.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Тег</label>
                  <p className="font-semibold">{user.tag}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Активные объявления</label>
                  <p className="font-semibold">{user.activeAds}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Количество профитов</label>
                  <p className="font-semibold">{user.profitsCount}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">В команде</label>
                  <p className="font-semibold">{user.teamDuration}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Баланс</label>
                  <p className="font-semibold text-green-600">${user.balance.toFixed(3)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Холд</label>
                  <p className="font-semibold text-orange-600">${user.hold.toFixed(3)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Сумма профитов</label>
                  <p className="font-semibold">{user.profitsSum.toLocaleString()} RUB</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Последний профит</label>
                  <p className="font-semibold">{user.lastProfit}</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={() => setIsBalanceModalOpen(true)}
                className="flex items-center gap-2 gradient-primary hover:opacity-90 text-white border-0"
              >
                <DollarSign className="h-4 w-4" />
                Изменить баланс
              </Button>
              
              <Button
                variant={user.status === 'active' ? 'destructive' : 'default'}
                onClick={handleToggleBlock}
                className={`flex items-center gap-2 ${user.status === 'active' ? '' : 'gradient-primary hover:opacity-90 text-white border-0'}`}
              >
                <Ban className="h-4 w-4" />
                {user.status === 'active' ? 'Заблокировать' : 'Разблокировать'}
              </Button>
              
              <Button
                variant="outline"
                onClick={handleBuyDomain}
                className="flex items-center gap-2 col-span-2 gradient-primary hover:opacity-90 text-white border-0"
              >
                <ShoppingCart className="h-4 w-4" />
                Купить домен .ru
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <BalanceModal
        user={user}
        isOpen={isBalanceModalOpen}
        onClose={() => setIsBalanceModalOpen(false)}
      />
    </>
  );
}