
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, CheckCircle2, ChevronRight, AlertCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

const ConsentScreen = ({ onConsent }: { onConsent: () => void }) => {
  const [agreed, setAgreed] = useState(false);
  const { toast } = useToast();

  const handleConsent = () => {
    if (!agreed) {
      toast({
        title: "Consent Required",
        description: "Please agree to the data sharing terms before proceeding.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Consent Granted",
      description: "You've successfully given consent for secure data access.",
    });
    onConsent();
  };

  return (
    <Card className="w-full max-w-lg mx-auto card-gradient animate-fade-in">
      <CardHeader className="space-y-1">
        <div className="mx-auto bg-rupeeflow-teal/10 p-3 rounded-full">
          <Shield className="h-10 w-10 text-rupeeflow-teal" />
        </div>
        <CardTitle className="text-2xl text-center">Account Aggregator Consent</CardTitle>
        <CardDescription className="text-center">
          Securely link your bank accounts to access your financial data
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>What is an Account Aggregator?</AlertTitle>
          <AlertDescription>
            An Account Aggregator is a new type of RBI regulated entity that helps individuals securely share their financial data with third parties.
          </AlertDescription>
        </Alert>

        <div className="space-y-3 bg-muted/50 p-4 rounded-lg">
          <h3 className="font-medium flex items-center gap-2">
            <Lock className="h-4 w-4 text-rupeeflow-teal" />
            Your Data Stays Secure
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="flex gap-2 items-center">
              <CheckCircle2 className="h-4 w-4 text-rupeeflow-green" />
              Your data is encrypted end-to-end
            </li>
            <li className="flex gap-2 items-center">
              <CheckCircle2 className="h-4 w-4 text-rupeeflow-green" />
              We don't store your banking credentials
            </li>
            <li className="flex gap-2 items-center">
              <CheckCircle2 className="h-4 w-4 text-rupeeflow-green" />
              You control what data is shared and for how long
            </li>
            <li className="flex gap-2 items-center">
              <CheckCircle2 className="h-4 w-4 text-rupeeflow-green" />
              Revoke access anytime through the app
            </li>
          </ul>
        </div>

        <div className="flex items-center space-x-2">
          <div 
            className={cn(
              "size-5 border rounded flex items-center justify-center cursor-pointer transition-colors",
              agreed ? "bg-rupeeflow-teal border-rupeeflow-teal text-white" : "border-gray-300"
            )}
            onClick={() => setAgreed(!agreed)}
          >
            {agreed && <CheckCircle2 className="size-4" />}
          </div>
          <label className="text-sm cursor-pointer" onClick={() => setAgreed(!agreed)}>
            I consent to RupeeFlow accessing my financial data through the Account Aggregator framework
          </label>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Button 
          onClick={handleConsent} 
          className="w-full bg-rupeeflow-teal hover:bg-rupeeflow-teal/90"
        >
          Proceed to Bank Selection <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
        <p className="text-xs text-center text-muted-foreground px-2">
          By proceeding, you agree to share your financial information in accordance with the Account Aggregator framework and our
          {" "}
          <a href="#" className="underline text-rupeeflow-teal">
            Privacy Policy
          </a>
        </p>
      </CardFooter>
    </Card>
  );
};

export default ConsentScreen;
