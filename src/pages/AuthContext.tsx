// AuthContext.tsx

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  FunctionComponent,
} from "react";

export interface User {
  id: string;
  email: string;
  userName: string;
  name: string;
  surname: string;
  role: string;
  tags: string[];
}

interface AuthContextType {
  user: User | null;
  signIn: (userData: User) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FunctionComponent<AuthProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const signIn = (userData: User) => {
    setUser(userData);
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
