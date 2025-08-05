import React, { useState } from 'react';
import { Calendar, TrendingUp, Users, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const generateDates = () => {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < 31; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    dates.push(date.toISOString().split('T')[0]);
  }
  return dates;
};

const mockStatistics = {
  totalIncome: 45720.50,
  workersShare: 32104.35,
  referralsShare: 8634.20,
  handlersSalary: 2890.50,
  tpSalary: 1654.75,
  emailV900: 892.40,
  emailPixMail: 543.30,
  netIncome: 36284.90
};

const mockHandlers = [
  { nickname: 'handler1', amount: 1450.25 },
  { nickname: 'handler2', amount: 980.50 },
  { nickname: 'handler3', amount: 459.75 }
];

const mockTp = [
  { nickname: 'tp_user1', amount: 820.25 },
  { nickname: 'tp_user2', amount: 534.50 },
  { nickname: 'tp_user3', amount: 300.00 }
];

const mockWorkerEarnings = [
  {
    name: 'Пингвин',
    id: 1834482473,
    username: '@blagodabro',
    rub: 91200,
    usdt: 977.4920
  },
  {
    name: 'Воркер2',
    id: 1234567890,
    username: '@worker2',
    rub: 54300,
    usdt: 581.2150
  }
];

export function StatisticsPage() {
  const [selectedDate, setSelectedDate] = useState(generateDates()[0]);
  const dates = generateDates();

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Выберите дату</h3>
        <div className="grid grid-cols-7 gap-2 max-w-4xl">
          {dates.map((date) => (
            <Button
              key={date}
              variant={selectedDate === date ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedDate(date)}
              className="p-2 h-auto"
            >
              <div className="text-center">
                <div className="text-xs">{new Date(date).getDate()}</div>
                <div className="text-xs opacity-70">
                  {new Date(date).toLocaleDateString('ru-RU', { month: 'short' })}
                </div>
              </div>
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-semibold">
          Статистика за {new Date(selectedDate).toLocaleDateString('ru-RU')}
        </h3>

        {/* Main Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Общий доход</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${mockStatistics.totalIncome.toFixed(2)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Доля воркеров</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${mockStatistics.workersShare.toFixed(2)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Доля рефералов</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${mockStatistics.referralsShare.toFixed(2)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Чистый доход</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">${mockStatistics.netIncome.toFixed(2)}</div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Tables */}
        <Tabs defaultValue="salary" className="w-full">
          <TabsList>
            <TabsTrigger value="salary">Зарплаты</TabsTrigger>
            <TabsTrigger value="workers">Заработок воркеров</TabsTrigger>
          </TabsList>

          <TabsContent value="salary" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>ЗП Ручек (${mockStatistics.handlersSalary.toFixed(2)})</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Ник</TableHead>
                        <TableHead className="text-right">Сумма $</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockHandlers.map((handler, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{handler.nickname}</TableCell>
                          <TableCell className="text-right">${handler.amount.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>ЗП ТП (${mockStatistics.tpSalary.toFixed(2)})</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Ник</TableHead>
                        <TableHead className="text-right">Сумма $</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockTp.map((tp, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{tp.nickname}</TableCell>
                          <TableCell className="text-right">${tp.amount.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">За отправку E-Mail (v900)</p>
                    <p className="text-2xl font-bold">${mockStatistics.emailV900.toFixed(2)}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">За отправку E-Mail (PixMail)</p>
                    <p className="text-2xl font-bold">${mockStatistics.emailPixMail.toFixed(2)}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="workers">
            <Card>
              <CardHeader>
                <CardTitle>
                  Заработок воркеров за {new Date(selectedDate).toLocaleDateString('ru-RU')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Воркер</TableHead>
                      <TableHead className="text-right">RUB</TableHead>
                      <TableHead className="text-right">USDT</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockWorkerEarnings.map((worker) => (
                      <TableRow key={worker.id}>
                        <TableCell className="font-medium">
                          {worker.name} [{worker.id}] [{worker.username}]
                        </TableCell>
                        <TableCell className="text-right">
                          {worker.rub.toLocaleString()} RUB
                        </TableCell>
                        <TableCell className="text-right">
                          {worker.usdt.toFixed(4)} USDT
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}