import React, { useState } from 'react';
import { Plus, Trash2, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChatModal } from './ChatModal';

interface Chat {
  id: number;
  chatId: string;
  type: 'none' | 'all' | 'success' | 'errors';
  category: 'workers' | 'admin' | 'logs' | 'statistics' | 'applications';
  name: string;
}

const mockChats: Chat[] = [
  {
    id: 1,
    chatId: '-1001234567890',
    type: 'all',
    category: 'workers',
    name: 'Воркеры - Все'
  },
  {
    id: 2,
    chatId: '-1001234567891',
    type: 'success',
    category: 'admin',
    name: 'Админка - Успешные'
  }
];

export function ChatsSection() {
  const [chats, setChats] = useState(mockChats);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddChat = () => {
    setSelectedChat(null);
    setIsModalOpen(true);
  };

  const handleEditChat = (chat: Chat) => {
    setSelectedChat(chat);
    setIsModalOpen(true);
  };

  const handleDeleteChat = (chatId: number) => {
    setChats(chats.filter(chat => chat.id !== chatId));
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Управление чатами</h3>
        <Button onClick={handleAddChat}>
        <Button onClick={handleAddChat} className="gradient-primary hover:opacity-90">
          <Plus className="h-4 w-4 mr-2" />
          Добавить чат
        </Button>
      </div>

      <div className="grid gap-4">
        {chats.map((chat) => (
          <Card key={chat.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{chat.name}</span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditChat(chat)}
                    className="gradient-primary hover:opacity-90 text-white border-0"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteChat(chat.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">ID чата</label>
                  <p className="font-mono text-sm">{chat.chatId}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Тип</label>
                  <Badge variant="secondary" className="mt-1">
                    {getTypeLabel(chat.type)}
                  </Badge>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Принадлежность</label>
                  <Badge variant="outline" className="mt-1">
                    {getCategoryLabel(chat.category)}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <ChatModal
        chat={selectedChat}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedChat(null);
        }}
        onSave={(chatData) => {
          if (selectedChat) {
            setChats(chats.map(chat => 
              chat.id === selectedChat.id 
                ? { ...chatData, id: selectedChat.id }
                : chat
            ));
          } else {
            setChats([...chats, { ...chatData, id: Date.now() }]);
          }
          setIsModalOpen(false);
          setSelectedChat(null);
        }}
      />
    </div>
  );
}