
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Transaction } from "./TransactionsList";
import { IndianRupee } from "lucide-react";

interface ExpenseSummaryProps {
  transactions: Transaction[];
}

interface CategoryData {
  name: string;
  value: number;
  color: string;
}

const COLORS = [
  "#38B2AC", // teal
  "#F6AD55", // orange
  "#9F7AEA", // purple
  "#FEB2B2", // pink
  "#4299E1", // blue
  "#48BB78", // green
  "#ED8936", // orange-dark
  "#A0AEC0", // gray
];

const ExpenseSummary = ({ transactions }: ExpenseSummaryProps) => {
  const getWeeklyData = (): CategoryData[] => {
    // Group by category for the last week
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    return prepareCategoryData(
      transactions.filter(t => t.type === "debit" && t.date >= oneWeekAgo)
    );
  };

  const getMonthlyData = (): CategoryData[] => {
    // Group by category for the last month
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    
    return prepareCategoryData(
      transactions.filter(t => t.type === "debit" && t.date >= oneMonthAgo)
    );
  };

  const prepareCategoryData = (txs: Transaction[]): CategoryData[] => {
    const categoryTotals: Record<string, number> = {};
    
    // Sum up amounts by category
    txs.forEach(tx => {
      if (categoryTotals[tx.category]) {
        categoryTotals[tx.category] += tx.amount;
      } else {
        categoryTotals[tx.category] = tx.amount;
      }
    });
    
    // Convert to chart data format
    return Object.entries(categoryTotals)
      .map(([name, value], index) => ({
        name,
        value,
        color: COLORS[index % COLORS.length]
      }))
      .sort((a, b) => b.value - a.value); // Sort by value descending
  };

  const weeklyData = getWeeklyData();
  const monthlyData = getMonthlyData();
  
  // Calculate totals
  const weeklyTotal = weeklyData.reduce((sum, item) => sum + item.value, 0);
  const monthlyTotal = monthlyData.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Expense Breakdown</CardTitle>
        <CardDescription>See where your money is going</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="weekly" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
          
          <TabsContent value="weekly" className="space-y-4">
            <div className="flex items-center justify-center font-medium text-lg">
              Total: <IndianRupee className="h-4 w-4 mx-1" />
              {weeklyTotal.toLocaleString("en-IN")}
            </div>
            
            {weeklyData.length > 0 ? (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={weeklyData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {weeklyData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: number) => [`₹${value.toLocaleString("en-IN")}`, "Amount"]} 
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                No expense data for the last week
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="monthly" className="space-y-4">
            <div className="flex items-center justify-center font-medium text-lg">
              Total: <IndianRupee className="h-4 w-4 mx-1" />
              {monthlyTotal.toLocaleString("en-IN")}
            </div>
            
            {monthlyData.length > 0 ? (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={monthlyData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {monthlyData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: number) => [`₹${value.toLocaleString("en-IN")}`, "Amount"]} 
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                No expense data for the last month
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ExpenseSummary;
