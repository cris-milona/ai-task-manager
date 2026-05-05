import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import { ThemeProvider, CssBaseline, Box, useMediaQuery } from "@mui/material";

import { theme } from "./styles/theme";

import { Home } from "./components/home/Home";
import { Tasks } from "./components/tasks/Tasks";
import { Sidebar } from "./components/Sidebar";
import { Settings } from "./components/settings/Settings";

export default function App() {
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebarOpen = isDesktop || mobileOpen;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar
          open={sidebarOpen}
          isDesktop={isDesktop}
          setMobileOpen={setMobileOpen}
        />
        <Box sx={{ flex: 1, minWidth: 0, p: 4 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
