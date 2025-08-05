import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface Domain {
  id: number;
  name: string;
  status: 'active' | 'inactive' | 'blocked';
  googleCT: string[];
  yandexCT: string[];
  megafonCT: string[];
  createdAt: string;
}

interface DomainModalProps {
  domain: Domain | null;
  isOpen: boolean;
  onClose: () => void;
}

export function DomainModal({ domain, isOpen, onClose }: DomainModalProps) {
  if (!domain) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Информация о домене</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">{domain.name}</h3>
            <Badge variant={
              domain.status === 'active' ? 'default' : 
              domain.status === 'inactive' ? 'secondary' : 'destructive'
            }>
              {domain.status === 'active' && 'Активен'}
              {domain.status === 'inactive' && 'Неактивен'}
              {domain.status === 'blocked' && 'Заблокирован'}
            </Badge>
          </div>

          <Separator />

          <div>
            <label className="text-sm font-medium text-muted-foreground">Дата создания</label>
            <p className="font-semibold">{domain.createdAt}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">КТ Google ({domain.googleCT.length})</label>
            <div className="mt-1 space-y-1">
              {domain.googleCT.length > 0 ? (
                domain.googleCT.map((subdomain, index) => (
                  <p key={index} className="text-sm font-mono bg-muted px-2 py-1 rounded">
                    {subdomain}
                  </p>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">Нет поддоменов</p>
              )}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">КТ Яндекс ({domain.yandexCT.length})</label>
            <div className="mt-1 space-y-1">
              {domain.yandexCT.length > 0 ? (
                domain.yandexCT.map((subdomain, index) => (
                  <p key={index} className="text-sm font-mono bg-muted px-2 py-1 rounded">
                    {subdomain}
                  </p>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">Нет поддоменов</p>
              )}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">КТ Мегафон ({domain.megafonCT.length})</label>
            <div className="mt-1 space-y-1">
              {domain.megafonCT.length > 0 ? (
                domain.megafonCT.map((subdomain, index) => (
                  <p key={index} className="text-sm font-mono bg-muted px-2 py-1 rounded">
                    {subdomain}
                  </p>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">Нет поддоменов</p>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}