
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, DollarSign } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Expense } from "@/utils/budgetAlgorithm";

interface ExpenseInputProps {
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
}

const ExpenseInput: React.FC<ExpenseInputProps> = ({ expenses, setExpenses }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<"fixed" | "variable">("variable");

  const handleAddExpense = () => {
    if (name.trim() === "" || isNaN(Number(amount)) || Number(amount) <= 0) {
      return;
    }

    const newExpense: Expense = {
      id: Date.now().toString(),
      name: name.trim(),
      amount: parseFloat(amount),
      category,
    };

    setExpenses([...expenses, newExpense]);
    setName("");
    setAmount("");
  };

  const handleRemoveExpense = (id: string) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label htmlFor="expense-name">Expense Description</Label>
          <Input
            id="expense-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Rent, Groceries"
            className="h-10"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="expense-amount">Amount</Label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
            <Input
              id="expense-amount"
              type="number"
              min="0"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="pl-10 h-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="expense-category">Category</Label>
          <Select
            value={category}
            onValueChange={(value) => setCategory(value as "fixed" | "variable")}
          >
            <SelectTrigger id="expense-category" className="h-10">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fixed">Fixed Expense</SelectItem>
              <SelectItem value="variable">Variable Expense</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-end">
          <Button 
            onClick={handleAddExpense} 
            className="w-full h-10"
            disabled={!name || !amount || isNaN(Number(amount)) || Number(amount) <= 0}
          >
            <Plus className="mr-1 h-4 w-4" /> Add Expense
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {expenses.length > 0 && (
          <motion.div
            className="bg-card rounded-xl border shadow-sm overflow-hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="p-4 bg-secondary/50">
              <h3 className="font-medium">Expense List</h3>
            </div>
            <motion.ul
              variants={container}
              initial="hidden"
              animate="show"
              className="divide-y"
            >
              {expenses.map((expense) => (
                <motion.li
                  key={expense.id}
                  variants={item}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-4 flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">{expense.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {expense.category === "fixed" ? "Fixed" : "Variable"} Expense
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-medium">
                      ${expense.amount.toFixed(2)}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => handleRemoveExpense(expense.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExpenseInput;
