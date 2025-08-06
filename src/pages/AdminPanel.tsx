import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, MessageSquare, FileText, Users, BarChart3, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { NewsletterModal } from '@/components/admin/NewsletterModal';
import { ApplicationsPage } from '@/components/admin/ApplicationsPage';
import { UsersPage } from '@/components/admin/UsersPage';
import { StatisticsPage } from '@/components/admin/StatisticsPage';
import { SettingsPage } from '@/components/admin/SettingsPage';

function AdminHome() {
  const navigate = useNavigate();
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
      onClick: () => navigate('/admin/applications'),
      description: 'Управление заявками на вступление'
    },
    {
      title: 'Пользователи',
      icon: Users,
      onClick: () => navigate('/admin/users'),
      description: 'Управление пользователями системы'
    },
    {
      title: 'Статистика',
      icon: BarChart3,
      onClick: () => navigate('/admin/statistics'),
      description: 'Просмотр статистики и аналитики'
    },
    {
      title: 'Настройки',
      icon: Settings,
      onClick: () => navigate('/admin/settings'),
      description: 'Настройки системы и конфигурация'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-5xl mx-auto p-6">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => window.history.back()}
            className="hover:bg-accent shadow-glow"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg gradient-primary shadow-glow">
              <Settings className="h-6 w-6 text-background" />
            </div>
            <h1 className="text-3xl font-bold gradient-text">Админ панель</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminButtons.map((button) => (
            <Card
              key={button.title}
              className="cursor-pointer transition-all duration-300 hover:shadow-elevated hover:scale-105 shadow-card gradient-secondary border-0 group animate-fade-in"
              onClick={button.onClick}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl gradient-primary shadow-glow transition-all duration-300 group-hover:scale-110">
                    <button.icon className="h-6 w-6 text-background" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-2 text-foreground group-hover:text-primary transition-colors">{button.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{button.description}</p>
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

function AdminApplications() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-7xl mx-auto p-6">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/admin')}
            className="hover:bg-accent shadow-glow"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg gradient-primary shadow-glow">
              <FileText className="h-6 w-6 text-background" />
            </div>
            <h1 className="text-3xl font-bold">Заявки</h1>
          </div>
        </div>
        <ApplicationsPage />
      </div>
    </div>
  );
}

function AdminUsers() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-7xl mx-auto p-6">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/admin')}
            className="hover:bg-accent shadow-glow"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg gradient-primary shadow-glow">
              <Users className="h-6 w-6 text-background" />
            </div>
            <h1 className="text-3xl font-bold">Пользователи</h1>
          </div>
        </div>
        <UsersPage />
      </div>
    </div>
  );
}

function AdminStatistics() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-7xl mx-auto p-6">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/admin')}
            className="hover:bg-accent shadow-glow"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg gradient-primary shadow-glow">
              <BarChart3 className="h-6 w-6 text-background" />
            </div>
            <h1 className="text-3xl font-bold">Статистика</h1>
          </div>
        </div>
        <StatisticsPage />
      </div>
    </div>
  );
}

function AdminSettings() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-7xl mx-auto p-6">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/admin')}
            className="hover:bg-accent shadow-glow"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg gradient-primary shadow-glow">
              <Settings className="h-6 w-6 text-background" />
            </div>
            <h1 className="text-3xl font-bold">Настройки</h1>
          </div>
        </div>
        <SettingsPage />
      </div>
    </div>
  );
}

export function AdminPanel() {
  return (
    <Routes>
      <Route path="/" element={<AdminHome />} />
      <Route path="/applications" element={<AdminApplications />} />
      <Route path="/users" element={<AdminUsers />} />
      <Route path="/statistics" element={<AdminStatistics />} />
      <Route path="/settings/*" element={<AdminSettings />} />
    </Routes>
  );
}