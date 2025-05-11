import { createFileRoute } from "@tanstack/react-router";
import { Box, Stack } from "@mui/material";
import { useState } from "react";
import { getNextStatus } from "../utils/itemUtils";
import { ItemCard } from "../components/itemCard";
import { FilterBar } from "../components/filterBar";
import { useItems } from "../hooks/useItems";
import { ItemStatus } from "../models/item";
export const Route = createFileRoute("/")({
  component: Homepage,
});

function Homepage() {
  const { items, categories, updateItem, deleteItem } = useItems();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("name");

  const handleToggleStatus = (id: string) => {
    const item = items.find((item) => item.id === id);

    if (!item) return;

    updateItem(item.id, {
      status: getNextStatus(item.status),
      updatedAt: new Date().toISOString(),
    });
  };

  const handleDelete = (id: string) => {
    deleteItem(id);
  };

  const handleEdit = (
    id: string,
    name: string,
    category: string,
    boughtAt: string,
    status: ItemStatus,
    startUsingAt: string
  ) => {
    updateItem(id, {
      name,
      category,
      boughtAt,
      status,
      startUsingAt,
      updatedAt: new Date().toISOString(),
    });
  };

  const filteredItems = items
    .filter((item) => (filter === "all" ? true : item.status === filter))
    .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) =>
      sort === "updated"
        ? new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        : sort === "name"
          ? a.name.localeCompare(b.name)
          : a.category.localeCompare(b.category)
    );

  return (
    <Box width={1} height={1}>
      <Stack>
        <FilterBar
          search={search}
          onSearchChange={setSearch}
          filter={filter}
          onFilterChange={setFilter}
          sort={sort}
          onSortChange={setSort}
        />
        {filteredItems.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            categories={categories}
            onToggleStatus={handleToggleStatus}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </Stack>
    </Box>
  );
}
