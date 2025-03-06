
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

interface Cryptocurrency {
  id: string;
  name: string;
  symbol: string;
  image: string;
}

const fetchAvailableCryptos = async (): Promise<Cryptocurrency[]> => {
  const response = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=20&page=1"
  );
  if (!response.ok) {
    throw new Error("Failed to fetch cryptocurrencies");
  }
  return response.json();
};

interface CryptoSelectorProps {
  onSelectCrypto: (crypto: Cryptocurrency) => void;
  selectedCryptos: string[];
}

const CryptoSelector = ({ onSelectCrypto, selectedCryptos }: CryptoSelectorProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  
  const { data: cryptos, isLoading } = useQuery({
    queryKey: ["availableCryptos"],
    queryFn: fetchAvailableCryptos,
  });

  const handleSelectCrypto = (crypto: Cryptocurrency) => {
    if (selectedCryptos.includes(crypto.id)) {
      toast({
        title: t("crypto.alreadyAdded"),
        description: `${crypto.name} ${t("crypto.alreadyOnYourList")}`,
        variant: "default",
      });
      return;
    }
    
    onSelectCrypto(crypto);
    toast({
      title: t("crypto.added"),
      description: `${crypto.name} ${t("crypto.addedToYourList")}`,
      variant: "default",
    });
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2 bg-background">
          <PlusIcon className="h-4 w-4" />
          {t("crypto.add")}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-background border border-secondary">
        {isLoading ? (
          <DropdownMenuItem disabled>{t("loading")}</DropdownMenuItem>
        ) : (
          cryptos?.map((crypto) => (
            <DropdownMenuItem
              key={crypto.id}
              onClick={() => handleSelectCrypto(crypto)}
              disabled={selectedCryptos.includes(crypto.id)}
              className="cursor-pointer"
            >
              <img 
                src={crypto.image} 
                alt={crypto.name} 
                className="w-5 h-5 mr-2" 
              />
              {crypto.name} ({crypto.symbol.toUpperCase()})
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CryptoSelector;
