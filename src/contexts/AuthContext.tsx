
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  username: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  register: (name: string, username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing user session
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const register = async (name: string, username: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if username already exists
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const usernameExists = existingUsers.find((u: any) => u.username === username);
    
    if (usernameExists) {
      setIsLoading(false);
      return false;
    }
    
    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name,
      username,
      password // In a real app, this would be hashed
    };
    
    // Save to localStorage
    existingUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(existingUsers));
    
    // Set current user
    const userForState = { id: newUser.id, username: newUser.username, name: newUser.name };
    setUser(userForState);
    localStorage.setItem('currentUser', JSON.stringify(userForState));
    
    setIsLoading(false);
    return true;
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check credentials
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const user = existingUsers.find((u: any) => u.username === username && u.password === password);
    
    if (user) {
      const userForState = { id: user.id, username: user.username, name: user.name };
      setUser(userForState);
      localStorage.setItem('currentUser', JSON.stringify(userForState));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
