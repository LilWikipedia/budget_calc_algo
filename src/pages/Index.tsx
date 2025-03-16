
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { calculateRemainingBudget } from "@/utils/budgetAlgorithm";
import { Expense } from "@/utils/budgetAlgorithm";
import BudgetForm from "@/components/BudgetForm";
import BudgetSummary from "@/components/BudgetSummary";
import AlgorithmExplanation from "@/components/AlgorithmExplanation";
import { ChevronDown } from "lucide-react";

const Index = () => {
  const [income, setIncome] = useState<number>(0);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [remainingBudget, setRemainingBudget] = useState<number>(0);
  const [showAlgorithm, setShowAlgorithm] = useState<boolean>(false);

  // Update the budget calculation when income or expenses change
  useEffect(() => {
    setRemainingBudget(calculateRemainingBudget(income, expenses));
  }, [income, expenses]);

  return (
    <motion.div 
      className="min-h-screen w-full bg-background py-12 px-4 sm:px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="text-center space-y-4 mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-sm uppercase tracking-widest text-muted-foreground">Finance Flow</h4>
            <h1 className="text-4xl md:text-5xl font-bold mt-2">Monthly Budget Calculator</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
              A sophisticated algorithm that calculates your monthly budget using sequencing, 
              conditional selection, and iterative loops.
            </p>
          </motion.div>
        </header>

        <BudgetForm
          income={income}
          setIncome={setIncome}
          expenses={expenses}
          setExpenses={setExpenses}
        />

        {(income > 0 || expenses.length > 0) && (
          <BudgetSummary
            income={income}
            expenses={expenses}
            remainingBudget={remainingBudget}
          />
        )}

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <button
            onClick={() => setShowAlgorithm(!showAlgorithm)}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <span>{showAlgorithm ? "Hide Algorithm Details" : "View Algorithm Details"}</span>
            <motion.div
              animate={{ rotate: showAlgorithm ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="h-4 w-4" />
            </motion.div>
          </button>

          {showAlgorithm && <AlgorithmExplanation />}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Index;
