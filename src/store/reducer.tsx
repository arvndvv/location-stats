import { EActions, IAction, IStore } from "../models";
import { handleAction } from "./action";

export function storeReducer(state: IStore, action: IAction) {
  switch (action.type) {
    case EActions.UPDATE_SEARCH_LIST:
      return handleAction(state, action, "searchList", []);
    case EActions.UPDATE_SELECTED_LOCATION:
      return handleAction(state, action, "selectedLocation", null, true);
    case EActions.UPDATE_POPULATION_DATA:
      return handleAction(state, action, "populationData", null);
    case EActions.UPDATE_LINK:
      return handleAction(state, action, "link", "");
    default:
      throw new Error();
  }
}
