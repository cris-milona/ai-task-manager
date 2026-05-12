import { Typography, Box, useTheme } from "@mui/material";

import { TaskList } from "./TaskList";

import type { Task } from "@shared/types";
interface TasksProps {
  tasks: Task[];
}

export const Tasks = ({ tasks }: TasksProps) => {
  const theme = useTheme();

  return (
    <Box sx={{ mt: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: theme.palette.text.primary,
            mb: 0.5,
          }}
        >
          Your Tasks
        </Typography>
        <Typography
          variant="body2"
          noWrap
          sx={{ color: theme.palette.text.secondary }}
        >
          {tasks.length} {tasks.length === 1 ? "task" : "tasks"} to complete
        </Typography>
      </Box>
      <TaskList tasks={tasks} />
    </Box>
  );
};
