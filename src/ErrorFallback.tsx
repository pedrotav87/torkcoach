import { Alert, AlertTitle, AlertDescription } from "./components/ui/alert";
import { Warning, ArrowClockwise } from "@phosphor-icons/react";
import { Button } from "./components/ui/button";

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <Alert variant="destructive">
          <Warning className="h-5 w-5" />
          <AlertTitle>Something went wrong</AlertTitle>
          <AlertDescription>
            {error.message}
          </AlertDescription>
        </Alert>
        <Button 
          onClick={resetErrorBoundary}
          className="w-full mt-4"
        >
          <ArrowClockwise className="w-4 h-4 mr-2" />
          Try Again
        </Button>
      </div>
    </div>
  );
}
