
import ExpenseForm from "../expenses/ExpenseForm";
import GoalForm from "../goals/GoalForm";
import { Transaction } from "./TransactionsList";

interface FormSectionProps {
  onAddExpense: (expense: {
    amount: number;
    category: string;
    description: string;
    date: Date;
  }) => void;
  onAddGoal: (goal: {
    name: string;
    targetAmount: number;
    deadline: Date;
  }) => void;
}

const FormSection = ({ onAddExpense, onAddGoal }: FormSectionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      <ExpenseForm onAddExpense={onAddExpense} />
      <GoalForm onAddGoal={onAddGoal} />
    </div>
  );
};

export default FormSection;
