import { IAction, IStore } from "../models";
import { createHistoryItem, updateHistory } from "../utils/_helpers";

export function handleAction(
  state: IStore,
  action: IAction,
  key: string,
  defaultValue: any = [],
  addToHistory = false
) {
  if (addToHistory) {
    if (action.payload) {
      const historyItem = createHistoryItem(action.payload);
      updateHistory(historyItem);
    }
  }
  return { ...state, [key]: action.payload || defaultValue };
}
