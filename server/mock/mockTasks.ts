import type { Task } from "../../shared/types";

export const getMockTask = (input: string): Task => ({
  id: Date.now().toString(),
  title: `[MOCK] ${input.slice(0, 40)}`,
  priority: "Medium",
  subtasks: [
    { id: "1", title: "Mock subtask one", completed: true },
    { id: "2", title: "Mock subtask two", completed: false },
    { id: "3", title: "Mock subtask three", completed: false },
  ],
});
