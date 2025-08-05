import React, { useState } from 'react';
import { Search, Eye, Trash2, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DomainModal } from './DomainModal';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface Domain {
  id: number;
  name: string;
  status: 'active' | 'inactive' | 'blocked';
  googleCT: string[];
  yandexCT: string[];
  megafonCT: string[];
  createdAt: string;
}

const mockDomains: Domain[] = [
  {
    id: 1,
    name: 'example1.com',
    status: 'active',
    googleCT: ['sub1.example1.com', 'sub2.example1.com'],
    yandexCT: ['sub3.example1.com'],
    megafonCT: ['sub4.example1.com'],
    createdAt: '2025-01-01'
  },
  {
    id: 2,
    name: 'example2.com',
    status: 'inactive',
    googleCT: [],
    yandexCT: ['sub1.example2.com'],
    megafonCT: [],
    createdAt: '2025-01-02'
  }
];

export function DomainsSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDomain, setSelectedDomain] = useState<Domain | null>(null);
  const itemsPerPage = 10;

  const filteredDomains = mockDomains.filter(domain =>
    domain.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredDomains.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedDomains = filteredDomains.slice(startIndex, startIndex + itemsPerPage);

  const handleBuyRu = () => {
    console.log('Buying .ru domains');
  };

  const handleDeleteInactive = () => {
    console.log('Deleting inactive domains');
  };

  const handleDeleteAll = () => {
    console.log('Deleting all domains');
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2 flex-wrap">
        <Button onClick={handleBuyRu} className="bg-green-600 hover:bg-green-700">
          <ShoppingCart className="h-4 w-4 mr-2" />
          Купить .ru
        </Button>
        <Button variant="outline" onClick={handleDeleteInactive}>
          <Trash2 className="h-4 w-4 mr-2" />
          Удалить нерабочие
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">
              <Trash2 className="h-4 w-4 mr-2" />
              Удалить все
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Вы точно хотите удалить ВСЕ домены?</AlertDialogTitle>
              <AlertDialogDescription>
                Это действие необратимо. Все домены будут удалены из системы.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Отмена</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteAll} className="bg-destructive hover:bg-destructive/90">
                Удалить все
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Поиск доменов..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="space-y-4">
        {paginatedDomains.map((domain) => (
          <Card key={domain.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div>
                    <h3 className="font-semibold">{domain.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Создан: {domain.createdAt}
                    </p>
                  </div>
                  <Badge variant={
                    domain.status === 'active' ? 'default' : 
                    domain.status === 'inactive' ? 'secondary' : 'destructive'
                  }>
                    {domain.status === 'active' && 'Активен'}
                    {domain.status === 'inactive' && 'Неактивен'}
                    {domain.status === 'blocked' && 'Заблокирован'}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right text-sm">
                    <p>Google CT: {domain.googleCT.length}</p>
                    <p>Яндекс CT: {domain.yandexCT.length}</p>
                    <p>Мегафон CT: {domain.megafonCT.length}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedDomain(domain)}
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

      <DomainModal
        domain={selectedDomain}
        isOpen={!!selectedDomain}
        onClose={() => setSelectedDomain(null)}
      />
    </div>
  );
}