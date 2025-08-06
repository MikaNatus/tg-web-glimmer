import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Settings, Globe, MessageSquare, Link, Percent, Users, Shield, CreditCard, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DomainsSection } from './settings/DomainsSection';
import { ChatsSection } from './settings/ChatsSection';
import { InvitesSection } from './settings/InvitesSection';
import { PercentagesSection } from './settings/PercentagesSection';
import { AdminsSection } from './settings/AdminsSection';
import { HandlersTPSection } from './settings/HandlersTPSection';
import { CFAccountsSection } from './settings/CFAccountsSection';
import { PaymentSystemsSection } from './settings/PaymentSystemsSection';
import { RegAccountSection } from './settings/RegAccountSection';
import { USDTRateSection } from './settings/USDTRateSection';

function SettingsHome() {
  const navigate = useNavigate();

  const settingsSections = [
    {
      title: 'Домены',
      icon: Globe,
      path: '/admin/settings/domains',
      description: 'Управление доменами и поддоменами'
    },
    {
      title: 'Чаты',
      icon: MessageSquare,
      path: '/admin/settings/chats',
      description: 'Настройка чатов и уведомлений'
    },
    {
      title: 'Инвайты',
      icon: Link,
      path: '/admin/settings/invites',
      description: 'Ссылки для приглашений'
    },
    {
      title: 'Проценты',
      icon: Percent,
      path: '/admin/settings/percentages',
      description: 'Настройка процентов и комиссий'
    },
    {
      title: 'Админы',
      icon: Shield,
      path: '/admin/settings/admins',
      description: 'Управление администраторами'
    },
    {
      title: 'Ручки/ТП',
      icon: Users,
      path: '/admin/settings/handlers',
      description: 'Управление ручками и ТП'
    },
    {
      title: 'CF Аккаунты',
      icon: Settings,
      path: '/admin/settings/cf',
      description: 'Cloudflare аккаунты'
    },
    {
      title: 'Платежки',
      icon: CreditCard,
      path: '/admin/settings/payments',
      description: 'Настройки платежных систем'
    },
    {
      title: 'Аккаунт REG',
      icon: Shield,
      path: '/admin/settings/reg',
      description: 'Настройки аккаунта регистрации'
    },
    {
      title: 'Курс USDT',
      icon: Settings,
      path: '/admin/settings/usdt',
      description: 'Управление курсом USDT'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {settingsSections.map((section) => (
        <Card
          key={section.path}
          className="cursor-pointer transition-all duration-300 hover:shadow-elevated hover:scale-105 shadow-card gradient-secondary border-0 group animate-fade-in"
          onClick={() => navigate(section.path)}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 rounded-lg gradient-primary shadow-glow transition-all duration-300 group-hover:scale-110">
                <section.icon className="h-5 w-5 text-background" />
              </div>
              <span className="group-hover:text-primary transition-colors">{section.title}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">{section.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// Create individual setting section pages with proper headers
function SettingsDomainsPage() {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/admin/settings')} className="shadow-glow">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg gradient-primary shadow-glow">
            <Globe className="h-5 w-5 text-background" />
          </div>
          <h2 className="text-2xl font-bold">Домены</h2>
        </div>
      </div>
      <DomainsSection />
    </div>
  );
}

function SettingsChatsPage() {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/admin/settings')} className="shadow-glow">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg gradient-primary shadow-glow">
            <MessageSquare className="h-5 w-5 text-background" />
          </div>
          <h2 className="text-2xl font-bold">Чаты</h2>
        </div>
      </div>
      <ChatsSection />
    </div>
  );
}

function SettingsInvitesPage() {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/admin/settings')} className="shadow-glow">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg gradient-primary shadow-glow">
            <Link className="h-5 w-5 text-background" />
          </div>
          <h2 className="text-2xl font-bold">Инвайты</h2>
        </div>
      </div>
      <InvitesSection />
    </div>
  );
}

function SettingsPercentagesPage() {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/admin/settings')} className="shadow-glow">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg gradient-primary shadow-glow">
            <Percent className="h-5 w-5 text-background" />
          </div>
          <h2 className="text-2xl font-bold">Проценты</h2>
        </div>
      </div>
      <PercentagesSection />
    </div>
  );
}

function SettingsAdminsPage() {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/admin/settings')} className="shadow-glow">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg gradient-primary shadow-glow">
            <Shield className="h-5 w-5 text-background" />
          </div>
          <h2 className="text-2xl font-bold">Админы</h2>
        </div>
      </div>
      <AdminsSection />
    </div>
  );
}

function SettingsHandlersPage() {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/admin/settings')} className="shadow-glow">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg gradient-primary shadow-glow">
            <Users className="h-5 w-5 text-background" />
          </div>
          <h2 className="text-2xl font-bold">Ручки/ТП</h2>
        </div>
      </div>
      <HandlersTPSection />
    </div>
  );
}

function SettingsCFPage() {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/admin/settings')} className="shadow-glow">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg gradient-primary shadow-glow">
            <Settings className="h-5 w-5 text-background" />
          </div>
          <h2 className="text-2xl font-bold">CF Аккаунты</h2>
        </div>
      </div>
      <CFAccountsSection />
    </div>
  );
}

function SettingsPaymentsPage() {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/admin/settings')} className="shadow-glow">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg gradient-primary shadow-glow">
            <CreditCard className="h-5 w-5 text-background" />
          </div>
          <h2 className="text-2xl font-bold">Платежки</h2>
        </div>
      </div>
      <PaymentSystemsSection />
    </div>
  );
}

function SettingsRegPage() {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/admin/settings')} className="shadow-glow">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg gradient-primary shadow-glow">
            <Shield className="h-5 w-5 text-background" />
          </div>
          <h2 className="text-2xl font-bold">Аккаунт REG</h2>
        </div>
      </div>
      <RegAccountSection />
    </div>
  );
}

function SettingsUSDTPage() {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/admin/settings')} className="shadow-glow">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg gradient-primary shadow-glow">
            <Settings className="h-5 w-5 text-background" />
          </div>
          <h2 className="text-2xl font-bold">Курс USDT</h2>
        </div>
      </div>
      <USDTRateSection />
    </div>
  );
}

export function SettingsPage() {
  return (
    <Routes>
      <Route path="/" element={<SettingsHome />} />
      <Route path="/domains" element={<SettingsDomainsPage />} />
      <Route path="/chats" element={<SettingsChatsPage />} />
      <Route path="/invites" element={<SettingsInvitesPage />} />
      <Route path="/percentages" element={<SettingsPercentagesPage />} />
      <Route path="/admins" element={<SettingsAdminsPage />} />
      <Route path="/handlers" element={<SettingsHandlersPage />} />
      <Route path="/cf" element={<SettingsCFPage />} />
      <Route path="/payments" element={<SettingsPaymentsPage />} />
      <Route path="/reg" element={<SettingsRegPage />} />
      <Route path="/usdt" element={<SettingsUSDTPage />} />
    </Routes>
  );
}