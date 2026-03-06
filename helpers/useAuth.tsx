import React, { useState, useEffect, createContext, useContext, ReactNode } from "react";

type AuthState = 
  | { type: 'loading' }
  | { type: 'unauthenticated' }
  | { type: 'authenticated'; user: any };

interface AuthContextType {
  user: any | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasRole: (role: string) => boolean;
  authState: AuthState;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth token/user on mount
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - replace with actual API call
    if (email && password) {
      const mockUser = {
        id: "1",
        email,
        name: "Admin User",
        role: "admin",
      };
      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const hasRole = (role: string): boolean => {
    return user?.role === role || user?.role === "superadmin";
  };

  // Compute authState for compatibility
  const authState: AuthState = isLoading 
    ? { type: 'loading' }
    : user 
      ? { type: 'authenticated', user }
      : { type: 'unauthenticated' };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        hasRole,
        authState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export default useAuth;
