import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Search, Plus, Trash2, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Admin {
  id: string;
  userId: string;
  username: string;
  addedAt: string;
}

export function AdminsSection() {
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newAdminId, setNewAdminId] = useState('');
  const [admins, setAdmins] = useState<Admin[]>([
    { id: '1', userId: '123456789', username: 'admin1', addedAt: '2024-01-15' },
    { id: '2', userId: '987654321', username: 'admin2', addedAt: '2024-01-20' },
    { id: '3', userId: '456789123', username: 'admin3', addedAt: '2024-02-01' },
  ]);

  const itemsPerPage = 5;
  const filteredAdmins = admins.filter(admin => 
    admin.username.toLowerCase().includes(search.toLowerCase()) ||
    admin.userId.includes(search)
  );
  const totalPages = Math.ceil(filteredAdmins.length / itemsPerPage);
  const paginatedAdmins = filteredAdmins.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAddAdmin = () => {
    if (!newAdminId.trim()) {
      toast({
        title: "Ошибка",
        description: "Введите ID пользователя",
        variant: "destructive",
      });
      return;
    }

    const newAdmin: Admin = {
      id: Date.now().toString(),
      userId: newAdminId,
      username: `user_${newAdminId.slice(-4)}`,
      addedAt: new Date().toISOString().split('T')[0]
    };

    setAdmins([...admins, newAdmin]);
    setNewAdminId('');
    setIsAddModalOpen(false);
    toast({
      title: "Успешно",
      description: "Администратор добавлен",
    });
  };

  const handleDeleteAdmin = (adminId: string) => {
    setAdmins(admins.filter(admin => admin.id !== adminId));
    toast({
      title: "Успешно",
      description: "Администратор удален",
    });
  };

  return (
    <div className="space-y-6">
      {/* Search and Add */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Поиск по имени или ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="gradient-primary">
              <Plus className="w-4 h-4 mr-2" />
              Добавить
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Добавить администратора</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="admin-id">ID пользователя</Label>
                <Input
                  id="admin-id"
                  placeholder="Введите ID пользователя"
                  value={newAdminId}
                  onChange={(e) => setNewAdminId(e.target.value)}
                />
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setIsAddModalOpen(false)} className="flex-1">
                  Отмена
                </Button>
                <Button onClick={handleAddAdmin} className="flex-1 gradient-primary">
                <Button onClick={handleAddAdmin} className="flex-1 gradient-primary hover:opacity-90">
                  Добавить
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Admins List */}
      <div className="space-y-3">
        {paginatedAdmins.map((admin) => (
          <Card key={admin.id} className="shadow-card gradient-secondary border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg gradient-primary shadow-glow">
                    <User className="w-4 h-4 text-background" />
                  </div>
                  <div>
                    <p className="font-medium">{admin.username}</p>
                    <p className="text-sm text-muted-foreground">ID: {admin.userId}</p>
                    <p className="text-xs text-muted-foreground">Добавлен: {admin.addedAt}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteAdmin(admin.id)}
                  className="hover:bg-destructive/20 text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            Назад
          </Button>
          <span className="flex items-center px-3 text-sm">
            {currentPage} из {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            Вперед
          </Button>
        </div>
      )}
    </div>
  );
}