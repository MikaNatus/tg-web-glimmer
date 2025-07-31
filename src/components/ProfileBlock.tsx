import { useState } from "react";
import { Settings, Wallet, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { WithdrawModal } from "./WithdrawModal";
import { useToast } from "@/hooks/use-toast";
import profileBg from "@/assets/profile-bg.jpg";

interface ProfileBlockProps {
  onSettingsClick: () => void;
}

export const ProfileBlock = ({ onSettingsClick }: ProfileBlockProps) => {
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const copyUserId = async () => {
    try {
      await navigator.clipboard.writeText("12345");
      setCopied(true);
      toast({
        title: "ID скопирован",
        description: "ID пользователя скопирован в буфер обмена",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось скопировать ID",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Card className="relative overflow-hidden border-0 shadow-card">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${profileBg})` }}
        />
        <div className="absolute inset-0 gradient-profile" />
        
        {/* Content */}
        <div className="relative z-10 p-6">
          {/* Header with Avatar and Settings */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16 border-2 border-primary shadow-glow">
                <AvatarImage src="/placeholder.svg" alt="Avatar" />
                <AvatarFallback className="bg-primary text-primary-foreground text-xl font-bold">
                  U
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-bold text-white">User Name</h2>
                <p className="text-white/80">@username</p>
              </div>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={onSettingsClick}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>

          {/* Balance Section */}
          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm">Баланс</p>
                <p className="text-2xl font-bold text-white">1,250₽</p>
              </div>
              <Button
                onClick={() => setIsWithdrawOpen(true)}
                className="gradient-primary hover:opacity-90 shadow-glow"
              >
                <Wallet className="w-4 h-4 mr-2" />
                Вывести
              </Button>
            </div>
          </div>

          {/* Info Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between bg-black/20 backdrop-blur-sm rounded-lg p-3">
              <span className="text-white/80">МОЙ ID</span>
              <div className="flex items-center gap-2">
                <span className="text-white font-mono">12345</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyUserId}
                  className="text-white hover:bg-white/10 p-1 h-auto"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-success" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
            
            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-3">
              <p className="text-white/80">
                Профитов: <span className="text-primary font-bold">12</span> на сумму{" "}
                <span className="text-success font-bold">1000₽</span>
              </p>
            </div>
          </div>
        </div>
      </Card>

      <WithdrawModal 
        isOpen={isWithdrawOpen} 
        onClose={() => setIsWithdrawOpen(false)} 
      />
    </>
  );
};