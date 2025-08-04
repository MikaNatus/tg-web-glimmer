import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { XCircle } from "lucide-react";

interface ApplicationRejectedProps {
  onBack: () => void;
}

export const ApplicationRejected = ({ onBack }: ApplicationRejectedProps) => {
  return (
    <div className="min-h-screen bg-background p-4 flex items-center justify-center">
      <div className="max-w-md mx-auto">
        <Card>
          <CardContent className="text-center p-8 space-y-4">
            <XCircle className="h-16 w-16 text-destructive mx-auto" />
            <h1 className="text-xl font-semibold text-foreground">
              Вам отказали в доступе к панели
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