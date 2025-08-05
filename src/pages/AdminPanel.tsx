import React, { useState } from 'react';
import { ArrowLeft, MessageSquare, FileText, Users, BarChart3, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { NewsletterModal } from '@/components/admin/NewsletterModal';
import { ApplicationsPage } from '@/components/admin/ApplicationsPage';
import { UsersPage } from '@/components/admin/UsersPage';
import { StatisticsPage } from '@/components/admin/StatisticsPage';
import { SettingsPage } from '@/components/admin/SettingsPage';

interface AdminPanelProps {
  onBack: () => void;
}

type AdminSection = 'main' | 'applications' | 'users' | 'statistics' | 'settings';

export function AdminPanel({ onBack }: AdminPanelProps) {
  const [currentSection, setCurrentSection] = useState<AdminSection>('main');
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);

  const adminButtons = [
    {
      title: 'Рассылка',
      icon: MessageSquare,
      onClick: () => setIsNewsletterOpen(true),
      description: 'Отправка сообщений пользователям'
    },
    {
      title: 'Заявки',
      icon: FileText,
      onClick: () => setCurrentSection('applications'),
      description: 'Управление заявками на вступление'
    },
    {
      title: 'Пользователи',
      icon: Users,
      onClick: () => setCurrentSection('users'),
      description: 'Управление пользователями системы'
    },
    {
      title: 'Статистика',
      icon: BarChart3,
      onClick: () => setCurrentSection('statistics'),
      description: 'Просмотр статистики и аналитики'
    },
    {
      title: 'Настройки',
      icon: Settings,
      onClick: () => setCurrentSection('settings'),
      description: 'Настройки системы и конфигурация'
    }
  ];

  if (currentSection !== 'main') {
    return (
      <div className="min-h-screen bg-background">
        <div className="container max-w-7xl mx-auto p-4">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCurrentSection('main')}
              className="hover:bg-accent"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">
              {currentSection === 'applications' && 'Заявки'}
              {currentSection === 'users' && 'Пользователи'}
              {currentSection === 'statistics' && 'Статистика'}
              {currentSection === 'settings' && 'Настройки'}
            </h1>
          </div>

          {currentSection === 'applications' && <ApplicationsPage />}
          {currentSection === 'users' && <UsersPage />}
          {currentSection === 'statistics' && <StatisticsPage />}
          {currentSection === 'settings' && <SettingsPage />}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto p-4">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="hover:bg-accent"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold">Админ панель</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {adminButtons.map((button) => (
            <Card
              key={button.title}
              className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 border-border"
              onClick={button.onClick}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <button.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-1">{button.title}</h3>
                    <p className="text-muted-foreground text-sm">{button.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <NewsletterModal
          isOpen={isNewsletterOpen}
          onClose={() => setIsNewsletterOpen(false)}
        />
      </div>
    </div>
  );
}