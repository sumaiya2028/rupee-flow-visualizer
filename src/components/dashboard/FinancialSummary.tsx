
import { IndianRupee } from "lucide-react";
import { Transaction } from "./TransactionsList";

interface FinancialSummaryProps {
  transactions: Transaction[];
}

const FinancialSummary = ({ transactions }: FinancialSummaryProps) => {
  const totalIncome = transactions
    .filter(t => t.type === "credit")
    .reduce((sum, tx) => sum + tx.amount, 0);
    
  const totalExpense = transactions
    .filter(t => t.type === "debit")
    .reduce((sum, tx) => sum + tx.amount, 0);
    
  const balance = totalIncome - totalExpense;

  return (
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
  );
};

export default FinancialSummary;
