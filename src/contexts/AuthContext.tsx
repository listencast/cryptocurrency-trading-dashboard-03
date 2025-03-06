
import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

interface User {
  id: string;
  email: string;
  name: string;
  preferences: {
    selectedCryptos: string[];
    theme?: string;
    defaultChart?: string;
  };
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUserPreferences: (preferences: Partial<User['preferences']>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { t } = useLanguage();

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('crypto_dashboard_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Error parsing saved user:", error);
        localStorage.removeItem('crypto_dashboard_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call to your backend
      // Simulating an API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, find user in localStorage
      const allUsers = JSON.parse(localStorage.getItem('crypto_dashboard_users') || '[]');
      const foundUser = allUsers.find(
        (u: any) => u.email === email && u.password === password
      );
      
      if (!foundUser) {
        throw new Error("Invalid credentials");
      }
      
      // Remove password before storing in state
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('crypto_dashboard_user', JSON.stringify(userWithoutPassword));
      
      toast({
        title: t("auth.welcome"),
        description: t("auth.loginSuccess"),
      });
    } catch (error) {
      toast({
        title: t("auth.loginFailed"),
        description: error instanceof Error ? error.message : t("auth.invalidCredentials"),
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      const allUsers = JSON.parse(localStorage.getItem('crypto_dashboard_users') || '[]');
      if (allUsers.some((u: any) => u.email === email)) {
        throw new Error("User with this email already exists");
      }
      
      // Create new user
      const newUser = {
        id: `user_${Date.now()}`,
        name,
        email,
        password, // In a real app, this would be hashed
        preferences: {
          selectedCryptos: ['bitcoin', 'ethereum'],
          theme: 'dark',
        }
      };
      
      // Save user to "database"
      allUsers.push(newUser);
      localStorage.setItem('crypto_dashboard_users', JSON.stringify(allUsers));
      
      // Log in the user automatically
      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      localStorage.setItem('crypto_dashboard_user', JSON.stringify(userWithoutPassword));
      
      toast({
        title: t("auth.registered"),
        description: t("auth.accountCreated"),
      });
    } catch (error) {
      toast({
        title: t("auth.registrationFailed"),
        description: error instanceof Error ? error.message : t("auth.errorOccurred"),
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('crypto_dashboard_user');
    toast({
      title: t("auth.loggedOut"),
      description: t("auth.comeBackSoon"),
    });
  };

  const updateUserPreferences = (preferences: Partial<User['preferences']>) => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      preferences: {
        ...user.preferences,
        ...preferences
      }
    };
    
    setUser(updatedUser);
    localStorage.setItem('crypto_dashboard_user', JSON.stringify(updatedUser));
    
    // Also update in the "database"
    const allUsers = JSON.parse(localStorage.getItem('crypto_dashboard_users') || '[]');
    const updatedUsers = allUsers.map((u: any) => 
      u.id === user.id ? { ...u, preferences: updatedUser.preferences } : u
    );
    localStorage.setItem('crypto_dashboard_users', JSON.stringify(updatedUsers));
    
    toast({
      title: t("settings.updated"),
      description: t("settings.preferencesUpdated"),
    });
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user, 
        isLoading, 
        login, 
        register, 
        logout,
        updateUserPreferences
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
