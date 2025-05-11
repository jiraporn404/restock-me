export type ItemStatus = "available" | "low" | "out";

export interface Item {
  id: string;
  name: string;
  category: string;
  status: ItemStatus;
  boughtAt: string;
  startUsingAt: string | null;
  endUsingAt: string | null;
  updatedAt: string;
  createdAt: string;
}

export const statusIcons: Record<ItemStatus, string> = {
  available: "🟢",
  low: "🟡",
  out: "🔴",
};

export const statusColors: Record<ItemStatus, string> = {
  available: "success",
  low: "warning",
  out: "error",
};

export const statusLabels: Record<ItemStatus, string> = {
  available: "Available",
  low: "Low",
  out: "Out of Stock",
};
