import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface Palette {
    stats: {
      total: { main: string; background: string };
      highPriority: { main: string; background: string };
      completed: { main: string; background: string };
      aiGenerated: { main: string; background: string };
    };
  }

  interface PaletteOptions {
    stats?: {
      total?: { main: string; background: string };
      highPriority?: { main: string; background: string };
      completed?: { main: string; background: string };
      aiGenerated?: { main: string; background: string };
    };
  }
}

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#334155",
      light: "#54739e",
      dark: "#263242",
    },
    background: {
      default: "#f9fafb",
      paper: "#ffffff",
    },
    grey: {
      50: "#f9fafb",
      100: "#f3f4f6",
      200: "#e5e7eb",
    },
    stats: {
      total: { main: "#334155", background: "#e8edf2" },
      highPriority: { main: "#ef4444", background: "#fee2e2" },
      completed: { main: "#22c55e", background: "#dcfce7" },
      aiGenerated: { main: "#8b5cf6", background: "#e0e7ff" },
    },
  },
  typography: {
    fontFamily: "'Inter','Roboto', sans-serif",
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
});
