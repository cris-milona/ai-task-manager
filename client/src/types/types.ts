export interface Task {
  id: string;
  title: string;
  priority: "High" | "Medium" | "Low";
  subtasks?: Subtask[];
}

export interface Subtask {
  id: string;
  title: string;
  completed?: boolean;
}
