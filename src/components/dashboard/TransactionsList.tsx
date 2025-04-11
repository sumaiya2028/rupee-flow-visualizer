
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { IndianRupee, Search, ArrowDownLeft, ArrowUpRight, Filter } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface Transaction {
  id: string;
  amount: number;
  type: "credit" | "debit";
  category: string;
  description: string;
  date: Date;
}

interface TransactionsListProps {
  transactions: Transaction[];
}

const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    "Groceries": "bg-green-100 text-green-800",
    "Medical": "bg-blue-100 text-blue-800",
    "Shopping": "bg-purple-100 text-purple-800",
    "Entertainment": "bg-orange-100 text-orange-800",
    "Travel": "bg-yellow-100 text-yellow-800",
    "Food": "bg-red-100 text-red-800",
    "Utilities": "bg-gray-100 text-gray-800",
    "Salary": "bg-emerald-100 text-emerald-800",
  };
  
  return colors[category] || "bg-gray-100 text-gray-800";
};

const TransactionsList = ({ transactions }: TransactionsListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [transactionType, setTransactionType] = useState<"all" | "credit" | "debit">("all");
  
  // Get unique categories
  const categories = Array.from(new Set(transactions.map(t => t.category)));
  
  // Filter transactions
  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(transaction.category);
    const matchesType = transactionType === "all" || transaction.type === transactionType;
    
    return matchesSearch && matchesCategory && matchesType;
  });
  
  // Toggle category selection
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>View and filter your transaction history</CardDescription>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                className="pl-9 h-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-9">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuLabel>Transaction Type</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem 
                  checked={transactionType === "all"}
                  onCheckedChange={() => setTransactionType("all")}
                >
                  All Transactions
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem 
                  checked={transactionType === "credit"}
                  onCheckedChange={() => setTransactionType("credit")}
                >
                  Income
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem 
                  checked={transactionType === "debit"}
                  onCheckedChange={() => setTransactionType("debit")}
                >
                  Expense
                </DropdownMenuCheckboxItem>
                
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Categories</DropdownMenuLabel>
                <DropdownMenuSeparator />
                
                {categories.map((category) => (
                  <DropdownMenuCheckboxItem 
                    key={category}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={() => toggleCategory(category)}
                  >
                    {category}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {filteredTransactions.length > 0 ? (
          <div className="space-y-2">
            {filteredTransactions.map((transaction) => (
              <div 
                key={transaction.id}
                className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div 
                    className={cn(
                      "size-10 rounded-full flex items-center justify-center",
                      transaction.type === "credit" ? "bg-green-100" : "bg-red-100"
                    )}
                  >
                    {transaction.type === "credit" ? (
                      <ArrowDownLeft className="h-5 w-5 text-green-600" />
                    ) : (
                      <ArrowUpRight className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                  
                  <div>
                    <div className="font-medium text-sm">{transaction.description}</div>
                    <div className="text-xs text-muted-foreground">
                      {transaction.date.toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric"
                      })}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end">
                  <div className={cn(
                    "font-medium flex items-center",
                    transaction.type === "credit" ? "text-green-600" : "text-red-600"
                  )}>
                    <IndianRupee className="h-3 w-3 mr-1" />
                    {transaction.type === "credit" ? "+" : "-"}
                    {transaction.amount.toLocaleString("en-IN")}
                  </div>
                  <Badge className={cn("text-xs mt-1", getCategoryColor(transaction.category))}>
                    {transaction.category}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center text-muted-foreground">
            No transactions found matching your filters
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TransactionsList;
