"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Role = 'COMMANDER' | 'STUDENT';

export interface UserProfile {
  id: string;
  name: string;
  role: Role;
  avatarColor: string;
  // Mock metrics for students
  metrics?: {
    overallHealth: number;
    safetyScore: number;
    activeAnomalies: number;
  };
}

export const MOCK_USERS: UserProfile[] = [
  {
    id: 'cmd-1',
    name: 'Admin',
    role: 'COMMANDER',
    avatarColor: 'bg-[#00e5ff]',
  },
  {
    id: 'stu-1',
    name: 'Student Alpha',
    role: 'STUDENT',
    avatarColor: 'bg-[#ff3d00]',
    metrics: { overallHealth: 92, safetyScore: 99, activeAnomalies: 0 }
  },
  {
    id: 'stu-2',
    name: 'Student Beta',
    role: 'STUDENT',
    avatarColor: 'bg-[#00e676]',
    metrics: { overallHealth: 74, safetyScore: 85, activeAnomalies: 2 }
  },
  {
    id: 'stu-3',
    name: 'Student Gamma',
    role: 'STUDENT',
    avatarColor: 'bg-[#7c4dff]',
    metrics: { overallHealth: 88, safetyScore: 94, activeAnomalies: 0 }
  },
];

interface AuthContextType {
  currentUser: UserProfile;
  setCurrentUser: (user: UserProfile) => void;
  users: UserProfile[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<UserProfile>(MOCK_USERS[0]);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, users: MOCK_USERS }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
