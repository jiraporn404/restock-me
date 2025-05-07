import { Item } from "../models/item";
import { useLocalStorage } from "./useLocalStorage";
import { generatePastelColor } from "../utils/colors";

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

  const addItem = (item: Item) => {
    setItems([...items, item]);
  };

  const deleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const updateItem = (id: string, updates: Partial<Item>) => {
    setItems(items.map((i) => (i.id === id ? { ...i, ...updates } : i)));
  };

  const addCategory = (category: Category) => {
    setCategories([...categories, category]);
  };

  const deleteCategory = (category: Category) => {
    setCategories(categories.filter((c) => c !== category));
  };

  const updateCategory = (index: number, category: Category) => {
    setCategories(categories.map((c, i) => (i === index ? category : c)));
  };

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
