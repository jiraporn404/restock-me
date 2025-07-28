import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ulid } from "ulid";
import { Item, ItemStatus } from "../models/item";
import {
  Box,
  Button,
  Chip,
  MenuItem,
  Select,
  TextField,
  InputLabel,
  FormControl,
  Stack,
} from "@mui/material";
import { useItems } from "../hooks/useItems";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const defaultStatus: ItemStatus = "available";

export const Route = createFileRoute("/add")({
  component: RouteComponent,
});

function RouteComponent() {
  const [name, setName] = useState("");
  const [startUsingAt, setStartUsingAt] = useState<string | null>(
    new Date().toISOString().split("T")[0]
  );
  const [boughtAt, setBoughtAt] = useState<string | null>(
    new Date().toISOString().split("T")[0]
  );
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
      startUsingAt: startUsingAt,
      endUsingAt: null,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    await addItem(newItem);

    navigate({ to: "/" });
  };
  return (
    <Box mt={1}>
      <form onSubmit={handleAdd}>
        <Stack>
          <TextField
            label="ชื่อ"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            autoComplete="off"
          />

          <FormControl fullWidth>
            <InputLabel id="category-label">หมวดหมู่</InputLabel>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              fullWidth
              displayEmpty
              label="หมวดหมู่"
              labelId="category-label"
            >
              {categories.map((cat) => (
                <MenuItem key={cat.name} value={cat.name}>
                  <Chip
                    label={cat.name}
                    sx={{
                      backgroundColor: cat.color,
                      width: "fit-content",
                      "& .MuiChip-label": {
                        fontSize: "0.625rem",
                      },
                    }}
                  />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <DatePicker
            label="ซื้อเมื่อ"
            value={dayjs(boughtAt)}
            onChange={(value) => setBoughtAt(value?.toISOString() ?? "")}
            format="DD/MM/YYYY"
            sx={{
              "& .MuiPickersOutlinedInput-root": {
                fontSize: "0.875rem",
              },
            }}
          />
          <DatePicker
            label="เริ่มใช้"
            value={dayjs(startUsingAt)}
            onChange={(value) => setStartUsingAt(value?.toISOString() ?? "")}
            format="DD/MM/YYYY"
            sx={{
              "& .MuiPickersOutlinedInput-root": {
                fontSize: "0.875rem",
              },
            }}
          />
        </Stack>

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
