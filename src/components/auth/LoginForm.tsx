
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { IndianRupee, Smartphone } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const LoginForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const { toast } = useToast();

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length !== 10) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit phone number.",
        variant: "destructive",
      });
      return;
    }
    
    // Simulate sending OTP
    toast({
      title: "OTP Sent",
      description: "A verification code has been sent to your phone.",
    });
    
    setStep("otp");
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 6-digit OTP.",
        variant: "destructive",
      });
      return;
    }
    
    // Simulate OTP verification
    setTimeout(() => {
      onSuccess();
    }, 1000);
  };

  return (
    <Card className="w-full max-w-md mx-auto card-gradient animate-fade-in">
      <CardHeader className="space-y-1 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <IndianRupee size={28} className="text-rupeeflow-teal" />
          <span className="text-2xl font-bold text-rupeeflow-teal">RupeeFlow</span>
        </div>
        <CardTitle className="text-2xl">Welcome back</CardTitle>
        <CardDescription>
          {step === "phone" 
            ? "Enter your phone number to sign in to your account" 
            : "Enter the verification code sent to your phone"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {step === "phone" ? (
          <form onSubmit={handlePhoneSubmit} className="space-y-4">
            <div className="space-y-2">
              <div className="flex">
                <span className="inline-flex items-center px-3 border border-r-0 border-input rounded-l-md bg-muted">
                  <Smartphone size={16} className="text-muted-foreground" />
                </span>
                <Input
                  type="tel"
                  placeholder="10-digit mobile number"
                  className="rounded-l-none"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 10))}
                />
              </div>
            </div>
            <Button type="submit" className="w-full bg-rupeeflow-teal hover:bg-rupeeflow-teal/90">
              Send verification code
            </Button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                className="text-center text-lg tracking-widest"
              />
              <p className="text-xs text-center text-muted-foreground">
                Didn't receive code?{" "}
                <button 
                  type="button" 
                  className="text-rupeeflow-teal hover:underline"
                  onClick={() => toast({ title: "OTP Resent", description: "A new verification code has been sent to your phone." })}
                >
                  Resend
                </button>
              </p>
            </div>
            <Button type="submit" className="w-full bg-rupeeflow-teal hover:bg-rupeeflow-teal/90">
              Verify
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              className="w-full" 
              onClick={() => setStep("phone")}
            >
              Back
            </Button>
          </form>
        )}
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <div className="text-sm text-center text-muted-foreground">
          By continuing, you agree to our{" "}
          <a href="#" className="underline text-rupeeflow-teal hover:text-rupeeflow-teal/90">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="underline text-rupeeflow-teal hover:text-rupeeflow-teal/90">
            Privacy Policy
          </a>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
