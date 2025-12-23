import { Alert, AlertTitle, AlertDescription } from "./components/ui/alert";
import { ArrowClockwise } from "@phosphor-icons/
import { ArrowClockwise } from "@phosphor-icons/react";

export default function ErrorF
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



















