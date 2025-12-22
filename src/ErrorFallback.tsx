import { Alert, AlertTitle, AlertDescription } from "./components/ui/alert";
import { Button } from "./components/ui/button";
import { ArrowClockwise } from "@phosphor-icons/react";

interface ErrorFallbackProps {
  resetErrorBoundary: () => void;
}

export default function ErrorFallback({ resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div className="w-full max-w-md mx-auto p-4">
      <Alert variant="destructive">
        <AlertTitle>Something went wrong</AlertTitle>
        <AlertDescription>
          An unexpected error occurred. You can try again.
        </AlertDescription>
      </Alert>

      <Button
        onClick={resetErrorBoundary}
        className="w-full mt-4"
      >
        <ArrowClockwise className="w-4 h-4 mr-2" />
        Retry
      </Button>
    </div>
  );
}

