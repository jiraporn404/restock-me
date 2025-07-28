import { createFileRoute } from "@tanstack/react-router";
import { Box, TextField, Button, Divider, Chip, Stack } from "@mui/material";
import { useState } from "react";
import { useItems } from "../hooks/useItems";
import { generatePastelColor } from "../utils/colors";

export const Route = createFileRoute("/setting")({
  component: RouteComponent,
});

function RouteComponent() {
  const { categories, addCategory, deleteCategory } = useItems();
  const [newCategory, setNewCategory] = useState("");

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newCategory.trim()) {
      addCategory({ name: newCategory, color: generatePastelColor() });
      setNewCategory("");
    }
  };

  return (
    <Box>
      <Box>
        <form onSubmit={handleAdd}>
          <TextField
            label="หมวดใหม่"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            fullWidth
            margin="normal"
            autoComplete="off"
          />
          <Button type="submit" variant="contained" fullWidth>
            เพิ่ม
          </Button>
        </form>
      </Box>
      <Divider sx={{ my: 2 }} />
      {categories.length > 0 ? (
        <Stack direction="row" spacing={0} gap={1} flexWrap={"wrap"}>
          {categories.map((cat) => {
            return (
              <Chip
                label={cat.name}
                onDelete={() => deleteCategory(cat)}
                key={cat.name}
                sx={{
                  backgroundColor: cat.color,
                }}
              />
            );
          })}
        </Stack>
      ) : (
        <></>
      )}
    </Box>
  );
}
