import { useState } from "react";
import { ProfileBlock } from "@/components/ProfileBlock";
import { ActionButtons } from "@/components/ActionButtons";
import { Settings } from "./Settings";
import { Links } from "./Links";

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
      </div>
    </div>
  );
};

export default Index;
