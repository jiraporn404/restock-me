import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import { useMatchRoute, useNavigate } from "@tanstack/react-router";
import { BottomNavigation, BottomNavigationAction, Stack } from "@mui/material";
import { AddIcon, SettingsIcon } from "../icons";
import { HomeIcon } from "../icons";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100%)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

export function Layout({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  const routeMatch = useMatchRoute();
  const navigate = useNavigate();
  const isHomeActive = routeMatch({ to: "/" });
  const isAddActive = routeMatch({ to: "/add" });
  const isSettingActive = routeMatch({ to: "/setting" });
  const [value, setValue] = React.useState(0);

  const getPageTitle = () => {
    if (isHomeActive) return "🛒 รายการของ";
    if (isAddActive) return "➕ เพิ่มรายการใหม่";
    if (isSettingActive) return "🏷 จัดการหมวดหมู่";
    return "RestockMe";
  };

  React.useEffect(() => {
    if (isHomeActive) setValue(0);
    if (isAddActive) setValue(1);
    if (isSettingActive) setValue(2);
  }, [isHomeActive, isAddActive, isSettingActive]);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar
          sx={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Stack
            direction="row"
            width="100%"
            display={"flex"}
            justifyContent={"center"}
          >
            <Typography noWrap component="div">
              {getPageTitle()}
            </Typography>
          </Stack>
        </Toolbar>
      </AppBar>

      <Box
        component="main"
        sx={{
          marginTop: "56px",
          width: "100vw",
          height: "calc(100vh - 56px)",
          overflow: "auto",
        }}
      >
        {children}
        <Box
          sx={{
            width: "100%",
            position: "fixed",
            bottom: 0,
          }}
        >
          <BottomNavigation
            showLabels
            value={value}
            onChange={(_event, newValue) => {
              setValue(newValue);
            }}
            sx={{ borderTop: "1px solid #e0e0e0" }}
          >
            <BottomNavigationAction
              label="หน้าหลัก"
              icon={<HomeIcon />}
              onClick={() => navigate({ to: "/" })}
            />{" "}
            <BottomNavigationAction
              label="เพิ่มสินค้า"
              icon={<AddIcon />}
              onClick={() => navigate({ to: "/add" })}
            />
            <BottomNavigationAction
              label="ตั้งค่า"
              icon={<SettingsIcon />}
              onClick={() => navigate({ to: "/setting" })}
            />
          </BottomNavigation>
        </Box>
      </Box>
    </Box>
  );
}
