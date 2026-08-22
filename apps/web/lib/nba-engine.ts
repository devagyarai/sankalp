export interface Task {
  id: string;
  title: string;
  type: string;
  domain: string;
  dueDate: string;
  estimatedHours: number;
  completedHours: number;
  urgencyLevel: "high" | "medium" | "low";
  impactLevel: "high" | "medium" | "low";
  riskScore: number;
}

export interface NextBestAction {
  task: Task;
  actionReasoning: string;
  recommendedDuration: number; // in minutes
}

export function determineNextBestAction(tasks: Task[]): NextBestAction | null {
  if (!tasks || tasks.length === 0) return null;

  // Simple deterministic algorithm: sort by riskScore descending
  // Risk score in our mock data is a pre-computed value incorporating urgency, impact, and deadline proximity.
  const sortedTasks = [...tasks].sort((a, b) => b.riskScore - a.riskScore);
  const highestRiskTask = sortedTasks[0];

  // Generate an explainable reasoning string based on the task data
  const hoursLeft = highestRiskTask.estimatedHours - highestRiskTask.completedHours;
  const timeContext = hoursLeft > 0 ? `requires about ${hoursLeft} more hours` : "is almost complete";
  
  let actionReasoning = `You should focus on "${highestRiskTask.title}" because `;
  
  if (highestRiskTask.urgencyLevel === "high") {
    actionReasoning += `it is highly urgent and ${timeContext}. `;
    actionReasoning += `This provides the highest immediate reduction in academic risk.`;
  } else {
    actionReasoning += `it has the highest current priority.`;
  }

  // Recommend a sensible Pomodoro chunk (e.g. 45 mins)
  const recommendedDuration = 45;

  return {
    task: highestRiskTask,
    actionReasoning,
    recommendedDuration
  };
}
