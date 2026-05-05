import type { Task } from "../types/types";

export const sampleTasks: Task[] = [
  {
    id: "1",
    title: "Finish project proposal",
    priority: "High",
    subtasks: [
      { id: "1-1", title: "Outline key objectives", completed: true },
      { id: "1-2", title: "Draft initial proposal" },
      { id: "1-3", title: "Review with team" },
    ],
  },
  {
    id: "2",
    title: "Plan weekend trip",
    priority: "Medium",
    subtasks: [
      { id: "2-1", title: "Choose destination", completed: true },
      { id: "2-2", title: "Book accommodations" },
      { id: "2-3", title: "Create itinerary" },
    ],
  },
  {
    id: "3",
    title: "Organize home office",
    priority: "Low",
    subtasks: [
      { id: "3-1", title: "Declutter desk" },
      { id: "3-2", title: "Sort paperwork" },
      { id: "3-3", title: "Set up filing system" },
    ],
  },
];
