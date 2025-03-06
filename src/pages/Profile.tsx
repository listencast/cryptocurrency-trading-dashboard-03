
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import LanguageSelector from "@/components/LanguageSelector";

const Profile = () => {
  const { user, logout, updateUserPreferences } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [theme, setTheme] = useState(user?.preferences.theme || "dark");

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    updateUserPreferences({ theme: newTheme });
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("profile.title")}</h1>
            <p className="text-muted-foreground">{t("profile.manageAccount")}</p>
          </div>
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            <Button variant="outline" onClick={() => navigate("/")}>
              {t("backToDashboard")}
            </Button>
          </div>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="glass-card rounded-lg p-6 animate-fade-in">
              <h2 className="text-xl font-semibold mb-4">{t("profile.accountInfo")}</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground">{t("auth.name")}</label>
                  <p className="font-medium">{user.name}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">{t("auth.email")}</label>
                  <p className="font-medium">{user.email}</p>
                </div>
                
                <Button 
                  variant="destructive" 
                  className="w-full mt-4"
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                >
                  {t("auth.logout")}
                </Button>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <div className="glass-card rounded-lg p-6 animate-fade-in">
              <h2 className="text-xl font-semibold mb-4">{t("profile.preferences")}</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">
                    {t("profile.theme")}
                  </label>
                  <div className="flex space-x-2">
                    <Button 
                      variant={theme === "dark" ? "default" : "outline"}
                      onClick={() => handleThemeChange("dark")}
                      className="flex-1"
                    >
                      {t("profile.darkTheme")}
                    </Button>
                    <Button 
                      variant={theme === "light" ? "default" : "outline"}
                      onClick={() => handleThemeChange("light")}
                      className="flex-1"
                    >
                      {t("profile.lightTheme")}
                    </Button>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">
                    {t("profile.cryptoPreferences")}
                  </label>
                  <p className="text-muted-foreground text-sm">
                    {t("profile.cryptoPreferencesDescription")}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {user.preferences.selectedCryptos.map((crypto: string) => (
                      <div key={crypto} className="px-3 py-1 rounded-full bg-secondary text-sm">
                        {crypto.charAt(0).toUpperCase() + crypto.slice(1)}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm mt-2">
                    <span className="text-muted-foreground">{t("profile.editOnDashboard")}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
