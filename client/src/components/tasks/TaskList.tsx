import { Grid } from "@mui/material";

import { TaskCard } from "./TaskCard";

import type { Task } from "../../types/types";

interface TaskListProps {
  tasks: Task[];
}

export const TaskList = ({ tasks }: TaskListProps) => {
  return (
    <Grid container spacing={3} sx={{ alignItems: "flex-start" }}>
      {tasks.map((task) => (
        <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={task.id}>
          <TaskCard task={task} />
        </Grid>
      ))}
    </Grid>
  );
};
