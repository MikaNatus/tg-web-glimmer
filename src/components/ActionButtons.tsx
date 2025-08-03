import { Link, Plus, FileText, BarChart3, Settings, Shield, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ActionButtonsProps {
  onCreateLink: () => void;
  onMyLinks: () => void;
  isAdmin?: boolean;
}

export const ActionButtons = ({ onCreateLink, onMyLinks, isAdmin = false }: ActionButtonsProps) => {
  const mainButtons = [
    {
      icon: Plus,
      label: "Создать ссылку",
      onClick: onCreateLink,
      gradient: true,
    },
    {
      icon: Link,
      label: "Мои ссылки",
      onClick: onMyLinks,
    },
    {
      icon: Settings,
      label: "Утилиты",
      onClick: () => console.log("Utilities"),
    },
    {
      icon: BarChart3,
      label: "Статистика",
      onClick: () => window.location.href = "/statistics",
    },
  ];

  const adminButtons = [
    {
      icon: Shield,
      label: "Админ панель",
      onClick: () => console.log("Admin panel"),
    },
    {
      icon: FileText,
      label: "Панель вбивера",
      onClick: () => console.log("Writer panel"),
    },
    {
      icon: Users,
      label: "Панель ТП",
      onClick: () => console.log("Support panel"),
    },
  ];

  return (
    <Card className="p-4 shadow-card">
      <div className="space-y-3">
        {/* Main Action Buttons - 2x2 Grid */}
        <div className="grid grid-cols-2 gap-3">
          {mainButtons.map((button) => (
            <Button
              key={button.label}
              onClick={button.onClick}
              className={
                button.gradient
                  ? "gradient-primary hover:opacity-90 shadow-glow h-14 flex-col gap-1"
                  : "bg-secondary hover:bg-secondary/80 text-secondary-foreground h-14 flex-col gap-1"
              }
            >
              <button.icon className="w-5 h-5" />
              <span className="text-xs font-medium">{button.label}</span>
            </Button>
          ))}
        </div>

        {/* Admin Buttons - Single Column */}
        {isAdmin && (
          <div className="pt-2 border-t border-border">
            <p className="text-sm text-muted-foreground mb-3 font-medium">Управление</p>
            <div className="space-y-2">
              {adminButtons.map((button) => (
                <Button
                  key={button.label}
                  onClick={button.onClick}
                  variant="outline"
                  className="w-full justify-start bg-muted/30 hover:bg-muted/50 border-border"
                >
                  <button.icon className="w-4 h-4 mr-3" />
                  {button.label}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};