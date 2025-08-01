import { useState } from "react";
import { Wallet, Plus, ChevronDown } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WithdrawModal = ({ isOpen, onClose }: WithdrawModalProps) => {
  const [useNewWallet, setUseNewWallet] = useState(true);
  const [amount, setAmount] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [selectedWallet, setSelectedWallet] = useState("");

  // Mock existing wallets
  const existingWallets = [
    { id: "1", address: "0x1234...5678", label: "Основной кошелек" },
    { id: "2", address: "0xabcd...efgh", label: "Резервный кошелек" },
  ];

  const handleWithdraw = () => {
    // Здесь будет логика вывода средств
    console.log("Withdrawing:", { amount, useNewWallet, walletAddress, selectedWallet });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm gradient-dark border-border mx-4 w-[calc(100vw-2rem)]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5 text-primary" />
            Вывод средств
          </DialogTitle>
          <DialogDescription>
            Выведите средства на ваш USDT BEP20 кошелек
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Amount Input */}
          <div className="space-y-2">
            <Label htmlFor="amount">Сумма вывода (₽)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Введите сумму"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-secondary border-border"
            />
            <p className="text-sm text-muted-foreground">
              Доступно для вывода: 1,250₽
            </p>
          </div>

          {/* Wallet Type Switch */}
          <Card className="p-4 bg-secondary/50 border-border">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="wallet-type">Новый кошелек</Label>
                <p className="text-sm text-muted-foreground">
                  {useNewWallet 
                    ? "Ввести новый адрес USDT BEP20" 
                    : "Выбрать из сохраненных"
                  }
                </p>
              </div>
              <Switch
                id="wallet-type"
                checked={useNewWallet}
                onCheckedChange={setUseNewWallet}
              />
            </div>
          </Card>

          {/* Wallet Selection */}
          {useNewWallet ? (
            <div className="space-y-2">
              <Label htmlFor="wallet-address">Адрес кошелька USDT BEP20</Label>
              <Input
                id="wallet-address"
                placeholder="0x..."
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                className="bg-secondary border-border font-mono"
              />
              <p className="text-sm text-muted-foreground">
                Убедитесь, что адрес поддерживает BEP20 сеть
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <Label>Выберите кошелек</Label>
              <Select value={selectedWallet} onValueChange={setSelectedWallet}>
                <SelectTrigger className="bg-secondary border-border">
                  <SelectValue placeholder="Выберите сохраненный кошелек" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  {existingWallets.map((wallet) => (
                    <SelectItem key={wallet.id} value={wallet.id} className="hover:bg-accent hover:text-foreground">
                      <div className="flex items-center gap-2">
                        <Wallet className="w-4 h-4" />
                        <div>
                          <p className="font-medium">{wallet.label}</p>
                          <p className="text-sm text-muted-foreground font-mono">
                            {wallet.address}
                          </p>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Отмена
            </Button>
            <Button
              onClick={handleWithdraw}
              disabled={!amount || (useNewWallet ? !walletAddress : !selectedWallet)}
              className="flex-1 gradient-primary hover:opacity-90"
            >
              <Wallet className="w-4 h-4 mr-2" />
              Вывести
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};