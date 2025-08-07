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
      onClick: () => setIsNewsletterOpen(true)
    },
    {
      title: 'Заявки',
      icon: FileText,
      onClick: () => navigate('/admin/applications')
    },
    {
      title: 'Пользователи',
      icon: Users,
      onClick: () => navigate('/admin/users')
    },
    {
      title: 'Статистика',
      icon: BarChart3,
      onClick: () => navigate('/admin/statistics')
    },
    {
      title: 'Настройки',
      icon: Settings,
      onClick: () => navigate('/admin/settings')
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-md mx-auto p-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.history.back()}
              className="hover:bg-secondary/80"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-xl font-bold">Админ панель</h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4">

        <div className="grid grid-cols-2 gap-4">
          {adminButtons.map((button) => (
            <Card
              key={button.title}
              className="cursor-pointer transition-all duration-300 hover:shadow-elevated hover:scale-105 shadow-card gradient-secondary border-0 group animate-fade-in"
              onClick={button.onClick}
            >
              <CardContent className="p-4">
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="p-3 rounded-xl gradient-primary shadow-glow transition-all duration-300 group-hover:scale-110">
                    <button.icon className="h-6 w-6 text-background" />
                  </div>
                  <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">{button.title}</h3>
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
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-md mx-auto p-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/admin')}
              className="hover:bg-secondary/80"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-xl font-bold">Заявки</h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4">
        <ApplicationsPage />
      </div>
    </div>
  );
}

function AdminUsers() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-md mx-auto p-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/admin')}
              className="hover:bg-secondary/80"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-xl font-bold">Пользователи</h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4">
        <UsersPage />
      </div>
    </div>
  );
}

function AdminStatistics() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-md mx-auto p-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/admin')}
              className="hover:bg-secondary/80"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-xl font-bold">Статистика</h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4">
        <StatisticsPage />
      </div>
    </div>
  );
}

function AdminSettings() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-md mx-auto p-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/admin')}
              className="hover:bg-secondary/80"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-xl font-bold">Настройки</h1>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4">
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