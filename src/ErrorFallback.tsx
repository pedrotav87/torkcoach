import { Alert, AlertTitle, AlertDescription } from "./components/ui/alert";
import { Button } from "./components/ui/button";
import { ArrowClockwise } from "@phosphor-icons/react";

export function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-md w-full space-y-4">
        <Alert variant="destructive">
          <AlertTitle>Something went wrong</AlertTitle>
          <AlertDescription>
            {error.message || "An unexpected error occurred"}
          </AlertDescription>
        </Alert>
        <Button
          className="w-full"
          onClick={resetErrorBoundary}
        >
          <ArrowClockwise className="w-4 h-4 mr-2" />
          Retry
        </Button>
      </div>
    </div>
  );
}
