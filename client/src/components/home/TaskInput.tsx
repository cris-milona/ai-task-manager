import { useState } from "react";

import {
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  InputAdornment,
  useTheme,
  Alert,
} from "@mui/material";
import { AutoAwesome as AutoAwesomeIcon } from "@mui/icons-material";

import type { Task } from "@shared/types";

interface TaskInputProps {
  placeholder?: string;
  onTaskGenerated: (task: Task) => void;
}

export const TaskInput = ({
  placeholder = "Describe a task or goal...",
  onTaskGenerated,
}: TaskInputProps) => {
  const theme = useTheme();

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!input.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3001/parse-task", {
        method: "POST", // ✅ POST, not GET
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input }), // ✅ sends the user's text
      });

      if (!response.ok) throw new Error("Server error");

      const task: Task = await response.json();
      onTaskGenerated(task); // ✅ sends task up to App
      setInput(""); // clear input after success
    } catch (err) {
      console.error("Error generating task:", err);
      setError("Something went wrong. Is the server running?");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        "&:hover": {
          borderColor: theme.palette.primary.light,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
        },
      }}
    >
      <TextField
        fullWidth
        multiline
        minRows={3}
        maxRows={4}
        placeholder={placeholder}
        variant="standard"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        slotProps={{
          input: {
            disableUnderline: true,
            startAdornment: (
              <InputAdornment
                position="start"
                sx={{ alignSelf: "flex-start", mt: 0.5 }}
              >
                <AutoAwesomeIcon
                  sx={{ color: theme.palette.primary.main, fontSize: 20 }}
                />
              </InputAdornment>
            ),
            sx: {
              fontSize: "1rem",
              lineHeight: 1.6,
            },
          },
        }}
        sx={{ mb: 2 }}
      />
      {error && (
        <Alert severity="error" sx={{ mt: 1 }}>
          {error}
        </Alert>
      )}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: theme.palette.text.secondary,
            fontSize: "0.75rem",
          }}
        >
          AI will generate subtasks and estimate priorities automatically
        </Typography>
        <Button
          variant="contained"
          disableElevation
          startIcon={<AutoAwesomeIcon />}
          onClick={handleGenerate}
          disabled={isLoading}
          sx={{
            textTransform: "none",
            fontWeight: 600,
            borderRadius: 2.5,
            px: 3,
            py: 1,
            background: "linear-gradient(135deg, #334155 0%, #54739e 100%)",
            "&:hover": {
              background: "linear-gradient(135deg, #54739e 0%, #334155 100%)",
            },
          }}
        >
          {isLoading ? "Generating..." : "Generate with AI"}
        </Button>
      </Box>
    </Paper>
  );
};
