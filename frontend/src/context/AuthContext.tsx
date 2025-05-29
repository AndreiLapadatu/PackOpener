import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface User {
  id: number;
  username: string;
  isNewUser?: boolean;
}

interface AuthContextType {
  user: User | null;
  coins: number;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
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
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [coins, setCoins] = useState<number>(() => {
    const savedCoins = localStorage.getItem('coins');
    return savedCoins ? parseInt(savedCoins, 10) : 0;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('coins', coins.toString());
  }, [coins]);

  const login = async (username: string, password: string) => {
    try {
      // In a real app, you would make an API call here
      const mockUser = { id: Date.now(), username };
      setUser(mockUser);
      
      // Load existing coins from localStorage based on username
      const savedCoins = localStorage.getItem(`coins_${username}`);
      if (savedCoins) {
        setCoins(parseInt(savedCoins, 10));
      } else {
        setCoins(0);
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const register = async (username: string, password: string) => {
    try {
      // In a real app, you would make an API call here
      const mockUser = { id: Date.now(), username, isNewUser: true };
      setUser(mockUser);
      setCoins(1000); // Initial coins only for new users
      localStorage.setItem(`coins_${username}`, '1000');
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const logout = () => {
    if (user) {
      // Save coins for the current user before logging out
      localStorage.setItem(`coins_${user.username}`, coins.toString());
    }
    setUser(null);
    setCoins(0);
    localStorage.removeItem('user');
  };

  const updateCoins = (amount: number) => {
    setCoins(prev => {
      const newAmount = prev + amount;
      if (user) {
        localStorage.setItem(`coins_${user.username}`, newAmount.toString());
      }
      return newAmount;
    });
  };

  return (
    <AuthContext.Provider value={{ user, coins, login, register, logout, updateCoins }}>
      {children}
    </AuthContext.Provider>
  );
}; 