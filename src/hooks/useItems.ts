import { Item } from "../models/item";
import { useLocalStorage } from "./useLocalStorage";
import { generatePastelColor } from "../utils/colors";
import { useCallback } from "react";

export type Category = {
  name: string;
  color: string;
};

const DEFAULT_CATEGORIES = [
  { name: "ครัว", color: generatePastelColor() },
  { name: "ห้องน้ำ", color: generatePastelColor() },
  { name: "ของใช้", color: generatePastelColor() },
  { name: "อื่นๆ", color: generatePastelColor() },
];

export function useItems() {
  const [items, setItems] = useLocalStorage<Item[]>("items", []);
  const [categories, setCategories] = useLocalStorage<Category[]>(
    "categories",
    DEFAULT_CATEGORIES
  );

  const addItem = useCallback(
    (item: Item) => {
      setItems((currentItems) => [...currentItems, item]);
    },
    [setItems]
  );

  const deleteItem = useCallback(
    (id: string) => {
      setItems((currentItems) => currentItems.filter((item) => item.id !== id));
    },
    [setItems]
  );

  const updateItem = useCallback(
    (id: string, updates: Partial<Item>) => {
      setItems((currentItems) =>
        currentItems.map((i) => (i.id === id ? { ...i, ...updates } : i))
      );
    },
    [setItems]
  );

  const addCategory = useCallback(
    (category: Category) => {
      setCategories((currentCategories) => [...currentCategories, category]);
    },
    [setCategories]
  );

  const deleteCategory = useCallback(
    (category: Category) => {
      setCategories((currentCategories) =>
        currentCategories.filter((c) => c !== category)
      );
    },
    [setCategories]
  );

  const updateCategory = useCallback(
    (index: number, category: Category) => {
      setCategories((currentCategories) =>
        currentCategories.map((c, i) => (i === index ? category : c))
      );
    },
    [setCategories]
  );

  return {
    items,
    addItem,
    deleteItem,
    updateItem,
    categories,
    addCategory,
    deleteCategory,
    updateCategory,
  };
}
