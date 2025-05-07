import { Box, Container, Stack, Typography } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Box
      width={1}
      height={1}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Container maxWidth="md">
        <Stack textAlign="center">
          <Typography variant="h5">Restock Me !!</Typography>
          <Typography variant="subtitle1">
            RestockMe is a simple and personal shopping list app designed to
            help you keep track of household items and essentials. Whether it's
            toothpaste, coffee, or cleaning supplies — mark what you have,
            what’s running low, and what’s out of stock.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
