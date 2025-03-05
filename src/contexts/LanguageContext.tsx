
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define supported languages
export const languages = {
  en: "English",
  es: "Español",
  pt: "Português",
  fr: "Français",
  it: "Italiano",
  de: "Deutsch",
  hu: "Magyar",
  cs: "Čeština",
  zh: "中文",
  ja: "日本語"
};

// Define language context type
type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
};

// Create the context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
});

// Translation object with all supported languages and keys
const translations: Record<string, Record<string, string>> = {
  en: {
    // Dashboard
    "dashboard.title": "Crypto Dashboard",
    "dashboard.welcome": "Welcome back to your portfolio",
    
    // Market Stats
    "market.cap": "Market Cap",
    "market.volume": "24h Volume",
    "market.dominance": "BTC Dominance",
    
    // Charts
    "chart.bitcoin": "Bitcoin Price",
    "chart.performance": "Bitcoin Performance",
    
    // Crypto List
    "crypto.list.title": "Top Cryptocurrencies",
    "crypto.list.name": "Name",
    "crypto.list.price": "Price",
    "crypto.list.change": "24h Change",
    "crypto.list.volume": "Volume",
    
    // Language Selector
    "language.select": "Select Language"
  },
  es: {
    "dashboard.title": "Panel de Criptomonedas",
    "dashboard.welcome": "Bienvenido de nuevo a tu portafolio",
    "market.cap": "Cap. de Mercado",
    "market.volume": "Volumen 24h",
    "market.dominance": "Dominancia BTC",
    "chart.bitcoin": "Precio de Bitcoin",
    "chart.performance": "Rendimiento de Bitcoin",
    "crypto.list.title": "Principales Criptomonedas",
    "crypto.list.name": "Nombre",
    "crypto.list.price": "Precio",
    "crypto.list.change": "Cambio 24h",
    "crypto.list.volume": "Volumen",
    "language.select": "Seleccionar Idioma"
  },
  pt: {
    "dashboard.title": "Painel de Criptomoedas",
    "dashboard.welcome": "Bem-vindo de volta ao seu portfólio",
    "market.cap": "Cap. de Mercado",
    "market.volume": "Volume 24h",
    "market.dominance": "Dominância BTC",
    "chart.bitcoin": "Preço do Bitcoin",
    "chart.performance": "Desempenho do Bitcoin",
    "crypto.list.title": "Principais Criptomoedas",
    "crypto.list.name": "Nome",
    "crypto.list.price": "Preço",
    "crypto.list.change": "Mudança 24h",
    "crypto.list.volume": "Volume",
    "language.select": "Selecionar Idioma"
  },
  fr: {
    "dashboard.title": "Tableau de Bord Crypto",
    "dashboard.welcome": "Bienvenue à votre portefeuille",
    "market.cap": "Cap. du Marché",
    "market.volume": "Volume 24h",
    "market.dominance": "Dominance BTC",
    "chart.bitcoin": "Prix du Bitcoin",
    "chart.performance": "Performance du Bitcoin",
    "crypto.list.title": "Top Cryptomonnaies",
    "crypto.list.name": "Nom",
    "crypto.list.price": "Prix",
    "crypto.list.change": "Variation 24h",
    "crypto.list.volume": "Volume",
    "language.select": "Sélectionner la Langue"
  },
  it: {
    "dashboard.title": "Dashboard Crypto",
    "dashboard.welcome": "Bentornato al tuo portafoglio",
    "market.cap": "Cap. di Mercato",
    "market.volume": "Volume 24h",
    "market.dominance": "Dominanza BTC",
    "chart.bitcoin": "Prezzo Bitcoin",
    "chart.performance": "Rendimento Bitcoin",
    "crypto.list.title": "Top Criptovalute",
    "crypto.list.name": "Nome",
    "crypto.list.price": "Prezzo",
    "crypto.list.change": "Variazione 24h",
    "crypto.list.volume": "Volume",
    "language.select": "Seleziona Lingua"
  },
  de: {
    "dashboard.title": "Krypto-Dashboard",
    "dashboard.welcome": "Willkommen zurück zu Ihrem Portfolio",
    "market.cap": "Marktkapitalisierung",
    "market.volume": "24h Volumen",
    "market.dominance": "BTC-Dominanz",
    "chart.bitcoin": "Bitcoin-Preis",
    "chart.performance": "Bitcoin-Performance",
    "crypto.list.title": "Top-Kryptowährungen",
    "crypto.list.name": "Name",
    "crypto.list.price": "Preis",
    "crypto.list.change": "24h Änderung",
    "crypto.list.volume": "Volumen",
    "language.select": "Sprache auswählen"
  },
  hu: {
    "dashboard.title": "Kripto Műszerfal",
    "dashboard.welcome": "Üdvözöljük újra a portfóliójában",
    "market.cap": "Piaci Érték",
    "market.volume": "24ó Forgalom",
    "market.dominance": "BTC Dominancia",
    "chart.bitcoin": "Bitcoin Ár",
    "chart.performance": "Bitcoin Teljesítmény",
    "crypto.list.title": "Top Kriptovaluták",
    "crypto.list.name": "Név",
    "crypto.list.price": "Ár",
    "crypto.list.change": "24ó Változás",
    "crypto.list.volume": "Forgalom",
    "language.select": "Nyelv Kiválasztása"
  },
  cs: {
    "dashboard.title": "Krypto Dashboard",
    "dashboard.welcome": "Vítejte zpět ve vašem portfoliu",
    "market.cap": "Tržní Kapitalizace",
    "market.volume": "24h Objem",
    "market.dominance": "BTC Dominance",
    "chart.bitcoin": "Cena Bitcoinu",
    "chart.performance": "Výkonnost Bitcoinu",
    "crypto.list.title": "Top Kryptoměny",
    "crypto.list.name": "Název",
    "crypto.list.price": "Cena",
    "crypto.list.change": "24h Změna",
    "crypto.list.volume": "Objem",
    "language.select": "Vybrat Jazyk"
  },
  zh: {
    "dashboard.title": "加密货币仪表板",
    "dashboard.welcome": "欢迎回到您的投资组合",
    "market.cap": "市值",
    "market.volume": "24小时交易量",
    "market.dominance": "比特币主导地位",
    "chart.bitcoin": "比特币价格",
    "chart.performance": "比特币表现",
    "crypto.list.title": "热门加密货币",
    "crypto.list.name": "名称",
    "crypto.list.price": "价格",
    "crypto.list.change": "24小时变化",
    "crypto.list.volume": "交易量",
    "language.select": "选择语言"
  },
  ja: {
    "dashboard.title": "暗号資産ダッシュボード",
    "dashboard.welcome": "ポートフォリオへようこそ",
    "market.cap": "時価総額",
    "market.volume": "24時間取引高",
    "market.dominance": "BTCドミナンス",
    "chart.bitcoin": "ビットコイン価格",
    "chart.performance": "ビットコインのパフォーマンス",
    "crypto.list.title": "トップ暗号資産",
    "crypto.list.name": "名前",
    "crypto.list.price": "価格",
    "crypto.list.change": "24時間変動",
    "crypto.list.volume": "取引高",
    "language.select": "言語を選択"
  }
};

// Provider component
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Get saved language from localStorage or use default
  const [language, setLanguage] = useState(() => {
    const savedLang = localStorage.getItem('preferred-language');
    return savedLang && Object.keys(languages).includes(savedLang) ? savedLang : 'en';
  });

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('preferred-language', language);
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    if (!translations[language]) return key;
    return translations[language][key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);
