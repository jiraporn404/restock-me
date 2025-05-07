import { createFileRoute } from "@tanstack/react-router";
import { Box, Stack, Typography } from "@mui/material";
import { Item } from "../models/item";
import { useState } from "react";
import { getNextStatus } from "../utils/itemUtils";
import { ItemCard } from "../components/itemCard";
const initialItems: Item[] = [
  {
    id: "1",
    name: "ยาสีฟัน",
    category: "ห้องน้ำ",
    status: "low",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "น้ำปลา",
    category: "ครัว",
    status: "available",
    updatedAt: new Date().toISOString(),
  },
];

export const Route = createFileRoute("/restock")({
  component: RouteComponent,
});

function RouteComponent() {
  const [items, setItems] = useState<Item[]>(initialItems);

  const handleToggleStatus = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: getNextStatus(item.status),
              updatedAt: new Date().toISOString(),
            }
          : item
      )
    );
  };

  const handleDelete = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <Box width={1} height={1}>
      <Stack>
        <Typography variant="h5">🛒 รายการของ</Typography>
        {items.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            onToggleStatus={handleToggleStatus}
            onDelete={handleDelete}
          />
        ))}
      </Stack>
    </Box>
  );
}
