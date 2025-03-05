
import MarketStats from "@/components/MarketStats";
import CryptoChart from "@/components/CryptoChart";
import PortfolioCard from "@/components/PortfolioCard";
import CryptoList from "@/components/CryptoList";
import LanguageSelector from "@/components/LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("dashboard.title")}</h1>
            <p className="text-muted-foreground">{t("dashboard.welcome")}</p>
          </div>
          <LanguageSelector />
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
