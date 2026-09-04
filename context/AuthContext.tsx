"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  isEmailVerified: boolean;
  isOnboarded: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  verifyEmail: (email: string, code: string) => Promise<void>;
  completeOnboarding: (data: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch current user session on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.get("/auth/me");
        setUser(data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const login = async ({ email, password }: any) => {
    const { data } = await api.post("/auth/login", { email, password });
    if (data.tokens) {
      localStorage.setItem("accessToken", data.tokens.accessToken);
    }
    setUser(data.user);
    
    if (!data.isOnboarded) {
      router.push("/onboarding");
    } else {
      router.push("/dashboard");
    }
  };

  const register = async (formData: any) => {
    await api.post("/auth/register", formData);
  };

  const verifyEmail = async (email: string, code: string) => {
    const { data } = await api.post("/auth/verify-email", { email, code });
    if (data.tokens) {
      localStorage.setItem("accessToken", data.tokens.accessToken);
    }
    setUser(data.user);
    router.push("/onboarding");
  };

  const completeOnboarding = async (onboardingData: any) => {
    const { data } = await api.post("/psyche/onboarding", onboardingData);
    if (data.isOnboarded) {
      router.push("/dashboard");
    }
    return data;
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (e) {
      // ignore
    }
    localStorage.removeItem("accessToken");
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, verifyEmail, completeOnboarding }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};