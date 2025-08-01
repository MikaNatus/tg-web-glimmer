import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Package, Mail, Edit, Trash2, StickyNote } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

const ViewLink = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [checkerBalance, setCheckerBalance] = useState(false);
  const [cashback, setCashback] = useState(true);
  const [info900, setInfo900] = useState(false);
  const [note, setNote] = useState("");
  const [email, setEmail] = useState("");

  // Данные ссылки (в реальном приложении будут загружаться по ID)
  const linkData = {
    id: id || "12345",
    product: "Телевизор Philips 65\"",
    price: "10000Р",
    pvzDelivery: "1000Р",
    courierDelivery: "1000Р",
    paymentUrl: "https://example.com/payment",
    returnUrl: "https://example.com/return"
  };

  const handleEmailSend = (type: string, service: string) => {
    console.log(`Отправка ${type} email через ${service} на адрес: ${email}`);
    setEmail("");
  };

  const handleDeleteNote = () => {
    setNote("");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto p-4 space-y-4">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/my-links")}
            className="h-10 w-10 rounded-full hover:bg-primary/20"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Просмотр ссылки</h1>
        </div>

        {/* Основная информация */}
        <Card className="bg-gradient-card shadow-card border-0">
          <CardHeader>
            <CardTitle>Информация о ссылке</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">ID ссылки:</span>
              <span className="font-medium">{linkData.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Товар:</span>
              <span className="font-medium">{linkData.product}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Стоимость товара:</span>
              <span className="font-medium">{linkData.price}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Стоимость доставки в ПВЗ:</span>
              <span className="font-medium">{linkData.pvzDelivery}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Стоимость доставки курьером:</span>
              <span className="font-medium">{linkData.courierDelivery}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Оплата:</span>
              <a href={linkData.paymentUrl} className="text-primary hover:underline text-sm">
                Ссылка на страницу оплаты
              </a>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Возврат:</span>
              <a href={linkData.returnUrl} className="text-primary hover:underline text-sm">
                Ссылка на страницу возврата
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Кнопки действий */}
        <Card className="bg-gradient-card shadow-card border-0">
          <CardContent className="p-4 space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => navigate(`/products-list/${id}`)}
            >
              <Package className="h-4 w-4 mr-2" />
              Список товаров
            </Button>

            {/* Email 900 */}
            <div className="flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex-1 text-xs">
                    Email 900 [оплата]
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Email 900 - Оплата</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>E-mail адрес</Label>
                      <Input
                        type="email"
                        placeholder="example@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <Button 
                      className="w-full"
                      onClick={() => handleEmailSend("оплата", "900")}
                      disabled={!email}
                    >
                      Отправить
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex-1 text-xs">
                    Email 900 [возврат]
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Email 900 - Возврат</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>E-mail адрес</Label>
                      <Input
                        type="email"
                        placeholder="example@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <Button 
                      className="w-full"
                      onClick={() => handleEmailSend("возврат", "900")}
                      disabled={!email}
                    >
                      Отправить
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Email PixMail */}
            <div className="flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex-1 text-xs">
                    Email PixMail [оплата]
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Email PixMail - Оплата</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>E-mail адрес</Label>
                      <Input
                        type="email"
                        placeholder="example@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <Button 
                      className="w-full"
                      onClick={() => handleEmailSend("оплата", "PixMail")}
                      disabled={!email}
                    >
                      Отправить
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex-1 text-xs">
                    Email PixMail [возврат]
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Email PixMail - Возврат</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>E-mail адрес</Label>
                      <Input
                        type="email"
                        placeholder="example@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <Button 
                      className="w-full"
                      onClick={() => handleEmailSend("возврат", "PixMail")}
                      disabled={!email}
                    >
                      Отправить
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Переключатели */}
        <Card className="bg-gradient-card shadow-card border-0">
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <Label>Чекер баланса</Label>
              <Switch checked={checkerBalance} onCheckedChange={setCheckerBalance} />
            </div>
            <div className="flex items-center justify-between">
              <Label>Кешбек</Label>
              <Switch checked={cashback} onCheckedChange={setCashback} />
            </div>
            <div className="flex items-center justify-between">
              <Label>Инфо о 900</Label>
              <Switch checked={info900} onCheckedChange={setInfo900} />
            </div>
          </CardContent>
        </Card>

        {/* Заметка вбиверу */}
        <Card className="bg-gradient-card shadow-card border-0">
          <CardContent className="p-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  <StickyNote className="h-4 w-4 mr-2" />
                  Заметка вбиверу
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Заметка для вбивера</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Текст заметки</Label>
                    <Textarea
                      placeholder="Введите заметку для вбивера..."
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      rows={4}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1">Сохранить</Button>
                    <Button 
                      variant="destructive" 
                      onClick={handleDeleteNote}
                      disabled={!note}
                    >
                      Удалить заметку
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        {/* Кнопки управления */}
        <div className="flex gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex-1">
                <Edit className="h-4 w-4 mr-2" />
                Изменить
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Изменить ссылку</DialogTitle>
              </DialogHeader>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  Изменить домен
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Изменить стоимость доставки в ПВЗ
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Изменить стоимость доставки курьером
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Button variant="destructive" className="flex-1">
            <Trash2 className="h-4 w-4 mr-2" />
            Удалить
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ViewLink;