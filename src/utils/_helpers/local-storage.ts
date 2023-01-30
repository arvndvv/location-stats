import { IHistory } from "../../models";

export function updateHistory(update: IHistory) {
  const existingHistory: Partial<IHistory[]> = getHistory();
  const newHistory = [...existingHistory, update];
  localStorage.setItem("history", JSON.stringify(newHistory));
}
export function getHistory(): IHistory[] {
  const storageData = localStorage.getItem("history") || "[]";
  return JSON.parse(storageData);
}
