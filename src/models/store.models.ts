import { ILocation } from "./location.models";

export enum EActions {
  UPDATE_SEARCH_LIST = "UPDATE_SEARCH_LIST",
  UPDATE_SELECTED_LOCATION = "UPDATE_SELECTED_LOCATION",
  UPDATE_POPULATION_DATA = "UPDATE_POPULATION_DATA",
  UPDATE_LINK = "UPDATE_LINK",
}
export interface IPopulation {
  population: number;
  census: number | null;
}
export interface IStore {
  dispatch?: React.Dispatch<IAction>;
  searchList: any[];
  selectedLocation: ILocation | null;
  populationData: IPopulation | null;
  link: string;
}

export interface IAction {
  type: EActions;
  payload: any;
}
