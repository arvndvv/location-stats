import React, { useEffect, useMemo, useCallback } from "react";
import { initialPopulationData, useStoreContext } from "../../store/store";
import "./search-input.scss";
import { debounce } from "lodash";
import { EActions, ILocation } from "../../models";
import {
  getPopulationDetails,
  fetchSearchList,
  createAction,
  createLocationQueryFromLocationItem,
} from "../../utils/_helpers";

function SearchInput() {
  const [search, setSearch] = React.useState<string>("");
  const { dispatch, searchList, selectedLocation } = useStoreContext() as any;

  const getSearchList = useCallback(
    async (search: string) => {
      const data = await fetchSearchList(search);
      dispatch(createAction(EActions.UPDATE_SEARCH_LIST, data));
    },
    [dispatch]
  );

  const debouncedResults = useMemo(() => {
    return debounce(getSearchList, 300);
  }, [getSearchList]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    debouncedResults(e.target.value);
  };
  const clearSearch = () => {
    setSearch("");
    dispatch(createAction(EActions.UPDATE_SEARCH_LIST, []));
    dispatch(createAction(EActions.UPDATE_SELECTED_LOCATION, null));
    dispatch(createAction(EActions.UPDATE_LINK, ""));
    dispatch(
      createAction(EActions.UPDATE_POPULATION_DATA, initialPopulationData)
    );
  };
  const handleLocationSelect = async (selectedItem: ILocation) => {
    dispatch(createAction(EActions.UPDATE_SELECTED_LOCATION, selectedItem));
  };

  useEffect(() => {
    if (selectedLocation) {
      const link = createLocationQueryFromLocationItem(selectedLocation);
      dispatch(createAction(EActions.UPDATE_LINK, link));
      setSearch(selectedLocation.display_name);
      getPopulationDetails(
        selectedLocation.osm_id,
        selectedLocation.osm_type
      ).then((data) => {
        dispatch(createAction(EActions.UPDATE_POPULATION_DATA, data));
        dispatch(createAction(EActions.UPDATE_SEARCH_LIST, []));
      });
    }
  }, [dispatch, selectedLocation]);
  return (
    <>
      <span className="relative fit-content">
        <input
          type="text"
          name=""
          value={search}
          onInput={handleSearch}
          id="search-input"
          className="search-input"
          placeholder="Search location..."
        />
        <label htmlFor="search-input">Search location</label>
        {search && (
          <span className="clear-search" onClick={clearSearch}>
            x
          </span>
        )}
        <div className="search-dropdown">
          <ul className="search-dropdown__list">
            {searchList.map((item: ILocation, index: number) => {
              return (
                <li
                  onClick={() => {
                    handleLocationSelect(item);
                  }}
                  key={index}
                  className="search-dropdown__item"
                  title={item.display_name}
                >
                  {(item.display_name || "").substring(0, 30).concat("...")}
                </li>
              );
            })}
          </ul>
        </div>
      </span>
    </>
  );
}

export default SearchInput;
