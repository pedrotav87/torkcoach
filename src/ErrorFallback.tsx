import { Alert, AlertTitle, AlertDescription } from "./components/ui/alert";
import { Warning, ArrowClockwise } from "@phosph
interface ErrorFallbackProps {

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
 

          <AlertDescription>
          </AlertDescription>

          
            {error.message}
        </div>
        <Button 
          className="w-full"
        >
          Try Again
      </div>
  );















          Try Again
        </Button>
      </div>
    </div>
  );
}
