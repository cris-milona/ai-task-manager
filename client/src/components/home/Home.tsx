import { Box, Typography, useTheme } from "@mui/material";
import {
  Assignment,
  PriorityHigh,
  CheckCircle,
  AutoAwesome,
} from "@mui/icons-material";

import type { Task, Subtask } from "@shared/types";

import { TaskInput } from "./TaskInput";
import { StatsCard } from "./StatsCard";

interface HomeProps {
  tasks: Task[];
  onTaskGenerated: (task: Task) => void;
}

export const Home = ({ tasks, onTaskGenerated }: HomeProps) => {
  const theme = useTheme();

  const stats = {
    total: tasks.length,
    highPriority: tasks.filter((t) => t.priority === "High").length,
    completed: tasks.filter((t) =>
      t.subtasks?.every((s: Subtask) => s.completed),
    ).length,
    aiGenerated: tasks.length,
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
          {getGreeting()}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: theme.palette.text.secondary }}
        >
          What do you want to get done today?
        </Typography>
      </Box>

      <TaskInput onTaskGenerated={onTaskGenerated} />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 2,
          mt: 3,
        }}
      >
        <StatsCard
          label="Total tasks"
          value={stats.total}
          color={theme.palette.stats.total.background}
          icon={
            <Assignment
              sx={{ color: theme.palette.stats.total.main, fontSize: 22 }}
            />
          }
        />
        <StatsCard
          label="High priority"
          value={stats.highPriority}
          color={theme.palette.stats.highPriority.background}
          icon={
            <PriorityHigh
              sx={{
                color: theme.palette.stats.highPriority.main,
                fontSize: 22,
              }}
            />
          }
        />
        <StatsCard
          label="Completed"
          value={stats.completed}
          color={theme.palette.stats.completed.background}
          icon={
            <CheckCircle
              sx={{ color: theme.palette.stats.completed.main, fontSize: 22 }}
            />
          }
        />
        <StatsCard
          label="AI generated"
          value={stats.aiGenerated}
          color={theme.palette.stats.aiGenerated.background}
          icon={
            <AutoAwesome
              sx={{
                color: theme.palette.stats.aiGenerated.main,
                fontSize: 22,
              }}
            />
          }
        />
      </Box>
      {tasks.length === 0 && (
        <Box sx={{ textAlign: "center", mt: 6, color: "text.secondary" }}>
          <AutoAwesome sx={{ fontSize: 40, mb: 1 }} />
          <Typography>Type a goal above and let AI build your plan</Typography>
        </Box>
      )}
    </Box>
  );
};
