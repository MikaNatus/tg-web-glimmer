import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

interface ApplicationProps {
  onBack: () => void;
}

export const Application = ({ onBack }: ApplicationProps) => {
  const [whereHeard, setWhereHeard] = useState("");
  const [experience, setExperience] = useState("");

  const handleWhereHeardClick = (value: string) => {
    setWhereHeard(value);
  };

  const handleExperienceClick = (value: string) => {
    setExperience(value);
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log("Application submitted:", { whereHeard, experience });
  };

  return (
    <motion.div 
      className="min-h-screen bg-background p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className="max-w-md mx-auto"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div 
          className="flex items-center gap-4 mb-6"
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Заявка на вступление</h1>
        </motion.div>

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card>
          <CardHeader>
            <CardTitle>Заполните анкету</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="whereHeard">Где вы узнали о нас?</Label>
              <Input
                id="whereHeard"
                value={whereHeard}
                onChange={(e) => setWhereHeard(e.target.value)}
                placeholder="Введите ответ"
              />
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleWhereHeardClick("Реклама")}
                >
                  Реклама
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleWhereHeardClick("Перерег")}
                >
                  Перерег
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleWhereHeardClick("От друга")}
                >
                  От друга
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="experience">Какой опыт работы?</Label>
              <Input
                id="experience"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                placeholder="Введите опыт работы"
              />
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleExperienceClick("Без опыта")}
                >
                  Без опыта
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleExperienceClick("1-2 года")}
                >
                  1-2 года
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleExperienceClick("Больше 2х лет")}
                >
                  Больше 2х лет
                </Button>
              </div>
            </div>

            <Button 
              className="w-full" 
              onClick={handleSubmit}
              disabled={!whereHeard || !experience}
            >
              Отправить заявку
            </Button>
          </CardContent>
        </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};