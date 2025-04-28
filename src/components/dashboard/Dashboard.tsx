import { useState } from "react";
import TransactionsList, { Transaction } from "./TransactionsList";
import ExpenseSummary from "./ExpenseSummary";
import SpendingTrends from "./SpendingTrends";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IndianRupee, PieChart, BarChart3, List } from "lucide-react";
import ExpenseForm from "../expenses/ExpenseForm";
import GoalForm from "../goals/GoalForm";

const generateSampleTransactions = (): Transaction[] => {
  const categories = ["Groceries", "Medical", "Shopping", "Entertainment", "Travel", "Food", "Utilities", "Salary"];
  const descriptions = [
    "BigBasket Order", "Apollo Pharmacy", "Amazon Purchase", "BookMyShow Tickets", 
    "Uber Ride", "Swiggy Order", "Electricity Bill", "Monthly Salary",
    "Myntra Shopping", "Medical Checkup", "IRCTC Tickets", "Netflix Subscription",
    "Petrol", "Restaurant Bill", "Mobile Recharge", "Interest Credit"
  ];
  
  const transactions: Transaction[] = [];
  const today = new Date();
  
  for (let i = 0; i < 50; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - Math.floor(Math.random() * 90));
    
    const isCredit = Math.random() > 0.8;
    const category = isCredit ? "Salary" : categories[Math.floor(Math.random() * (categories.length - 1))];
    const description = descriptions[Math.floor(Math.random() * descriptions.length)];
    const amount = isCredit 
      ? Math.floor(Math.random() * 50000) + 25000
      : Math.floor(Math.random() * 5000) + 100;
    
    transactions.push({
      id: `tx-${i}`,
      amount,
      type: isCredit ? "credit" : "debit",
      category,
      description,
      date
    });
  }
  
  return transactions.sort((a, b) => b.date.getTime() - a.date.getTime());
};

const Dashboard = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(generateSampleTransactions());

  const handleAddExpense = (expense: {
    amount: number;
    category: string;
    description: string;
    date: Date;
  }) => {
    const newTransaction: Transaction = {
      id: `tx-${Date.now()}`,
      amount: expense.amount,
      type: "debit",
      category: expense.category,
      description: expense.description,
      date: expense.date
    };

    setTransactions(prev => [newTransaction, ...prev]);
  };

  const handleAddGoal = (goal: {
    name: string;
    targetAmount: number;
    deadline: Date;
  }) => {
    console.log("New goal set:", goal);
  };

  const totalIncome = transactions
    .filter(t => t.type === "credit")
    .reduce((sum, tx) => sum + tx.amount, 0);
    
  const totalExpense = transactions
    .filter(t => t.type === "debit")
    .reduce((sum, tx) => sum + tx.amount, 0);
    
  const balance = totalIncome - totalExpense;

  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold flex items-center">
          <IndianRupee className="h-8 w-8 text-rupeeflow-teal mr-2" />
          RupeeFlow
        </h1>
        <p className="text-muted-foreground">Your financial data at your fingertips</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <ExpenseForm onAddExpense={handleAddExpense} />
        <GoalForm onAddGoal={handleAddGoal} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gradient-to-r from-rupeeflow-teal to-rupeeflow-teal/80 text-white rounded-xl p-4 shadow">
          <div className="text-sm font-medium opacity-80">Balance</div>
          <div className="text-2xl font-bold flex items-center mt-1">
            <IndianRupee className="h-5 w-5 mr-1" />
            {balance.toLocaleString("en-IN")}
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-400 text-white rounded-xl p-4 shadow">
          <div className="text-sm font-medium opacity-80">Total Income</div>
          <div className="text-2xl font-bold flex items-center mt-1">
            <IndianRupee className="h-5 w-5 mr-1" />
            {totalIncome.toLocaleString("en-IN")}
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-red-500 to-red-400 text-white rounded-xl p-4 shadow">
          <div className="text-sm font-medium opacity-80">Total Expenses</div>
          <div className="text-2xl font-bold flex items-center mt-1">
            <IndianRupee className="h-5 w-5 mr-1" />
            {totalExpense.toLocaleString("en-IN")}
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="charts" className="mb-8">
        <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
          <TabsTrigger value="charts">
            <PieChart className="h-4 w-4 mr-2" /> 
            Charts
          </TabsTrigger>
          <TabsTrigger value="trends">
            <BarChart3 className="h-4 w-4 mr-2" /> 
            Trends
          </TabsTrigger>
          <TabsTrigger value="transactions">
            <List className="h-4 w-4 mr-2" /> 
            Transactions
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="charts" className="mt-6">
          <ExpenseSummary transactions={transactions} />
        </TabsContent>
        
        <TabsContent value="trends" className="mt-6">
          <SpendingTrends transactions={transactions} />
        </TabsContent>
        
        <TabsContent value="transactions" className="mt-6">
          <TransactionsList transactions={transactions} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
