
import { PieChart, BarChart3, List } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TransactionsList, { Transaction } from "./TransactionsList";
import ExpenseSummary from "./ExpenseSummary";
import SpendingTrends from "./SpendingTrends";

interface DashboardTabsProps {
  transactions: Transaction[];
}

const DashboardTabs = ({ transactions }: DashboardTabsProps) => {
  return (
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
  );
};

export default DashboardTabs;
