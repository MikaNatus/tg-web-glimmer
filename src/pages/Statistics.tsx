import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Crown, Medal, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Statistics = () => {
  const navigate = useNavigate();

  const topUsers = [
    { id: 1, username: "@user1", avatar: "", amount: "15,420.50₽", position: 1 },
    { id: 2, username: "@user2", avatar: "", amount: "12,350.25₽", position: 2 },
    { id: 3, username: "@user3", avatar: "", amount: "9,875.75₽", position: 3 },
    { id: 4, username: "@user4", avatar: "", amount: "7,650.00₽", position: 4 },
    { id: 5, username: "@user5", avatar: "", amount: "6,420.30₽", position: 5 },
    { id: 6, username: "@user6", avatar: "", amount: "5,890.15₽", position: 6 },
    { id: 7, username: "@user7", avatar: "", amount: "4,750.80₽", position: 7 },
    { id: 8, username: "@user8", avatar: "", amount: "3,920.45₽", position: 8 },
    { id: 9, username: "@user9", avatar: "", amount: "2,850.60₽", position: 9 },
    { id: 10, username: "@user10", avatar: "", amount: "1,975.25₽", position: 10 },
  ];

  const getCrownIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-400 animate-pulse" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400 animate-pulse" />;
      case 3:
        return <Award className="h-6 w-6 text-orange-400 animate-pulse" />;
      default:
        return null;
    }
  };

  const getPositionColor = (position: number) => {
    switch (position) {
      case 1:
        return "bg-gradient-to-r from-yellow-400 to-yellow-600";
      case 2:
        return "bg-gradient-to-r from-gray-300 to-gray-500";
      case 3:
        return "bg-gradient-to-r from-orange-400 to-orange-600";
      default:
        return "bg-gradient-to-r from-blue-400 to-blue-600";
    }
  };

  const statsData = {
    day: { earnings: "1,250.50₽", users: 45, links: 128 },
    month: { earnings: "28,750.25₽", users: 1234, links: 3456 },
    allTime: { earnings: "156,420.75₽", users: 12345, links: 45678 }
  };

  return (
    <motion.div 
      className="min-h-screen bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className="max-w-md mx-auto p-4 space-y-4"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div 
          className="flex items-center gap-4 mb-6"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="h-10 w-10 rounded-full hover:bg-primary/20"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Статистика</h1>
        </motion.div>

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Tabs defaultValue="day" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="day">День</TabsTrigger>
              <TabsTrigger value="month">Месяц</TabsTrigger>
              <TabsTrigger value="allTime">Все время</TabsTrigger>
            </TabsList>

            {Object.entries(statsData).map(([period, data]) => (
              <TabsContent key={period} value={period} className="space-y-4">
                <motion.div 
                  className="grid grid-cols-3 gap-3"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <Card className="bg-gradient-card shadow-card border-0 p-3">
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Заработок</p>
                      <p className="text-lg font-bold text-primary">{data.earnings}</p>
                    </div>
                  </Card>
                  <Card className="bg-gradient-card shadow-card border-0 p-3">
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Пользователи</p>
                      <p className="text-lg font-bold text-primary">{data.users}</p>
                    </div>
                  </Card>
                  <Card className="bg-gradient-card shadow-card border-0 p-3">
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Ссылки</p>
                      <p className="text-lg font-bold text-primary">{data.links}</p>
                    </div>
                  </Card>
                </motion.div>
              </TabsContent>
            ))}
        </Tabs>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Card className="bg-gradient-card shadow-card border-0">
            <CardHeader>
              <CardTitle>Топ пользователей</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {topUsers.map((user, index) => (
                <motion.div
                  key={user.id}
                  className={`flex items-center gap-3 p-3 rounded-lg ${
                    user.position <= 3 
                      ? `${getPositionColor(user.position)} bg-opacity-20` 
                      : 'bg-card/50'
                  } hover:bg-primary/10 transition-all duration-300`}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                >
                <div className="relative">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={user.avatar} alt={user.username} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {user.username.charAt(1)?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  {user.position <= 3 && (
                    <div className="absolute -top-2 -right-2">
                      {getCrownIcon(user.position)}
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-bold ${
                      user.position <= 3 ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      #{user.position}
                    </span>
                    <span className="font-medium">{user.username}</span>
                  </div>
                </div>
                
                <div className="text-right">
                  <span className={`font-bold ${
                    user.position === 1 ? 'text-yellow-400' :
                    user.position === 2 ? 'text-gray-400' :
                    user.position === 3 ? 'text-orange-400' :
                    'text-primary'
                  }`}>
                    {user.amount}
                  </span>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Statistics;