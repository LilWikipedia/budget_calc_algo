
/**
 * Budget Algorithm Module
 * 
 * This module contains the core budget calculation algorithm and related utility functions.
 * It implements sequencing, conditional selection, and iterative loops to provide 
 * accurate monthly budget calculations.
 */

// Types for our budget algorithm
export interface Expense {
  id: string;
  name: string;
  amount: number;
  category: 'fixed' | 'variable';
}

export interface BudgetData {
  income: number;
  expenses: Expense[];
  savings: number;
}

/**
 * Calculates the total expenses from a list of expenses
 * Uses an iterative loop to sum up all expenses
 * 
 * @param expenses Array of expense objects
 * @returns Total expense amount
 */
export function calculateTotalExpenses(expenses: Expense[]): number {
  // Iterative loop - summing all expenses
  let total = 0;
  for (let i = 0; i < expenses.length; i++) {
    total += expenses[i].amount;
  }
  return total;
}

/**
 * Calculates total fixed expenses
 * Uses filter and reduce as a higher-order iterative pattern
 * 
 * @param expenses Array of expense objects
 * @returns Total fixed expenses
 */
export function calculateFixedExpenses(expenses: Expense[]): number {
  // Filter for fixed expenses and sum them
  return expenses
    .filter(expense => expense.category === 'fixed')
    .reduce((total, expense) => total + expense.amount, 0);
}

/**
 * Calculates total variable expenses
 * Uses filter and reduce as a higher-order iterative pattern
 * 
 * @param expenses Array of expense objects
 * @returns Total variable expenses
 */
export function calculateVariableExpenses(expenses: Expense[]): number {
  // Filter for variable expenses and sum them
  return expenses
    .filter(expense => expense.category === 'variable')
    .reduce((total, expense) => total + expense.amount, 0);
}

/**
 * Calculates the remaining budget after expenses
 * Implements the core budget calculation formula
 * 
 * @param income Total income
 * @param expenses Array of expense objects
 * @returns Remaining budget
 */
export function calculateRemainingBudget(income: number, expenses: Expense[]): number {
  const totalExpenses = calculateTotalExpenses(expenses);
  return income - totalExpenses;
}

/**
 * Analyzes budget status based on remaining amount
 * Uses conditional selection to determine budget status
 * 
 * @param remainingBudget The amount remaining after expenses
 * @returns Status object with message and status code
 */
export function analyzeBudgetStatus(remainingBudget: number): { 
  message: string; 
  status: 'positive' | 'warning' | 'negative';
} {
  // Conditional selection to determine budget status
  if (remainingBudget > 0) {
    return {
      message: `You have $${remainingBudget.toFixed(2)} remaining for savings or additional expenses.`,
      status: 'positive'
    };
  } else if (remainingBudget === 0) {
    return {
      message: 'Your budget is exactly balanced. Consider allocating more to savings.',
      status: 'warning'
    };
  } else {
    return {
      message: `You're over budget by $${Math.abs(remainingBudget).toFixed(2)}. Consider reducing expenses.`,
      status: 'negative'
    };
  }
}

/**
 * Calculates recommended savings based on income
 * Uses conditional logic to determine appropriate savings rate
 * 
 * @param income Total income
 * @returns Recommended savings amount
 */
export function calculateRecommendedSavings(income: number): number {
  // Conditional selection for recommended savings rate
  let savingsRate = 0.2; // Default 20%
  
  if (income < 2000) {
    savingsRate = 0.1; // 10% for lower income
  } else if (income > 5000) {
    savingsRate = 0.25; // 25% for higher income
  }
  
  return income * savingsRate;
}

/**
 * Distributes budget across expense categories
 * Implements an algorithm to suggest budget allocation
 * 
 * @param income Total income
 * @returns Object with suggested allocations
 */
export function suggestBudgetAllocation(income: number): Record<string, number> {
  // Suggested percentages for different categories
  const allocations = {
    'Housing': 0.3, // 30%
    'Utilities': 0.1, // 10%
    'Food': 0.15, // 15%
    'Transportation': 0.1, // 10%
    'Savings': 0.2, // 20%
    'Entertainment': 0.05, // 5%
    'Other': 0.1 // 10%
  };
  
  // Calculate actual amounts based on percentages
  const result: Record<string, number> = {};
  Object.entries(allocations).forEach(([category, percentage]) => {
    result[category] = income * percentage;
  });
  
  return result;
}

/**
 * Validates if the budget is feasible
 * Checks if income can cover essential expenses
 * 
 * @param income Total income
 * @param expenses Array of expense objects
 * @returns Validation result with status and message
 */
export function validateBudgetFeasibility(income: number, expenses: Expense[]): {
  isValid: boolean;
  message: string;
} {
  const essentialExpenses = expenses
    .filter(expense => expense.category === 'fixed')
    .reduce((total, expense) => total + expense.amount, 0);
  
  // Conditional check for budget feasibility
  if (essentialExpenses > income) {
    return {
      isValid: false,
      message: `Your essential expenses ($${essentialExpenses.toFixed(2)}) exceed your income ($${income.toFixed(2)}).`
    };
  }
  
  return {
    isValid: true,
    message: 'Your budget appears feasible.'
  };
}
