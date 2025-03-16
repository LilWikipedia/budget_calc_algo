
import React from "react";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts";
import { DollarSign, TrendingUp, TrendingDown, AlertCircle } from "lucide-react";
import { Expense, analyzeBudgetStatus } from "@/utils/budgetAlgorithm";

interface BudgetSummaryProps {
  income: number;
  expenses: Expense[];
  remainingBudget: number;
}

const BudgetSummary: React.FC<BudgetSummaryProps> = ({
  income,
  expenses,
  remainingBudget,
}) => {
  // Skip rendering if no data
  if (income === 0 && expenses.length === 0) {
    return null;
  }

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const fixedExpenses = expenses
    .filter(expense => expense.category === "fixed")
    .reduce((sum, expense) => sum + expense.amount, 0);
  const variableExpenses = expenses
    .filter(expense => expense.category === "variable")
    .reduce((sum, expense) => sum + expense.amount, 0);

  const expensePercentage = income > 0 ? (totalExpenses / income) * 100 : 0;
  const budgetStatus = analyzeBudgetStatus(remainingBudget);

  // Prepare data for pie chart
  const chartData = [
    { name: "Fixed Expenses", value: fixedExpenses },
    { name: "Variable Expenses", value: variableExpenses },
    { name: "Remaining", value: Math.max(0, remainingBudget) },
  ].filter(item => item.value > 0);

  const COLORS = ["#FF6B6B", "#4ECDC4", "#45B7D1"];

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-card rounded-2xl p-6 shadow-sm border space-y-4">
        <h2 className="text-xl font-semibold">Budget Overview</h2>
        <Separator />

        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-baseline">
              <span className="text-sm font-medium">Monthly Income</span>
              <span className="font-mono font-semibold text-lg">${income.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-sm font-medium">Total Expenses</span>
              <span className="font-mono font-semibold text-lg">${totalExpenses.toFixed(2)}</span>
            </div>
            <Separator className="my-1" />
            <div className="flex justify-between items-baseline">
              <span className="text-sm font-medium">Remaining</span>
              <span 
                className={`font-mono font-semibold text-lg ${
                  remainingBudget > 0 
                    ? "text-emerald-600" 
                    : remainingBudget < 0 
                    ? "text-red-600" 
                    : ""
                }`}
              >
                ${remainingBudget.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Budget Used</span>
              <span className="text-sm font-medium">{Math.min(100, expensePercentage.toFixed(0))}%</span>
            </div>
            <Progress value={Math.min(100, expensePercentage)} className="h-2" />
          </div>

          <div className="bg-secondary rounded-xl p-4 flex items-start gap-3">
            {budgetStatus.status === "positive" ? (
              <TrendingUp className="h-5 w-5 text-emerald-600 mt-0.5" />
            ) : budgetStatus.status === "negative" ? (
              <TrendingDown className="h-5 w-5 text-red-600 mt-0.5" />
            ) : (
              <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
            )}
            <p className="text-sm">{budgetStatus.message}</p>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-2xl p-6 shadow-sm border space-y-4">
        <h2 className="text-xl font-semibold">Expense Breakdown</h2>
        <Separator />

        {expenses.length > 0 ? (
          <div className="space-y-4">
            <div className="h-[200px] mx-auto">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    formatter={(value: number) => [`$${value.toFixed(2)}`, ""]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-secondary rounded-xl p-4 space-y-1">
                <div className="text-sm text-muted-foreground">Fixed Expenses</div>
                <div className="font-mono font-medium">${fixedExpenses.toFixed(2)}</div>
                <div className="text-xs text-muted-foreground">
                  {income > 0 ? ((fixedExpenses / income) * 100).toFixed(1) : 0}% of income
                </div>
              </div>
              <div className="bg-secondary rounded-xl p-4 space-y-1">
                <div className="text-sm text-muted-foreground">Variable Expenses</div>
                <div className="font-mono font-medium">${variableExpenses.toFixed(2)}</div>
                <div className="text-xs text-muted-foreground">
                  {income > 0 ? ((variableExpenses / income) * 100).toFixed(1) : 0}% of income
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <DollarSign className="h-10 w-10 text-muted-foreground opacity-20 mb-2" />
            <p className="text-muted-foreground">Add expenses to see your breakdown</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default BudgetSummary;
