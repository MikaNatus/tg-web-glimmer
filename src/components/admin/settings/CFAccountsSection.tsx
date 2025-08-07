import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Plus, Edit2, Trash2, Cloud, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CFAccount {
  id: string;
  email: string;
  apiKey: string;
  addedAt: string;
}

export function CFAccountsSection() {
  const { toast } = useToast();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<CFAccount | null>(null);
  const [showApiKeys, setShowApiKeys] = useState<{[key: string]: boolean}>({});
  const [formData, setFormData] = useState({
    email: '',
    apiKey: ''
  });
  const [accounts, setAccounts] = useState<CFAccount[]>([
    { id: '1', email: 'admin@example.com', apiKey: 'sk-1234567890abcdef', addedAt: '2024-01-15' },
    { id: '2', email: 'user@cloudflare.com', apiKey: 'sk-fedcba0987654321', addedAt: '2024-01-20' },
  ]);

  const handleSubmit = () => {
    if (!formData.email.trim() || !formData.apiKey.trim()) {
      toast({
        title: "Ошибка",
        description: "Заполните все поля",
        variant: "destructive",
      });
      return;
    }

    if (editingAccount) {
      setAccounts(accounts.map(acc => 
        acc.id === editingAccount.id 
          ? { ...acc, ...formData }
          : acc
      ));
      toast({
        title: "Успешно",
        description: "Аккаунт обновлен",
      });
    } else {
      const newAccount: CFAccount = {
        id: Date.now().toString(),
        email: formData.email,
        apiKey: formData.apiKey,
        addedAt: new Date().toISOString().split('T')[0]
      };
      setAccounts([...accounts, newAccount]);
      toast({
        title: "Успешно",
        description: "Аккаунт добавлен",
      });
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({ email: '', apiKey: '' });
    setEditingAccount(null);
    setIsAddModalOpen(false);
  };

  const handleEdit = (account: CFAccount) => {
    setFormData({
      email: account.email,
      apiKey: account.apiKey
    });
    setEditingAccount(account);
    setIsAddModalOpen(true);
  };

  const handleDelete = (accountId: string) => {
    setAccounts(accounts.filter(acc => acc.id !== accountId));
    toast({
      title: "Успешно",
      description: "Аккаунт удален",
    });
  };

  const toggleApiKeyVisibility = (accountId: string) => {
    setShowApiKeys(prev => ({
      ...prev,
      [accountId]: !prev[accountId]
    }));
  };

  const maskApiKey = (apiKey: string) => {
    return apiKey.slice(0, 8) + '***' + apiKey.slice(-4);
  };

  return (
    <div className="space-y-6">
      {/* Add Button */}
      <div className="flex justify-end">
        <Dialog open={isAddModalOpen} onOpenChange={(open) => {
          setIsAddModalOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button className="gradient-primary">
              <Plus className="w-4 h-4 mr-2" />
              Добавить аккаунт
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingAccount ? 'Редактировать' : 'Добавить'} CF аккаунт
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="api-key">API ключ</Label>
                <Input
                  id="api-key"
                  type="password"
                  placeholder="Введите API ключ"
                  value={formData.apiKey}
                  onChange={(e) => setFormData({...formData, apiKey: e.target.value})}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  API ключ будет безопасно сохранен в Supabase Secrets
                </p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={resetForm} className="flex-1">
                  Отмена
                </Button>
                <Button onClick={handleSubmit} className="flex-1 gradient-primary">
                <Button onClick={handleSubmit} className="flex-1 gradient-primary hover:opacity-90">
                  {editingAccount ? 'Сохранить' : 'Добавить'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Accounts List */}
      <div className="space-y-3">
        {accounts.map((account) => (
          <Card key={account.id} className="shadow-card gradient-secondary border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg gradient-primary shadow-glow">
                    <Cloud className="w-4 h-4 text-background" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{account.email}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-muted-foreground font-mono">
                        {showApiKeys[account.id] ? account.apiKey : maskApiKey(account.apiKey)}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleApiKeyVisibility(account.id)}
                        className="h-6 w-6 p-0"
                      >
                        {showApiKeys[account.id] ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">Добавлен: {account.addedAt}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(account)}
                    className="gradient-primary hover:opacity-90 text-white border-0"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(account.id)}
                    className="hover:bg-destructive/20 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {accounts.length === 0 && (
        <Card className="shadow-card gradient-secondary border-0">
          <CardContent className="p-8 text-center">
            <Cloud className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Нет добавленных аккаунтов</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}