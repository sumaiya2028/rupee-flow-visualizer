
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

interface Bank {
  id: string;
  name: string;
  logoUrl: string;
}

const banks: Bank[] = [
  { id: "sbi", name: "State Bank of India", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/SBI-logo.svg/200px-SBI-logo.svg.png" },
  { id: "hdfc", name: "HDFC Bank", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/HDFC_Bank_Logo.svg/200px-HDFC_Bank_Logo.svg.png" },
  { id: "icici", name: "ICICI Bank", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/ICICI_Bank_Logo.svg/200px-ICICI_Bank_Logo.svg.png" },
  { id: "axis", name: "Axis Bank", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Axis_Bank_logo.svg/200px-Axis_Bank_logo.svg.png" },
  { id: "kotak", name: "Kotak Mahindra Bank", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Kotak_Mahindra_Bank_logo.svg/200px-Kotak_Mahindra_Bank_logo.svg.png" },
  { id: "pnb", name: "Punjab National Bank", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Punjab_National_Bank.svg/200px-Punjab_National_Bank.svg.png" },
  { id: "bob", name: "Bank of Baroda", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Bank_of_Baroda_logo.svg/200px-Bank_of_Baroda_logo.svg.png" },
  { id: "canara", name: "Canara Bank", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Canara_Bank_logo.svg/200px-Canara_Bank_logo.svg.png" },
];

const BankSelection = ({ onBankSelect }: { onBankSelect: () => void }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const { toast } = useToast();

  const filteredBanks = banks.filter(bank =>
    bank.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBankSelect = (bankId: string) => {
    setSelectedBank(bankId);
  };

  const handleContinue = () => {
    if (!selectedBank) {
      toast({
        title: "Bank Selection Required",
        description: "Please select a bank to continue.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Bank Selected",
      description: `You've selected ${banks.find(b => b.id === selectedBank)?.name}.`,
    });
    onBankSelect();
  };

  return (
    <Card className="w-full max-w-lg mx-auto card-gradient animate-fade-in">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Select Your Bank</CardTitle>
        <CardDescription className="text-center">
          Choose your bank to link through Account Aggregator
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search banks..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto pr-1">
          {filteredBanks.map((bank) => (
            <div
              key={bank.id}
              className={`border p-3 rounded-lg cursor-pointer transition-all flex flex-col items-center justify-center gap-2 hover:border-rupeeflow-teal ${
                selectedBank === bank.id ? "border-rupeeflow-teal bg-rupeeflow-teal/5" : "border-border"
              }`}
              onClick={() => handleBankSelect(bank.id)}
            >
              <div className="h-10 w-10 flex items-center justify-center">
                <img 
                  src={bank.logoUrl} 
                  alt={`${bank.name} logo`} 
                  className="max-h-full max-w-full object-contain" 
                />
              </div>
              <span className="text-sm font-medium text-center">{bank.name}</span>
            </div>
          ))}
          
          {filteredBanks.length === 0 && (
            <div className="col-span-2 py-8 text-center text-muted-foreground">
              No banks found matching your search
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button 
          onClick={handleContinue}
          className="w-full bg-rupeeflow-teal hover:bg-rupeeflow-teal/90"
        >
          Continue
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BankSelection;
