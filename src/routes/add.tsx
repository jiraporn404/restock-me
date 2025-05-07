import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ulid } from "ulid";
import { Item, ItemStatus } from "../models/item";
import { Box, Button, Chip, MenuItem, Select, TextField } from "@mui/material";
import { useItems } from "../hooks/useItems";

const defaultStatus: ItemStatus = "available";

export const Route = createFileRoute("/add")({
  component: RouteComponent,
});

function RouteComponent() {
  const [name, setName] = useState("");
  const { addItem, categories } = useItems();
  const [category, setCategory] = useState(categories[0].name);

  const navigate = useNavigate();

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newItem: Item = {
      id: ulid(),
      name: name.trim(),
      category: category,
      status: defaultStatus,
      boughtAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await addItem(newItem);

    navigate({ to: "/" });
  };
  return (
    <Box>
      <form onSubmit={handleAdd}>
        <TextField
          label="ชื่อของ"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />

        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          fullWidth
          displayEmpty
          sx={{ mt: 2 }}
        >
          {categories.map((cat) => (
            <MenuItem key={cat.name} value={cat.name}>
              <Chip
                label={cat.name}
                sx={{
                  backgroundColor: cat.color,
                  width: "fit-content",
                }}
              />
            </MenuItem>
          ))}
        </Select>

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 3 }}
          disabled={!name.trim() || !category}
          type="submit"
        >
          บันทึกรายการ
        </Button>
      </form>
    </Box>
  );
}
