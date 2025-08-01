import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Info, Globe, Search } from "lucide-react";

interface DomainInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  domain: {
    name: string;
    status: string;
    yandexCT: number;
    googleCT: number;
    megafonCT: number;
  };
}

export const DomainInfoModal = ({ isOpen, onClose, domain }: DomainInfoModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm gradient-dark border-border mx-4 w-[calc(100vw-2rem)]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Info className="w-5 h-5 text-primary" />
            Информация о домене
          </DialogTitle>
          <DialogDescription>
            Подробная информация о статусе домена
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Domain Name */}
          <Card className="p-4 bg-secondary/50 border-border">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium">{domain.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge 
                    variant={domain.status === "работает" ? "default" : "destructive"}
                    className={domain.status === "работает" ? "bg-success text-success-foreground" : ""}
                  >
                    {domain.status}
                  </Badge>
                </div>
              </div>
            </div>
          </Card>

          {/* CT Statistics */}
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">Статистика КТ</h4>
            
            <div className="grid gap-2">
              <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg border border-border">
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-red-400" />
                  <span className="text-sm">КТ Яндекс</span>
                </div>
                <span className="font-medium">{domain.yandexCT}</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg border border-border">
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-blue-400" />
                  <span className="text-sm">КТ Google</span>
                </div>
                <span className="font-medium">{domain.googleCT}</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg border border-border">
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-green-400" />
                  <span className="text-sm">КТ МегаФон</span>
                </div>
                <span className="font-medium">{domain.megafonCT}</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};