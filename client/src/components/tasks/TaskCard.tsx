import { useState } from "react";

import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  IconButton,
  useTheme,
  CardActionArea,
  Drawer,
  Divider,
} from "@mui/material";
import { Close } from "@mui/icons-material";

import { SubtaskList } from "./SubtaskList";

import type { Task } from "../../types/types";

interface TaskCardProps {
  task: Task;
}

const priorityColors: Record<string, "error" | "warning" | "success"> = {
  High: "error",
  Medium: "warning",
  Low: "success",
};

export const TaskCard = ({ task }: TaskCardProps) => {
  const theme = useTheme();

  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Card
        elevation={0}
        sx={{
          borderRadius: 3,
          transition: "all 0.2s ease-in-out",
          border: "1px solid",
          borderColor: theme.palette.divider,
          "&:hover": {
            elevation: 4,
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
            borderColor: theme.palette.primary.light,
          },
        }}
      >
        <CardActionArea
          onClick={() => setDrawerOpen(true)}
          sx={{ borderRadius: 3 }}
        >
          <CardContent>
            <Typography
              variant="subtitle1"
              noWrap
              sx={{
                fontWeight: 600,
                lineHeight: 1.4,
                mb: 1.5,
              }}
            >
              {task.title}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Chip
                label={task.priority}
                color={priorityColors[task.priority]}
                size="small"
                sx={{
                  fontWeight: 600,
                  fontSize: "0.7rem",
                  height: 24,
                  borderRadius: 1.5,
                }}
              />

              {task.subtasks && task.subtasks.length > 0 && (
                <Typography
                  variant="caption"
                  sx={{ color: theme.palette.text.secondary }}
                >
                  {task.subtasks.length} subtasks
                </Typography>
              )}
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
      <Drawer
        anchor="bottom"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        slotProps={{
          paper: {
            sx: {
              p: 3,
              m: 5,
              borderRadius: 2,
            },
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Box sx={{ flex: 1, pr: 2 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, lineHeight: 1.3, mb: 1 }}
            >
              {task.title}
            </Typography>
            <Chip
              label={task.priority}
              color={priorityColors[task.priority]}
              size="small"
              sx={{
                fontWeight: 600,
                fontSize: "0.7rem",
                height: 24,
                borderRadius: 1.5,
              }}
            />
          </Box>
          <IconButton onClick={() => setDrawerOpen(false)} size="small">
            <Close fontSize="small" />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {task.subtasks && <SubtaskList subtasks={task.subtasks} />}
      </Drawer>
    </>
  );
};
