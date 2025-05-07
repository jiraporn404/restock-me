import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Box } from "@mui/material";
import { Layout } from "../components/layout";

export const Route = createRootRoute({
  component: () => (
    <Layout>
      <Box
        sx={{
          padding: 2,
          height: "calc(100% - 56px)",
          overflow: "auto",
          backgroundColor: "white",
        }}
      >
        <Outlet />
      </Box>
    </Layout>
  ),
});
