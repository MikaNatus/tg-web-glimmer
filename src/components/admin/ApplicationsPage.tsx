import React, { useState } from 'react';
import { Search, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ApplicationModal } from './ApplicationModal';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface Application {
  id: number;
  name: string;
  username: string;
  whereHeard: string;
  experience: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

const mockApplications: Application[] = [
  {
    id: 1,
    name: 'Иван Петров',
    username: '@ivan_petrov',
    whereHeard: 'Реклама',
    experience: 'Без опыта',
    status: 'pending',
    createdAt: '2025-01-05'
  },
  {
    id: 2,
    name: 'Мария Сидорова',
    username: '@maria_sid',
    whereHeard: 'От друга',
    experience: '1-2 года',
    status: 'pending',
    createdAt: '2025-01-04'
  }
];

export function ApplicationsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const itemsPerPage = 10;

  const filteredApplications = mockApplications.filter(app =>
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedApplications = filteredApplications.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Поиск по имени или username..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="space-y-4">
        {paginatedApplications.map((application) => (
          <Card key={application.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div>
                    <h3 className="font-semibold">{application.name}</h3>
                    <p className="text-sm text-muted-foreground">{application.username}</p>
                  </div>
                  <Badge variant="secondary">
                    {application.status === 'pending' && 'Ожидает'}
                    {application.status === 'approved' && 'Принята'}
                    {application.status === 'rejected' && 'Отклонена'}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{application.createdAt}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedApplication(application)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Просмотр
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => setCurrentPage(page)}
                  isActive={currentPage === page}
                  className="cursor-pointer"
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext 
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      <ApplicationModal
        application={selectedApplication}
        isOpen={!!selectedApplication}
        onClose={() => setSelectedApplication(null)}
      />
    </div>
  );
}