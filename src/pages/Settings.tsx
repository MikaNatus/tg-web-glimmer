import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, User, Bell, Shield, Palette, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

interface SettingsProps {
  onBack: () => void;
}

export const Settings = ({ onBack }: SettingsProps) => {
  const [notifications, setNotifications] = useState(true);
  const [twoFA, setTwoFA] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [autoLanguage, setAutoLanguage] = useState(true);

  const [profile, setProfile] = useState({
    name: "User Name",
    username: "username",
    email: "user@example.com",
    phone: "+7 (999) 123-45-67",
  });

  const handleSave = () => {
    console.log("Saving settings:", { profile, notifications, twoFA, darkMode, autoLanguage });
  };

  return (
    <motion.div 
      className="min-h-screen bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-md mx-auto p-4">
          <motion.div 
            className="flex items-center gap-3"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="hover:bg-secondary/80"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-xl font-bold">Настройки</h1>
          </motion.div>
        </div>
      </div>

      <motion.div 
        className="max-w-md mx-auto p-4 space-y-6"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        {/* Profile Section */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card className="p-6 shadow-card">
          <div className="flex items-center gap-4 mb-6">
            <User className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">Профиль</h2>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <Avatar className="w-16 h-16 border-2 border-primary">
              <AvatarImage src="/placeholder.svg" alt="Avatar" />
              <AvatarFallback className="bg-primary text-primary-foreground text-xl font-bold">
                U
              </AvatarFallback>
            </Avatar>
            <Button variant="outline" size="sm">
              Изменить фото
            </Button>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Имя</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="bg-secondary/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Никнейм</Label>
              <Input
                id="username"
                value={profile.username}
                onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                className="bg-secondary/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="bg-secondary/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Телефон</Label>
              <Input
                id="phone"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="bg-secondary/50"
              />
            </div>
          </div>
        </Card>
        </motion.div>

        {/* Notifications Section */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Card className="p-6 shadow-card">
          <div className="flex items-center gap-4 mb-6">
            <Bell className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">Уведомления</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Push-уведомления</p>
                <p className="text-sm text-muted-foreground">
                  Получать уведомления о новых профитах
                </p>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>
          </div>
        </Card>
        </motion.div>

        {/* Security Section */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <Card className="p-6 shadow-card">
          <div className="flex items-center gap-4 mb-6">
            <Shield className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">Безопасность</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Двухфакторная аутентификация</p>
                <p className="text-sm text-muted-foreground">
                  Дополнительная защита аккаунта
                </p>
              </div>
              <Switch checked={twoFA} onCheckedChange={setTwoFA} />
            </div>

            <Separator />

            <Button variant="outline" className="w-full">
              Изменить пароль
            </Button>
          </div>
        </Card>
        </motion.div>

        {/* Appearance Section */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        >
          <Card className="p-6 shadow-card">
          <div className="flex items-center gap-4 mb-6">
            <Palette className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">Внешний вид</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Темная тема</p>
                <p className="text-sm text-muted-foreground">
                  Использовать темное оформление
                </p>
              </div>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            </div>
          </div>
        </Card>
        </motion.div>

        {/* Language Section */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.7 }}
        >
          <Card className="p-6 shadow-card">
          <div className="flex items-center gap-4 mb-6">
            <Globe className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">Язык</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Автоопределение языка</p>
                <p className="text-sm text-muted-foreground">
                  Определять язык автоматически
                </p>
              </div>
              <Switch checked={autoLanguage} onCheckedChange={setAutoLanguage} />
            </div>
          </div>
        </Card>
        </motion.div>

        {/* Save Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.8 }}
        >
          <Button
            onClick={handleSave}
            className="w-full gradient-primary hover:opacity-90 shadow-glow"
          >
            Сохранить изменения
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};