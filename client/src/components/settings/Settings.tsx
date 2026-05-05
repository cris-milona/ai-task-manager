import { useState } from "react";

import {
  Box,
  Typography,
  Paper,
  Switch,
  Divider,
  Select,
  MenuItem,
  FormControl,
  Button,
  useTheme,
} from "@mui/material";

interface SettingRowProps {
  label: string;
  description: string;
  children: React.ReactNode;
}

const SettingRow = ({ label, description, children }: SettingRowProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "flex-start", sm: "center" },
        justifyContent: "space-between",
        py: 2,
        gap: 4,
      }}
    >
      <Box>
        <Typography sx={{ fontWeight: 500 }}>{label}</Typography>
        <Typography
          variant="caption"
          sx={{ color: theme.palette.text.secondary }}
        >
          {description}
        </Typography>
      </Box>
      {children}
    </Box>
  );
};

export const Settings = () => {
  const theme = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("en");

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
          Settings
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: theme.palette.text.secondary }}
        >
          Manage your preferences
        </Typography>
      </Box>

      <Paper
        elevation={0}
        sx={{
          border: "1px solid",
          borderColor: theme.palette.divider,
          borderRadius: 3,
        }}
      >
        <Box sx={{ px: 3, py: 2 }}>
          <Typography
            variant="overline"
            sx={{ color: theme.palette.text.secondary, fontWeight: 600 }}
          >
            Language
          </Typography>
          <SettingRow
            label="Choose language"
            description="Language used for AI-generated content"
          >
            <FormControl size="small">
              <Select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                sx={{ borderRadius: 2, minWidth: 120 }}
              >
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="es">Spanish</MenuItem>
                <MenuItem value="fr">French</MenuItem>
              </Select>
            </FormControl>
          </SettingRow>
        </Box>

        <Divider />

        <Box sx={{ px: 3, py: 2 }}>
          <Typography
            variant="overline"
            sx={{ color: theme.palette.text.secondary, fontWeight: 600 }}
          >
            Notifications
          </Typography>
          <SettingRow
            label="Enable notifications"
            description="Get reminders for high priority tasks"
          >
            <Switch
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
            />
          </SettingRow>
        </Box>

        <Divider />

        <Box sx={{ px: 3, py: 2 }}>
          <Typography
            variant="overline"
            sx={{ color: theme.palette.text.secondary, fontWeight: 600 }}
          >
            Danger zone
          </Typography>
          <SettingRow
            label="Clear all tasks"
            description="Permanently delete all your tasks"
          >
            <Button
              variant="outlined"
              color="error"
              size="small"
              sx={{ borderRadius: 2 }}
            >
              Clear all
            </Button>
          </SettingRow>
        </Box>
      </Paper>
    </Box>
  );
};
