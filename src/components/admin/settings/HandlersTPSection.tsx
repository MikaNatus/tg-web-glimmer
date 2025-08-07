import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, Edit2, Trash2, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Handler {
  id: string;
  userId: string;
  username: string;
  type: 'handler' | 'tp';
  handlerPercent: number;
  tpPercent: number;
  addedAt: string;
}

export function HandlersTPSection() {
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingHandler, setEditingHandler] = useState<Handler | null>(null);
  const [formData, setFormData] = useState({
    userId: '',
    type: 'handler' as 'handler' | 'tp',
    handlerPercent: 10,
    tpPercent: 5
  });
  const [handlers, setHandlers] = useState<Handler[]>([
    { id: '1', userId: '123456789', username: 'handler1', type: 'handler', handlerPercent: 10, tpPercent: 5, addedAt: '2024-01-15' },
    { id: '2', userId: '987654321', username: 'tp_user1', type: 'tp', handlerPercent: 8, tpPercent: 12, addedAt: '2024-01-20' },
  ]);

  const filteredHandlers = handlers.filter(handler => 
    handler.username.toLowerCase().includes(search.toLowerCase()) ||
    handler.userId.includes(search)
  );

  const handleSubmit = () => {
    if (!formData.userId.trim()) {
      toast({
        title: "Ошибка",
        description: "Введите ID пользователя",
        variant: "destructive",
      });
      return;
    }

    if (editingHandler) {
      setHandlers(handlers.map(h => 
        h.id === editingHandler.id 
          ? { ...h, ...formData, username: `user_${formData.userId.slice(-4)}` }
          : h
      ));
      toast({
        title: "Успешно",
        description: "Данные обновлены",
      });
    } else {
      const newHandler: Handler = {
        id: Date.now().toString(),
        userId: formData.userId,
        username: `user_${formData.userId.slice(-4)}`,
        type: formData.type,
        handlerPercent: formData.handlerPercent,
        tpPercent: formData.tpPercent,
        addedAt: new Date().toISOString().split('T')[0]
      };
      setHandlers([...handlers, newHandler]);
      toast({
        title: "Успешно",
        description: "Пользователь добавлен",
      });
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({ userId: '', type: 'handler', handlerPercent: 10, tpPercent: 5 });
    setEditingHandler(null);
    setIsAddModalOpen(false);
  };

  const handleEdit = (handler: Handler) => {
    setFormData({
      userId: handler.userId,
      type: handler.type,
      handlerPercent: handler.handlerPercent,
      tpPercent: handler.tpPercent
    });
    setEditingHandler(handler);
    setIsAddModalOpen(true);
  };

  const handleDelete = (handlerId: string) => {
    setHandlers(handlers.filter(h => h.id !== handlerId));
    toast({
      title: "Успешно",
      description: "Пользователь удален",
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
        <Dialog open={isAddModalOpen} onOpenChange={(open) => {
          setIsAddModalOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button className="gradient-primary">
              <Plus className="w-4 h-4 mr-2" />
              Добавить
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingHandler ? 'Редактировать' : 'Добавить'} пользователя
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="user-id">ID пользователя</Label>
                <Input
                  id="user-id"
                  placeholder="Введите ID пользователя"
                  value={formData.userId}
                  onChange={(e) => setFormData({...formData, userId: e.target.value})}
                />
              </div>
              <div>
                <Label>Тип</Label>
                <Select value={formData.type} onValueChange={(value: 'handler' | 'tp') => setFormData({...formData, type: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="handler">Ручка</SelectItem>
                    <SelectItem value="tp">ТП</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="handler-percent">% за ручку</Label>
                  <Input
                    id="handler-percent"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.handlerPercent}
                    onChange={(e) => setFormData({...formData, handlerPercent: parseInt(e.target.value) || 0})}
                  />
                </div>
                <div>
                  <Label htmlFor="tp-percent">% за ТП</Label>
                  <Input
                    id="tp-percent"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.tpPercent}
                    onChange={(e) => setFormData({...formData, tpPercent: parseInt(e.target.value) || 0})}
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={resetForm} className="flex-1">
                  Отмена
                </Button>
                <Button onClick={handleSubmit} className="flex-1 gradient-primary">
                <Button onClick={handleSubmit} className="flex-1 gradient-primary hover:opacity-90">
                  {editingHandler ? 'Сохранить' : 'Добавить'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Handlers List */}
      <div className="space-y-3">
        {filteredHandlers.map((handler) => (
          <Card key={handler.id} className="shadow-card gradient-secondary border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg gradient-primary shadow-glow">
                    <Users className="w-4 h-4 text-background" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{handler.username}</p>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        handler.type === 'handler' 
                          ? 'bg-blue-500/20 text-blue-400' 
                          : 'bg-green-500/20 text-green-400'
                      }`}>
                        {handler.type === 'handler' ? 'Ручка' : 'ТП'}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">ID: {handler.userId}</p>
                    <p className="text-xs text-muted-foreground">
                      Ручка: {handler.handlerPercent}% | ТП: {handler.tpPercent}%
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(handler)}
                    className="hover:bg-secondary/80"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(handler.id)}
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
    </div>
  );
}