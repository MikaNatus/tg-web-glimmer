import { useState } from "react";
import { ProfileBlock } from "@/components/ProfileBlock";
import { ActionButtons } from "@/components/ActionButtons";
import { Settings } from "./Settings";
import { Links } from "./Links";
import { Package } from "lucide-react";

type PageType = "main" | "settings" | "links" | "create-link";

const Index = () => {
  const [currentPage, setCurrentPage] = useState<PageType>("main");

  // Mock user data - в реальном приложении это будет из API
  const isAdmin = true; // Пример для демонстрации админских кнопок

  const handleNavigate = (page: PageType) => {
    setCurrentPage(page);
  };

  if (currentPage === "settings") {
    return <Settings onBack={() => handleNavigate("main")} />;
  }

  if (currentPage === "links") {
    return <Links onBack={() => handleNavigate("main")} mode="view" />;
  }

  if (currentPage === "create-link") {
    return <Links onBack={() => handleNavigate("main")} mode="create" />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto space-y-4 p-4">
        {/* Profile Block */}
        <ProfileBlock onSettingsClick={() => handleNavigate("settings")} />
        
        {/* Action Buttons */}
        <ActionButtons
          onCreateLink={() => setCurrentPage("create-link")}
          onMyLinks={() => handleNavigate("links")}
          isAdmin={isAdmin}
        />

        {/* Latest Profits */}
        <div className="bg-gradient-card shadow-card border-0 rounded-xl p-4">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Последние профиты</h3>
          <div className="space-y-3">
            {[
              { service: "Wildberries", profit: "+1000₽", userTag: "#user123", time: "14:30", method: "e-mail (v900bot)" },
              { service: "Ozon", profit: "+750₽", userTag: "#user456", time: "13:45", method: "e-mail (PixMail)" },
              { service: "Avito", profit: "+1250₽", userTag: "#user789", time: "12:20", method: "e-mail (v900bot)" },
            ].map((item, index) => (
              <div key={index} className="flex items-start justify-between p-3 bg-secondary/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                    <Package className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-green-500 font-medium">{item.profit}</span>
                      <span className="text-xs text-muted-foreground">{item.time}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">{item.userTag}</div>
                    <div className="text-xs text-muted-foreground mt-1">{item.method}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
