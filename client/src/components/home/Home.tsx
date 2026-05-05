import { useState } from "react";

import { Box, Typography, useTheme } from "@mui/material";
import {
  Assignment,
  PriorityHigh,
  CheckCircle,
  AutoAwesome,
} from "@mui/icons-material";

import { TaskInput } from "./TaskInput";
import { StatsCard } from "./StatsCard";

export const Home = () => {
  const theme = useTheme();
  const [result, setResult] = useState<unknown>(null);

  const stats = {
    total: 5,
    highPriority: 2,
    completed: 3,
    aiGenerated: 4,
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
          Good morning
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: theme.palette.text.secondary }}
        >
          What do you want to get done today?
        </Typography>
      </Box>

      <TaskInput setResult={setResult} />

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
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </Box>
  );
};
