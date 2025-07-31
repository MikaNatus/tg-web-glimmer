import { useState } from "react";
import { ProfileBlock } from "@/components/ProfileBlock";
import { ActionButtons } from "@/components/ActionButtons";
import { Settings } from "./Settings";
import { Links } from "./Links";

type PageType = "main" | "settings" | "links";

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
    return <Links onBack={() => handleNavigate("main")} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-md mx-auto space-y-4 p-4">
        {/* Profile Block */}
        <ProfileBlock onSettingsClick={() => handleNavigate("settings")} />
        
        {/* Action Buttons */}
        <ActionButtons
          onCreateLink={() => handleNavigate("links")}
          onMyLinks={() => handleNavigate("links")}
          isAdmin={isAdmin}
        />
      </div>
    </div>
  );
};

export default Index;
