import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from "react-error-boundary";
import "@github/spark/spark"


import App from './App.tsx'
import ErrorFallback from './ErrorFallback.tsx'
import { AuthProvider } from './contexts/AuthContext.tsx'
import { Toaster } from './components/ui/sonner.tsx'

import "./main.css"
import "./styles/theme.css"
import "./index.css"
import { auth, db } from "./lib/firebase"

console.log("🔥 main.tsx loaded")

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <AuthProvider>
      <App />
      <Toaster />
    </AuthProvider>
  </ErrorBoundary>
)
