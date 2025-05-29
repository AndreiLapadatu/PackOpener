import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: number;
  username: string;
}

interface AuthContextType {
  user: User | null;
  coins: number;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  updateCoins: (amount: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [coins, setCoins] = useState<number>(1000);

  const login = async (username: string, password: string) => {
    try {
      // TODO: Implement actual API call
      const mockUser = { id: 1, username };
      setUser(mockUser);
      setCoins(1000); // Initial coins
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setCoins(0);
  };

  const updateCoins = (amount: number) => {
    setCoins(prev => prev + amount);
  };

  return (
    <AuthContext.Provider value={{ user, coins, login, logout, updateCoins }}>
      {children}
    </AuthContext.Provider>
  );
}; 