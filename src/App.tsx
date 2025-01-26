import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/components/theme/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "./components/Navbar";
import ErrorBoundary from "./components/ErrorBoundary";
import AuthStateManager from "./components/auth/AuthStateManager";
import AppRoutes from "./components/routing/AppRoutes";
import ChatBot from "./components/ChatBot";
import { AdminProvider } from "./contexts/AdminContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30000,
      refetchOnWindowFocus: false,
      meta: {
        errorHandler: (error: any) => {
          console.error('Query error:', error);
        },
      },
    },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="ui-theme">
        <AdminProvider>
          <TooltipProvider>
            <ErrorBoundary>
              {/* Toast Notifications */}
              <Toaster />
              <Sonner />
              
              {/* Auth State */}
              <AuthStateManager queryClient={queryClient} />
              
              {/* Main Layout */}
              <BrowserRouter>
                <div className="min-h-screen bg-background flex flex-col">
                  <Navbar />
                  <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-16">
                    <AppRoutes />
                  </main>
                  
                  {/* Fixed Elements */}
                  <div className="fixed bottom-4 right-4 z-50">
                    <ChatBot />
                  </div>
                </div>
              </BrowserRouter>
            </ErrorBoundary>
          </TooltipProvider>
        </AdminProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;