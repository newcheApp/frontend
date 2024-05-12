import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  FunctionComponent,
} from "react";

// Define the user interface
interface User {
  id: string;
  email: string;
  userName: string;
  name: string;
  surname: string;
  role: string;
  tags: string[];
}

// Define the context type
interface AuthContextType {
  user: User | null;
  signIn: (userData: User) => void;
  signOut: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | null>(null);

// Export the hook for accessing the context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Define the props for the provider component
interface AuthProviderProps {
  children: ReactNode;
}

// Implement the provider component
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
