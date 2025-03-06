
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import CryptoSelector from "./CryptoSelector";

const fetchCryptoData = async (cryptoIds: string[]) => {
  if (!cryptoIds.length) return [];
  
  const idsParam = cryptoIds.join(",");
  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${idsParam}&order=market_cap_desc&per_page=20&page=1&sparkline=false`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const CryptoList = () => {
  const { t } = useLanguage();
  const { user, isAuthenticated, updateUserPreferences } = useAuth();
  const [selectedCryptoIds, setSelectedCryptoIds] = useState<string[]>(['bitcoin', 'ethereum', 'ripple', 'cardano', 'solana']);
  
  // Initialize from user preferences if logged in
  useEffect(() => {
    if (isAuthenticated && user?.preferences.selectedCryptos) {
      setSelectedCryptoIds(user.preferences.selectedCryptos);
    }
  }, [isAuthenticated, user]);
  
  const { data: cryptos, isLoading } = useQuery({
    queryKey: ['cryptos', selectedCryptoIds],
    queryFn: () => fetchCryptoData(selectedCryptoIds),
    refetchInterval: 30000, // Refetch every 30 seconds
    enabled: selectedCryptoIds.length > 0,
  });

  const handleAddCrypto = (crypto: any) => {
    const updatedCryptos = [...selectedCryptoIds, crypto.id];
    setSelectedCryptoIds(updatedCryptos);
    
    // Update user preferences if logged in
    if (isAuthenticated) {
      updateUserPreferences({ selectedCryptos: updatedCryptos });
    }
  };

  if (isLoading) {
    return <div className="glass-card rounded-lg p-6 animate-pulse">Loading...</div>;
  }

  return (
    <div className="glass-card rounded-lg p-6 animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">{t("crypto.list.title")}</h2>
        <CryptoSelector 
          onSelectCrypto={handleAddCrypto} 
          selectedCryptos={selectedCryptoIds}
        />
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-muted-foreground">
              <th className="pb-4">{t("crypto.list.name")}</th>
              <th className="pb-4">{t("crypto.list.price")}</th>
              <th className="pb-4">{t("crypto.list.change")}</th>
              <th className="pb-4">{t("crypto.list.volume")}</th>
            </tr>
          </thead>
          <tbody>
            {cryptos?.map((crypto) => (
              <tr key={crypto.symbol} className="border-t border-secondary">
                <td className="py-4">
                  <div className="flex items-center gap-2">
                    <img src={crypto.image} alt={crypto.name} className="w-8 h-8 rounded-full" />
                    <div>
                      <p className="font-medium">{crypto.name}</p>
                      <p className="text-sm text-muted-foreground">{crypto.symbol.toUpperCase()}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4">${crypto.current_price.toLocaleString()}</td>
                <td className="py-4">
                  <span
                    className={`flex items-center gap-1 ${
                      crypto.price_change_percentage_24h >= 0 ? "text-success" : "text-warning"
                    }`}
                  >
                    {crypto.price_change_percentage_24h >= 0 ? (
                      <ArrowUpIcon className="w-3 h-3" />
                    ) : (
                      <ArrowDownIcon className="w-3 h-3" />
                    )}
                    {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
                  </span>
                </td>
                <td className="py-4">${(crypto.total_volume / 1e9).toFixed(1)}B</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CryptoList;
