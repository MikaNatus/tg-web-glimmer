import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Check, X } from 'lucide-react';

interface Application {
  id: number;
  name: string;
  username: string;
  whereHeard: string;
  experience: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

interface ApplicationModalProps {
  application: Application | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ApplicationModal({ application, isOpen, onClose }: ApplicationModalProps) {
  if (!application) return null;

  const handleApprove = () => {
    console.log('Approving application:', application.id);
    onClose();
  };

  const handleReject = () => {
    console.log('Rejecting application:', application.id);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Заявка #{application.id}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Имя</label>
              <p className="font-semibold">{application.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Username</label>
              <p className="font-semibold">{application.username}</p>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">Откуда узнали о нас?</label>
            <p className="font-semibold">{application.whereHeard}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">Какой опыт работы?</label>
            <p className="font-semibold">{application.experience}</p>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-muted-foreground">Статус:</label>
            <Badge variant="secondary">
              {application.status === 'pending' && 'Ожидает'}
              {application.status === 'approved' && 'Принята'}
              {application.status === 'rejected' && 'Отклонена'}
            </Badge>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">Дата подачи</label>
            <p className="font-semibold">{application.createdAt}</p>
          </div>

          {application.status === 'pending' && (
            <div className="flex gap-2 pt-4">
              <Button
                onClick={handleApprove}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                <Check className="h-4 w-4 mr-2" />
                Принять
              </Button>
              <Button
                onClick={handleReject}
                variant="destructive"
                className="flex-1"
              >
                <X className="h-4 w-4 mr-2" />
                Отклонить
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}