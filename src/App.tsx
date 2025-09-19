import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import LoginPage from "./components/auth/LoginPage";
import { MainLayout } from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Alerts from "./pages/Alerts";
import FileSources from "./pages/FileSources";
import OutwardFiles from "./pages/OutwardFiles";
import FileValidation from "./pages/FileValidation";
import AuditLogs from "./pages/AuditLogs";
import Reports from "./pages/Reports";
import Departments from "./pages/Departments";
import AdminSettings from "./pages/AdminSettings";

const queryClient = new QueryClient();

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

// Public Route Component (redirect if authenticated)
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? <>{children}</> : <Navigate to="/dashboard" replace />;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    } />
    <Route path="/" element={
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    }>
      <Route index element={<Navigate to="/dashboard" replace />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="alerts" element={<Alerts />} />
      <Route path="file-sources" element={<FileSources />} />
      <Route path="outward-files" element={<OutwardFiles />} />
      <Route path="file-validation" element={<FileValidation />} />
      <Route path="audit-logs" element={<AuditLogs />} />
      <Route path="reports" element={<Reports />} />
      <Route path="departments" element={<Departments />} />
      <Route path="admin-settings" element={<AdminSettings />} />
    </Route>
    <Route path="*" element={<Navigate to="/dashboard" replace />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
