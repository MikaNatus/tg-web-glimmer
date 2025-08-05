import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Chat {
  id: number;
  chatId: string;
  type: 'none' | 'all' | 'success' | 'errors';
  category: 'workers' | 'admin' | 'logs' | 'statistics' | 'applications';
  name: string;
}

interface ChatModalProps {
  chat: Chat | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (chat: Omit<Chat, 'id'>) => void;
}

export function ChatModal({ chat, isOpen, onClose, onSave }: ChatModalProps) {
  const [chatId, setChatId] = useState('');
  const [type, setType] = useState<Chat['type']>('none');
  const [category, setCategory] = useState<Chat['category']>('workers');
  const [name, setName] = useState('');

  useEffect(() => {
    if (chat) {
      setChatId(chat.chatId);
      setType(chat.type);
      setCategory(chat.category);
      setName(chat.name);
    } else {
      setChatId('');
      setType('none');
      setCategory('workers');
      setName('');
    }
  }, [chat]);

  const handleSave = () => {
    onSave({
      chatId,
      type,
      category,
      name: name || `${getCategoryLabel(category)} - ${getTypeLabel(type)}`
    });
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'none': return 'Нет';
      case 'all': return 'Все';
      case 'success': return 'Успешные';
      case 'errors': return 'Ошибки';
      default: return type;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'workers': return 'Воркеры';
      case 'admin': return 'Админка';
      case 'logs': return 'Логи';
      case 'statistics': return 'Статистика';
      case 'applications': return 'Заявки';
      default: return category;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {chat ? 'Редактировать чат' : 'Добавить чат'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="chatId">ID чата</Label>
            <Input
              id="chatId"
              placeholder="-1001234567890"
              value={chatId}
              onChange={(e) => setChatId(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="type">Тип чата</Label>
            <Select value={type} onValueChange={(value: Chat['type']) => setType(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите тип" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Нет</SelectItem>
                <SelectItem value="all">Все</SelectItem>
                <SelectItem value="success">Успешные</SelectItem>
                <SelectItem value="errors">Ошибки</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="category">Принадлежность</Label>
            <Select value={category} onValueChange={(value: Chat['category']) => setCategory(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите принадлежность" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="workers">Воркеры</SelectItem>
                <SelectItem value="admin">Админка</SelectItem>
                <SelectItem value="logs">Логи</SelectItem>
                <SelectItem value="statistics">Статистика</SelectItem>
                <SelectItem value="applications">Заявки</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="name">Название (опционально)</Label>
            <Input
              id="name"
              placeholder={`${getCategoryLabel(category)} - ${getTypeLabel(type)}`}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={onClose}>
              Отмена
            </Button>
            <Button onClick={handleSave} disabled={!chatId.trim()}>
              {chat ? 'Сохранить' : 'Добавить'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}