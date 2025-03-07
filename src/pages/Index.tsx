
import MarketStats from "@/components/MarketStats";
import CryptoChart from "@/components/CryptoChart";
import PortfolioCard from "@/components/PortfolioCard";
import CryptoList from "@/components/CryptoList";
import LanguageSelector from "@/components/LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { UserIcon } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const { t } = useLanguage();
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex justify-between items-center">
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/2fa20fda-d6b2-4987-b280-b7fc9d9a7fa4.png" 
              alt="The Coin Bee Logo" 
              className="h-24 mr-4"
            />
            <div>
              <h1 className="text-3xl font-bold mb-2">{t("dashboard.title")}</h1>
              <p className="text-muted-foreground">
                {isAuthenticated 
                  ? t("dashboard.welcomeUser", { name: user?.name }) 
                  : t("dashboard.welcome")}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            {isAuthenticated ? (
              <Button variant="outline" asChild>
                <Link to="/profile">
                  <UserIcon className="mr-2 h-4 w-4" />
                  {t("profile.title")}
                </Link>
              </Button>
            ) : (
              <div className="flex space-x-2">
                <Button variant="outline" asChild>
                  <Link to="/login">{t("auth.login")}</Link>
                </Button>
                <Button asChild>
                  <Link to="/register">{t("auth.register")}</Link>
                </Button>
              </div>
            )}
          </div>
        </header>
        
        <MarketStats />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CryptoChart />
          </div>
          <div>
            <PortfolioCard />
          </div>
        </div>
        
        <CryptoList />
      </div>
    </div>
  );
};

export default Index;
