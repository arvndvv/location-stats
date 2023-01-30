import { createContext, useContext, useReducer } from "react";
import { IPopulation, IStore } from "../models";
import { storeReducer } from "./reducer";

export const initialPopulationData: IPopulation = {
  population: 0,
  census: null,
};

let initialState: IStore = {
  searchList: [],
  selectedLocation: null,
  populationData: initialPopulationData,
  link: "",
};

const locationContext = createContext(initialState);
const { Provider } = locationContext;

const StateProvider = ({ children }: any) => {
  const store = useReducer(storeReducer, initialState);
  const [state, dispatch] = store;
  const storeData = { state, dispatch };
  return (
    <Provider value={{ ...storeData.state, dispatch }}>{children}</Provider>
  );
};
function useStoreContext(): any {
  return useContext(locationContext);
}
export { useStoreContext, StateProvider, locationContext };
