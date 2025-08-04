import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";

interface ApplicationPendingProps {
  onBack: () => void;
}

export const ApplicationPending = ({ onBack }: ApplicationPendingProps) => {
  return (
    <div className="min-h-screen bg-background p-4 flex items-center justify-center">
      <div className="max-w-md mx-auto">
        <Card>
          <CardContent className="text-center p-8 space-y-4">
            <Clock className="h-16 w-16 text-primary mx-auto" />
            <h1 className="text-xl font-semibold text-foreground">
              Ожидайте пока администрация примет вашу заявку
            </h1>
            <Button onClick={onBack} className="w-full">
              Вернуться
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};