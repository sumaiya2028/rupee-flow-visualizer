import { useState } from "react";
import { IndianRupee } from "lucide-react";
import { Transaction } from "./TransactionsList";
import FinancialSummary from "./FinancialSummary";
import DashboardTabs from "./DashboardTabs";
import FormSection from "./FormSection";

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

  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold flex items-center">
          <IndianRupee className="h-8 w-8 text-rupeeflow-teal mr-2" />
          RupeeFlow
        </h1>
        <p className="text-muted-foreground">Your financial data at your fingertips</p>
      </header>

      <FormSection onAddExpense={handleAddExpense} onAddGoal={handleAddGoal} />
      <FinancialSummary transactions={transactions} />
      <DashboardTabs transactions={transactions} />
    </div>
  );
};

export default Dashboard;
