import { Alert, AlertTitle, AlertDescription } from "./components/ui/alert";
import { ArrowClockwise } from "@phosphor-icons/react";
import { Button } from "./components/ui/button";

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export default function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="max-w-md w-full">
        <Alert variant="destructive">
          <AlertTitle>Something went wrong</AlertTitle>
          <AlertDescription className="mt-2">
            {error.message || "An unexpected error occurred. Please try again."}
          </AlertDescription>
          <Button 
            onClick={resetErrorBoundary} 
            variant="outline" 
            className="mt-4 w-full"
          >
            <ArrowClockwise className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        </Alert>
      </div>
    </div>
  )
}



















