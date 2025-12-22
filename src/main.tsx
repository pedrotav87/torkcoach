import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from "react-error-boundary";
import "@github/spark/spark"

import App from './App.tsx'
import { ErrorFallback } from './ErrorFallback.tsx'
import { AuthProvider } from './contexts/AuthContext.tsx'
import { ConfigurationError } from './components/ConfigurationError.tsx'
import { Toaster } from './components/ui/sonner.tsx'
import { isSupabaseConfigured } from './lib/supabase.ts'

import "./main.css"
import "./styles/theme.css"
import "./index.css"

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    {isSupabaseConfigured ? (
      <AuthProvider>
        <App />
        <Toaster />
      </AuthProvider>
    ) : (
      <ConfigurationError />
    )}
   </ErrorBoundary>
)
