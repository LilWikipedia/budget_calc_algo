
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Info, Code, GitBranch, Repeat } from "lucide-react";

const AlgorithmExplanation = () => {
  return (
    <TooltipProvider delayDuration={300}>
      <motion.div 
        className="bg-card rounded-2xl p-6 shadow-sm border"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Code className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Algorithm Implementation</h2>
          </div>
          
          <Separator className="my-2" />
          
          <div className="space-y-4">
            <AlgorithmStep
              title="Sequencing"
              icon={<GitBranch className="h-4 w-4" />}
              description="The budget calculation follows a sequential process - collecting inputs, processing data, and generating outputs."
              detail="The algorithm first collects income and expense data, then calculates totals, analyzes the budget status, and finally provides recommendations - executing each step in a predetermined order."
            />
            
            <AlgorithmStep
              title="Conditional Selection"
              icon={<GitBranch className="h-4 w-4" />}
              description="Different budget scenarios are handled through conditional logic."
              detail="The algorithm uses conditionals to determine budget status (positive/negative/balanced), adjust recommended savings based on income levels, and validate budget feasibility."
            />
            
            <AlgorithmStep
              title="Iterative Loops"
              icon={<Repeat className="h-4 w-4" />}
              description="Expense calculations use loops to process multiple expenses efficiently."
              detail="The algorithm iterates through expense arrays to calculate totals for different categories, allowing for dynamic handling of any number of expenses."
            />
            
            <div className="rounded-lg bg-secondary p-4 text-sm">
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <div>
                  <p className="font-medium mb-1">Debugging & Error Prevention</p>
                  <p className="text-muted-foreground">
                    The algorithm includes validation checks to prevent logical errors such as:
                  </p>
                  <ul className="list-disc list-inside mt-2 text-muted-foreground space-y-1">
                    <li>Verifying budget feasibility</li>
                    <li>Ensuring numeric inputs for calculations</li>
                    <li>Validating expense categories</li>
                    <li>Preventing negative expense values</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </TooltipProvider>
  );
};

interface AlgorithmStepProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  detail: string;
}

const AlgorithmStep = ({ title, icon, description, detail }: AlgorithmStepProps) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <div className="rounded-lg p-3 bg-secondary hover:bg-secondary/80 transition-colors cursor-help">
        <div className="flex items-center gap-2 mb-1">
          {icon}
          <h3 className="font-medium">{title}</h3>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </TooltipTrigger>
    <TooltipContent className="max-w-sm p-4">
      <p>{detail}</p>
    </TooltipContent>
  </Tooltip>
);

export default AlgorithmExplanation;
