import { useState } from "react";
import { ProfileBlock } from "@/components/ProfileBlock";
import { ActionButtons } from "@/components/ActionButtons";
import { Settings } from "./Settings";
import { Links } from "./Links";
import { ShoppingBag, MessageSquare, Car } from "lucide-react";

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
              { 
                service: "Wildberries", 
                profit: "+1000₽", 
                userTag: "#user123", 
                date: "21.06.25", 
                time: "14:12", 
                method: "С помощью e-mail (v900bot)",
                icon: ShoppingBag,
                color: "text-green-400",
                bgColor: "bg-green-400/10"
              },
              { 
                service: "Ozon", 
                profit: "+750₽", 
                userTag: "#user456", 
                date: "21.06.25", 
                time: "13:45", 
                method: "С помощью e-mail (PixMail)",
                icon: ShoppingBag,
                color: "text-blue-400",
                bgColor: "bg-blue-400/10"
              },
              { 
                service: "Avito", 
                profit: "+1250₽", 
                userTag: "#user789", 
                date: "21.06.25", 
                time: "12:20", 
                method: "С помощью e-mail (v900bot)",
                icon: MessageSquare,
                color: "text-orange-400",
                bgColor: "bg-orange-400/10"
              },
              { 
                service: "Auto.ru", 
                profit: "+890₽", 
                userTag: "#user321", 
                date: "21.06.25", 
                time: "11:35", 
                method: "С помощью e-mail (PixMail)",
                icon: Car,
                color: "text-red-400",
                bgColor: "bg-red-400/10"
              },
              { 
                service: "Wildberries", 
                profit: "+650₽", 
                userTag: "#user654", 
                date: "21.06.25", 
                time: "10:18", 
                method: "С помощью e-mail (v900bot)",
                icon: ShoppingBag,
                color: "text-green-400",
                bgColor: "bg-green-400/10"
              },
            ].map((item, index) => (
              <div 
                key={index} 
                className={`p-3 bg-secondary/30 rounded-lg transition-opacity duration-300 ${
                  index >= 3 ? 'opacity-60' : index >= 4 ? 'opacity-30' : 'opacity-100'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 ${item.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    {/* Первая строка: Сервис и профит */}
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-foreground">{item.service}</span>
                      <span className="text-success font-semibold">{item.profit}</span>
                    </div>
                    
                    {/* Вторая строка: Пользователь и дата/время */}
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-muted-foreground">{item.userTag}</span>
                      <span className="text-xs text-muted-foreground">{item.date} {item.time}</span>
                    </div>
                    
                    {/* Третья строка: Метод */}
                    <div className="text-xs text-muted-foreground">{item.method}</div>
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
