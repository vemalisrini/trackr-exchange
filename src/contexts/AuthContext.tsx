import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'employee' | 'admin';
  departments: string[];
  currentDepartment?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  switchDepartment: (department: string) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Sample users for demo
const DEMO_USERS: Record<string, User> = {
  'finance@omnitrackr.com': {
    id: '1',
    email: 'finance@omnitrackr.com',
    name: 'Sarah Johnson',
    role: 'employee',
    departments: ['Finance'],
    currentDepartment: 'Finance'
  },
  'cargo@omnitrackr.com': {
    id: '2',
    email: 'cargo@omnitrackr.com',
    name: 'Mike Chen',
    role: 'employee',
    departments: ['Cargo'],
    currentDepartment: 'Cargo'
  },
  'ops@omnitrackr.com': {
    id: '3',
    email: 'ops@omnitrackr.com',
    name: 'David Rodriguez',
    role: 'employee',
    departments: ['Operations'],
    currentDepartment: 'Operations'
  },
  'loyalty@omnitrackr.com': {
    id: '4',
    email: 'loyalty@omnitrackr.com',
    name: 'Emma Watson',
    role: 'employee',
    departments: ['Loyalty'],
    currentDepartment: 'Loyalty'
  },
  'admin@omnitrackr.com': {
    id: '5',
    email: 'admin@omnitrackr.com',
    name: 'John Smith',
    role: 'admin',
    departments: ['Finance', 'Cargo', 'Operations', 'Loyalty', 'Commercial', 'Customer Experience', 'Engineering', 'HR/Admin'],
    currentDepartment: 'Finance'
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for stored auth
    const storedUser = localStorage.getItem('omnitrackr_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Demo login - check credentials
    if (password === 'pass123' && DEMO_USERS[email]) {
      const userData = DEMO_USERS[email];
      setUser(userData);
      localStorage.setItem('omnitrackr_user', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('omnitrackr_user');
  };

  const switchDepartment = (department: string) => {
    if (user && user.departments.includes(department)) {
      const updatedUser = { ...user, currentDepartment: department };
      setUser(updatedUser);
      localStorage.setItem('omnitrackr_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      switchDepartment,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};