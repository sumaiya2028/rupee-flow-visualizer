
import { useState } from "react";
import LoginForm from "@/components/auth/LoginForm";
import ConsentScreen from "@/components/consent/ConsentScreen";
import BankSelection from "@/components/bank/BankSelection";
import TransactionFetching from "@/components/transactions/TransactionFetching";
import Dashboard from "@/components/dashboard/Dashboard";

type AppFlow = "login" | "consent" | "bankSelection" | "fetching" | "dashboard";

const Index = () => {
  const [currentStep, setCurrentStep] = useState<AppFlow>("login");

  // Progress to the next step in the flow
  const handleNext = (nextStep: AppFlow) => {
    setCurrentStep(nextStep);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rupeeflow-lightGray to-white p-4">
      <div className="max-w-4xl mx-auto">
        {currentStep === "login" && (
          <div className="min-h-[90vh] flex items-center justify-center">
            <LoginForm onSuccess={() => handleNext("consent")} />
          </div>
        )}
        
        {currentStep === "consent" && (
          <div className="min-h-[90vh] flex items-center justify-center">
            <ConsentScreen onConsent={() => handleNext("bankSelection")} />
          </div>
        )}
        
        {currentStep === "bankSelection" && (
          <div className="min-h-[90vh] flex items-center justify-center">
            <BankSelection onBankSelect={() => handleNext("fetching")} />
          </div>
        )}
        
        {currentStep === "fetching" && (
          <div className="min-h-[90vh] flex items-center justify-center">
            <TransactionFetching onComplete={() => handleNext("dashboard")} />
          </div>
        )}
        
        {currentStep === "dashboard" && (
          <Dashboard />
        )}
      </div>
    </div>
  );
};

export default Index;
