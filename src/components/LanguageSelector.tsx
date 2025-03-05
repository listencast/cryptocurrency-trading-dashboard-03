
import { languages, useLanguage } from "@/contexts/LanguageContext";
import { GlobeIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LanguageSelector = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 text-sm px-2 py-1 rounded-md hover:bg-secondary/20 transition-colors">
        <GlobeIcon className="h-4 w-4" />
        <span>{languages[language as keyof typeof languages]}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(languages).map(([code, name]) => (
          <DropdownMenuItem
            key={code}
            onClick={() => setLanguage(code)}
            className={`${language === code ? 'bg-secondary/20' : ''} cursor-pointer`}
          >
            {name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
