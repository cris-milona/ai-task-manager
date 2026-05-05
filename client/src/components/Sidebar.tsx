import type { Dispatch, SetStateAction } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Divider,
  useTheme,
  Tooltip,
  IconButton,
} from "@mui/material";
import {
  CheckCircleOutlined as TasksIcon,
  HomeFilled as HomeIcon,
  SettingsOutlined as SettingsIcon,
  AutoAwesome as LogoIcon,
  Menu,
} from "@mui/icons-material";

const drawerWidth = 260;
const collapsedWidth = 68;

interface NavItem {
  label: string;
  icon: React.ReactNode;
  path: string;
}

const navItems: NavItem[] = [
  { label: "Home", icon: <HomeIcon />, path: "/" },
  { label: "All tasks", icon: <TasksIcon />, path: "/tasks" },
  { label: "Settings", icon: <SettingsIcon />, path: "/settings" },
];

interface SidebarProps {
  open?: boolean;
  isDesktop: boolean;
  setMobileOpen: Dispatch<SetStateAction<boolean>>;
}

export const Sidebar = ({
  open = true,
  isDesktop,
  setMobileOpen,
}: SidebarProps) => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: open ? drawerWidth : collapsedWidth,
        flexShrink: 0,
        transition: "width 0.2s ease-in-out",
        "& .MuiDrawer-paper": {
          width: open ? drawerWidth : collapsedWidth,
          boxSizing: "border-box",
          borderRight: "1px solid",
          borderColor: theme.palette.divider,
          backgroundColor: theme.palette.grey[50],
          overflowX: "hidden",
          transition: "width 0.2s ease-in-out",
        },
      }}
    >
      {!isDesktop && (
        <IconButton
          onClick={() => setMobileOpen((prev) => !prev)}
          sx={{
            borderRadius: 2,
            color: theme.palette.text.secondary,
            "&:hover": {
              backgroundColor: theme.palette.action.hover,
              color: theme.palette.text.primary,
            },
          }}
        >
          <Menu />
        </IconButton>
      )}
      <Box
        sx={{
          p: open ? 3 : 1.5,
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          justifyContent: open ? "flex-start" : "center",
          minHeight: 72,
        }}
      >
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: 2,
            flexShrink: 0,
            background: theme.palette.primary.main,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LogoIcon sx={{ color: "white", fontSize: 20 }} />
        </Box>
        {open && (
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: theme.palette.primary.main,
              whiteSpace: "nowrap",
            }}
          >
            AI Task Manager
          </Typography>
        )}
      </Box>

      <Divider sx={{ mx: open ? 2 : 1 }} />

      <Box sx={{ p: open ? 2 : 1, flex: 1 }}>
        {open && (
          <Typography
            variant="overline"
            sx={{
              px: 1.5,
              mb: 1,
              display: "block",
              color: theme.palette.text.secondary,
              fontWeight: 600,
              fontSize: "0.65rem",
              letterSpacing: "0.1em",
            }}
          >
            Menu
          </Typography>
        )}
        <List disablePadding>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <ListItem key={item.label} disablePadding sx={{ mb: 0.5 }}>
                <Tooltip title={open ? "" : item.label} placement="right">
                  <ListItemButton
                    onClick={() => navigate(item.path)}
                    selected={isActive}
                    sx={{
                      borderRadius: 2.5,
                      py: 1.25,
                      px: open ? 1.5 : 1,
                      justifyContent: open ? "flex-start" : "center",
                      minWidth: 0,
                      "&.Mui-selected": {
                        backgroundColor: "white",
                        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.08)",
                        "&:hover": { backgroundColor: "white" },
                        "& .MuiListItemIcon-root": {
                          color: theme.palette.primary.main,
                        },
                        "& .MuiListItemText-primary": {
                          fontWeight: 600,
                          color: theme.palette.text.primary,
                        },
                      },
                      "&:hover": {
                        backgroundColor: theme.palette.action.hover,
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: open ? 40 : 0,
                        justifyContent: "center",
                        color: isActive
                          ? theme.palette.primary.main
                          : theme.palette.text.secondary,
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    {open && (
                      <ListItemText
                        primary={item.label}
                        slotProps={{
                          primary: {
                            sx: {
                              fontSize: "0.9rem",
                              fontWeight: isActive ? 600 : 500,
                              color: isActive
                                ? theme.palette.text.primary
                                : theme.palette.text.secondary,
                              whiteSpace: "nowrap",
                            },
                          },
                        }}
                      />
                    )}
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            );
          })}
        </List>
      </Box>

      {open && (
        <Box sx={{ p: 2 }}>
          <Box
            sx={{
              p: 2,
              borderRadius: 3,
              backgroundColor: "white",
              border: "1px solid",
              borderColor: theme.palette.divider,
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: theme.palette.text.secondary,
                display: "block",
                lineHeight: 1.5,
              }}
            >
              ✨ Pro tip: Use natural language to describe complex tasks and let
              AI break them down for you.
            </Typography>
          </Box>
        </Box>
      )}
    </Drawer>
  );
};
