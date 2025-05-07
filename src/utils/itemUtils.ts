import { ItemStatus } from "../models/item";

export function getNextStatus(status: ItemStatus): ItemStatus {
  const order: ItemStatus[] = ["available", "low", "out"];
  const nextIndex = (order.indexOf(status) + 1) % order.length;
  return order[nextIndex];
}
