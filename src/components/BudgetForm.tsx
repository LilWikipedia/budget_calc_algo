
import React from "react";
import { motion } from "framer-motion";
import { DollarSign } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Expense } from "@/utils/budgetAlgorithm";
import ExpenseInput from "./ExpenseInput";

interface BudgetFormProps {
  income: number;
  setIncome: React.Dispatch<React.SetStateAction<number>>;
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
}

const BudgetForm: React.FC<BudgetFormProps> = ({
  income,
  setIncome,
  expenses,
  setExpenses,
}) => {
  return (
    <TooltipProvider>
      <motion.div
        className="bg-card rounded-2xl p-6 shadow-sm border"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-1">Monthly Income</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Enter your total monthly income after taxes
            </p>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="relative w-full max-w-xs">
                  <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={income || ""}
                    onChange={(e) => setIncome(parseFloat(e.target.value) || 0)}
                    placeholder="0.00"
                    className="pl-10 h-10"
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p className="max-w-xs">
                  This is your total monthly income after taxes. The algorithm will
                  use this as the base for your budget calculations.
                </p>
              </TooltipContent>
            </Tooltip>
          </div>

          <Separator />

          <div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold mb-1">Monthly Expenses</h2>
                <p className="text-sm text-muted-foreground">
                  Add your fixed and variable expenses
                </p>
              </div>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="sm">
                    What's the difference?
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left" className="max-w-sm p-4">
                  <p className="font-medium mb-2">Fixed vs. Variable Expenses</p>
                  <p className="text-sm mb-2">
                    <strong>Fixed expenses</strong> remain constant month to month,
                    like rent, loan payments, insurance, etc.
                  </p>
                  <p className="text-sm">
                    <strong>Variable expenses</strong> change monthly, like
                    groceries, entertainment, dining out, etc.
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>

            <ExpenseInput expenses={expenses} setExpenses={setExpenses} />
          </div>
        </div>
      </motion.div>
    </TooltipProvider>
  );
};

export default BudgetForm;
