
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Shield, Server, FileJson, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  status: "pending" | "active" | "completed";
}

const Step = ({ icon, title, description, status }: StepProps) => {
  return (
    <div className="flex gap-3 items-start">
      <div 
        className={cn(
          "size-10 rounded-full flex items-center justify-center",
          status === "pending" ? "bg-muted" : 
          status === "active" ? "bg-rupeeflow-teal/20" : 
          "bg-rupeeflow-teal"
        )}
      >
        <div className={cn(
          "size-6", 
          status === "completed" ? "text-white" : 
          status === "active" ? "text-rupeeflow-teal" : 
          "text-muted-foreground"
        )}>
          {icon}
        </div>
      </div>
      <div className="flex-1">
        <h4 className={cn(
          "font-medium",
          status === "pending" ? "text-muted-foreground" : "text-foreground"
        )}>
          {title}
        </h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

const TransactionFetching = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    {
      icon: <Shield />,
      title: "Establishing secure connection",
      description: "Creating an encrypted tunnel for data transfer",
    },
    {
      icon: <Server />,
      title: "Fetching transaction data",
      description: "Retrieving your financial data via Account Aggregator",
    },
    {
      icon: <FileJson />,
      title: "Processing transactions",
      description: "Categorizing and analyzing your transactions",
    },
    {
      icon: <CheckCircle2 />,
      title: "Data import complete",
      description: "Successfully imported and processed your transactions",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (progress < 100) {
        const newProgress = progress + 1;
        setProgress(newProgress);
        
        // Update step based on progress
        if (newProgress <= 20) {
          setCurrentStep(0);
        } else if (newProgress <= 60) {
          setCurrentStep(1);
        } else if (newProgress <= 90) {
          setCurrentStep(2);
        } else {
          setCurrentStep(3);
        }
        
        // Complete when reaching 100%
        if (newProgress === 100) {
          setTimeout(() => {
            onComplete();
          }, 1000);
        }
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [progress, onComplete]);

  return (
    <Card className="w-full max-w-lg mx-auto card-gradient animate-fade-in p-1">
      <CardHeader>
        <CardTitle className="text-xl text-center">Fetching Your Data</CardTitle>
        <CardDescription className="text-center">
          Please wait while we securely fetch and process your transactions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="space-y-4">
          {steps.map((step, index) => (
            <Step
              key={index}
              icon={step.icon}
              title={step.title}
              description={step.description}
              status={
                index < currentStep
                  ? "completed"
                  : index === currentStep
                  ? "active"
                  : "pending"
              }
            />
          ))}
        </div>

        <p className="text-xs text-center text-muted-foreground">
          Your data is being processed securely and will only be used as per your consent
        </p>
      </CardContent>
    </Card>
  );
};

export default TransactionFetching;
