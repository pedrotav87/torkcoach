import { Alert, AlertTitle, AlertDescription } from "./components/ui/alert";
import { Button } from "./components/ui/button";
import { ArrowClockwise } from "@phosphor-icons/react";

interface ErrorFallbackProps {
  resetErrorBoundary: () => void;
}

export default function ErrorFallback({ resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div className="p-4 max-w-md mx-auto">
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Something went wrong. Please try again.
        </AlertDescription>
      </Alert>

      <Button
        onClick={resetErrorBoundary}
        className="w-full mt-4 flex items-center justify-center gap-2"
      >
        <ArrowClockwise size={18} />
        Retry
      </Button>
    </div>
  );
}







