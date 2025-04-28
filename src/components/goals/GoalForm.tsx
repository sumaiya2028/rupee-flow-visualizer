
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Target } from "lucide-react";

interface GoalFormProps {
  onAddGoal: (goal: {
    name: string;
    targetAmount: number;
    deadline: Date;
  }) => void;
}

const GoalForm = ({ onAddGoal }: GoalFormProps) => {
  const [name, setName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !targetAmount || !deadline) return;

    onAddGoal({
      name,
      targetAmount: parseFloat(targetAmount),
      deadline: new Date(deadline)
    });

    // Reset form
    setName("");
    setTargetAmount("");
    setDeadline("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Target className="h-5 w-5" />
          Set Financial Goal
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="goalName">Goal Name</Label>
            <Input
              id="goalName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Emergency Fund"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="targetAmount">Target Amount (₹)</Label>
            <Input
              id="targetAmount"
              type="number"
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
              placeholder="Enter target amount"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="deadline">Target Date</Label>
            <Input
              id="deadline"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Set Goal
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default GoalForm;
