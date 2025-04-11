
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Transaction } from "./TransactionsList";
import { IndianRupee } from "lucide-react";

interface SpendingTrendsProps {
  transactions: Transaction[];
}

type TimeRange = "7days" | "30days" | "90days";

interface ChartDataPoint {
  date: string;
  amount: number;
}

const SpendingTrends = ({ transactions }: SpendingTrendsProps) => {
  const [timeRange, setTimeRange] = useState<TimeRange>("30days");

  const generateChartData = (): ChartDataPoint[] => {
    // Filter transactions based on selected time range
    const cutoffDate = new Date();
    if (timeRange === "7days") {
      cutoffDate.setDate(cutoffDate.getDate() - 7);
    } else if (timeRange === "30days") {
      cutoffDate.setDate(cutoffDate.getDate() - 30);
    } else {
      cutoffDate.setDate(cutoffDate.getDate() - 90);
    }

    // Only include debit transactions (expenses)
    const filteredTransactions = transactions.filter(
      tx => tx.type === "debit" && tx.date >= cutoffDate
    );

    // Group transactions by date
    const groupedByDate: Record<string, number> = {};
    
    filteredTransactions.forEach(tx => {
      const dateStr = tx.date.toISOString().split('T')[0];
      if (groupedByDate[dateStr]) {
        groupedByDate[dateStr] += tx.amount;
      } else {
        groupedByDate[dateStr] = tx.amount;
      }
    });

    // Generate all dates in the range
    const allDates: string[] = [];
    const currentDate = new Date(cutoffDate);
    const endDate = new Date();
    
    while (currentDate <= endDate) {
      allDates.push(currentDate.toISOString().split('T')[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    // Create chart data with all dates
    const chartData = allDates.map(date => ({
      date,
      amount: groupedByDate[date] || 0,
    }));
    
    // Format the dates for display
    return chartData.map(point => ({
      ...point,
      date: formatDate(point.date, timeRange),
    }));
  };

  // Format date based on time range
  const formatDate = (dateStr: string, range: TimeRange): string => {
    const date = new Date(dateStr);
    if (range === "7days") {
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    } else if (range === "30days") {
      return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const chartData = generateChartData();
  
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle>Spending Trends</CardTitle>
          <CardDescription>Track how your spending changes over time</CardDescription>
        </div>
        <Select 
          value={timeRange} 
          onValueChange={(value) => setTimeRange(value as TimeRange)}
        >
          <SelectTrigger className="w-[120px] h-8">
            <SelectValue placeholder="Time Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">7 Days</SelectItem>
            <SelectItem value="30days">30 Days</SelectItem>
            <SelectItem value="90days">90 Days</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{
                top: 10,
                right: 10,
                left: 10,
                bottom: 20,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="date" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                padding={{ left: 10, right: 10 }}
                tickMargin={10}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `₹${value}`}
              />
              <Tooltip 
                formatter={(value: number) => [`₹${value.toLocaleString("en-IN")}`, "Amount"]}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#38B2AC"
                strokeWidth={2}
                dot={{ r: 4, fill: "#38B2AC", strokeWidth: 0 }}
                activeDot={{ r: 6, fill: "#38B2AC", stroke: "#fff", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpendingTrends;
