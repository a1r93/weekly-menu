import type { ReactNode } from "react";
import { createContext, useContext } from "react";
import { authClient } from "@/lib/auth-client";

type AuthContextType = {
  isPending: boolean;
  refetch: () => void;
  user: User | null;
};

type User = {
  createdAt: Date;
  email: string;
  emailVerified: boolean;
  id: string;
  image?: string | null | undefined;
  name: string;
  updatedAt: Date;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data, isPending, refetch } = authClient.useSession();
  const user = data?.user ?? null;

  return (
    <AuthContext.Provider value={{ isPending, refetch, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
