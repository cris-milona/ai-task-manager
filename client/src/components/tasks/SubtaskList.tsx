import { AutoAwesome } from "@mui/icons-material";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Typography,
  Box,
  useTheme,
} from "@mui/material";

import type { Subtask } from "../../types/types";

interface SubtaskListProps {
  subtasks: Subtask[];
}

export const SubtaskList = ({ subtasks }: SubtaskListProps) => {
  const theme = useTheme();

  return (
    <Box sx={{ pl: 2, pr: 2, pb: 1 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
        <AutoAwesome
          sx={{ fontSize: 16, color: theme.palette.text.secondary }}
        />
        <Typography
          variant="overline"
          sx={{ color: theme.palette.text.secondary, fontWeight: 600 }}
        >
          Subtasks
        </Typography>
      </Box>
      <List dense disablePadding>
        {subtasks.map((subtask) => (
          <ListItem
            key={subtask.id}
            disablePadding
            sx={{
              py: 0.5,
              borderRadius: 1,
              "&:hover": {
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              <Checkbox
                edge="start"
                checked={subtask.completed || false}
                size="small"
                sx={{
                  color: theme.palette.primary.main,
                  "&.Mui-checked": {
                    color: theme.palette.primary.main,
                  },
                }}
              />
            </ListItemIcon>
            <ListItemText
              primary={subtask.title}
              slotProps={{
                primary: {
                  sx: {
                    variant: "body2",
                    textDecoration: subtask.completed ? "line-through" : "none",
                    color: subtask.completed
                      ? theme.palette.text.disabled
                      : theme.palette.text.primary,
                  },
                },
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
