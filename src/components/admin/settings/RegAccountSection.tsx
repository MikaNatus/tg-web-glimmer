import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Edit2, User, Mail, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function RegAccountSection() {
  const { toast } = useToast();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [currentAccount, setCurrentAccount] = useState({
    email: 'reg@example.com',
    lastUpdated: '2024-01-15'
  });

  const handleEdit = () => {
    setFormData({
      email: currentAccount.email,
      password: ''
    });
    setIsEditModalOpen(true);
  };

  const handleSave = () => {
    if (!formData.email.trim()) {
      toast({
        title: "Ошибка",
        description: "Введите email",
        variant: "destructive",
      });
      return;
    }

    setCurrentAccount({
      email: formData.email,
      lastUpdated: new Date().toISOString().split('T')[0]
    });

    setIsEditModalOpen(false);
    toast({
      title: "Успешно",
      description: "Аккаунт REG обновлен",
    });
  };

  const resetForm = () => {
    setFormData({ email: '', password: '' });
    setIsEditModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-card gradient-secondary border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg gradient-primary shadow-glow">
                <User className="w-6 h-6 text-background" />
              </div>
              <div>
                <h4 className="font-medium mb-1">Аккаунт регистрации</h4>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <span>{currentAccount.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Lock className="w-4 h-4" />
                    <span>••••••••</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Обновлен: {currentAccount.lastUpdated}
                  </p>
                </div>
              </div>
            </div>
            <Dialog open={isEditModalOpen} onOpenChange={(open) => {
              setIsEditModalOpen(open);
              if (!open) resetForm();
            }}>
              <DialogTrigger asChild>
                <Button onClick={handleEdit} className="gradient-primary">
                  <Edit2 className="w-4 h-4 mr-2" />
                  Изменить
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Изменить аккаунт REG</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="reg-email">Email</Label>
                    <Input
                      id="reg-email"
                      type="email"
                      placeholder="Введите email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="reg-password">Пароль</Label>
                    <Input
                      id="reg-password"
                      type="password"
                      placeholder="Введите новый пароль"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Оставьте пустым, если не хотите менять пароль
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" onClick={resetForm} className="flex-1">
                      Отмена
                    </Button>
                    <Button onClick={handleSave} className="flex-1 gradient-primary">
                      Сохранить
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Account Status */}
      <Card className="shadow-card gradient-secondary border-0">
        <CardContent className="p-4">
          <h4 className="font-medium mb-3">Статус аккаунта</h4>
          <div className="flex items-center justify-between">
            <span className="text-sm">Состояние</span>
            <span className="text-xs px-2 py-1 rounded-full bg-green-500/20 text-green-400">
              Активен
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}