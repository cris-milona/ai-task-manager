import { useState, type Dispatch, type SetStateAction } from "react";

import {
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  InputAdornment,
  useTheme,
} from "@mui/material";
import { AutoAwesome as AutoAwesomeIcon } from "@mui/icons-material";

interface TaskInputProps {
  placeholder?: string;
  setResult: Dispatch<SetStateAction<unknown>>;
}

export const TaskInput = ({
  placeholder = "Describe a task or goal...",
  setResult,
}: TaskInputProps) => {
  const theme = useTheme();

  const [input, setInput] = useState("");

  const sendToBackend = async () => {
    const res = await fetch("http://localhost:3001/parse-task", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input }),
    });

    const data = await res.json();
    setResult(data);
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
        minRows={2}
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
          onClick={sendToBackend}
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
          Generate with AI
        </Button>
      </Box>
    </Paper>
  );
};
