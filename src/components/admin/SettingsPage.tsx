import React, { useState } from 'react';
import { Settings, Globe, MessageSquare, Link, Percent, Users, Shield, CreditCard } from 'lucide-react';
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

type SettingsSection = 
  | 'main' 
  | 'domains' 
  | 'chats' 
  | 'invites' 
  | 'percentages' 
  | 'admins' 
  | 'handlers' 
  | 'cf' 
  | 'payments' 
  | 'reg' 
  | 'usdt';

export function SettingsPage() {
  const [currentSection, setCurrentSection] = useState<SettingsSection>('main');

  const settingsSections = [
    {
      title: 'Домены',
      icon: Globe,
      section: 'domains' as const,
      description: 'Управление доменами и поддоменами'
    },
    {
      title: 'Чаты',
      icon: MessageSquare,
      section: 'chats' as const,
      description: 'Настройка чатов и уведомлений'
    },
    {
      title: 'Инвайты',
      icon: Link,
      section: 'invites' as const,
      description: 'Ссылки для приглашений'
    },
    {
      title: 'Проценты',
      icon: Percent,
      section: 'percentages' as const,
      description: 'Настройка процентов и комиссий'
    },
    {
      title: 'Админы',
      icon: Shield,
      section: 'admins' as const,
      description: 'Управление администраторами'
    },
    {
      title: 'Ручки/ТП',
      icon: Users,
      section: 'handlers' as const,
      description: 'Управление ручками и ТП'
    },
    {
      title: 'CF Аккаунты',
      icon: Settings,
      section: 'cf' as const,
      description: 'Cloudflare аккаунты'
    },
    {
      title: 'Платежки',
      icon: CreditCard,
      section: 'payments' as const,
      description: 'Настройки платежных систем'
    },
    {
      title: 'Аккаунт REG',
      icon: Shield,
      section: 'reg' as const,
      description: 'Настройки аккаунта регистрации'
    },
    {
      title: 'Курс USDT',
      icon: Settings,
      section: 'usdt' as const,
      description: 'Управление курсом USDT'
    }
  ];

  if (currentSection !== 'main') {
    return (
      <div className="space-y-6">
        <Button
          variant="ghost"
          onClick={() => setCurrentSection('main')}
          className="mb-4"
        >
          ← Назад к настройкам
        </Button>

        {currentSection === 'domains' && <DomainsSection />}
        {currentSection === 'chats' && <ChatsSection />}
        {currentSection === 'invites' && <InvitesSection />}
        {currentSection === 'percentages' && <PercentagesSection />}
        {currentSection === 'admins' && <AdminsSection />}
        {currentSection === 'handlers' && <HandlersTPSection />}
        {currentSection === 'cf' && <CFAccountsSection />}
        {currentSection === 'payments' && <PaymentSystemsSection />}
        {currentSection === 'reg' && <RegAccountSection />}
        {currentSection === 'usdt' && <USDTRateSection />}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {settingsSections.map((section) => (
        <Card
          key={section.section}
          className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105"
          onClick={() => setCurrentSection(section.section)}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <section.icon className="h-5 w-5 text-primary" />
              {section.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{section.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}