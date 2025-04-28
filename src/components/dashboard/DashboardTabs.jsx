
import { PieChart, BarChart3, List } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TransactionsList from "./TransactionsList";
import ExpenseSummary from "./ExpenseSummary";
import SpendingTrends from "./SpendingTrends";

const DashboardTabs = ({ transactions }) => {
  return (
    <Tabs defaultValue="charts" className="w-full">
      <TabsList className="w-full flex justify-between mb-4 h-12 items-center bg-muted/50 p-1 text-muted-foreground rounded-lg">
        <TabsTrigger 
          value="charts" 
          className="w-full data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow rounded-md transition-all"
        >
          <PieChart className="h-4 w-4 mr-2" />
          Charts
        </TabsTrigger>
        <TabsTrigger 
          value="trends"
          className="w-full data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow rounded-md transition-all"
        >
          <BarChart3 className="h-4 w-4 mr-2" />
          Trends
        </TabsTrigger>
        <TabsTrigger 
          value="transactions"
          className="w-full data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow rounded-md transition-all"
        >
          <List className="h-4 w-4 mr-2" />
          Transactions
        </TabsTrigger>
      </TabsList>

      <div className="mt-4">
        <TabsContent value="charts" className="m-0">
          <ExpenseSummary transactions={transactions} />
        </TabsContent>
        
        <TabsContent value="trends" className="m-0">
          <SpendingTrends transactions={transactions} />
        </TabsContent>
        
        <TabsContent value="transactions" className="m-0">
          <TransactionsList transactions={transactions} />
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default DashboardTabs;
