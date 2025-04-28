
import ExpenseForm from "../expenses/ExpenseForm";
import GoalForm from "../goals/GoalForm";

const FormSection = ({ onAddExpense, onAddGoal }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ExpenseForm onAddExpense={onAddExpense} />
      <GoalForm onAddGoal={onAddGoal} />
    </div>
  );
};

export default FormSection;
