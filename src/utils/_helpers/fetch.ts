import { IError, ILocation } from "../../models";
import { generateError } from "./general";

export const fetchLocation = async (lat: number, lon: number) => {
  const query = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1&polygon_geojson=1`;
  const res = await fetch(query);
  const data = await res.json();
  return data;
};

export const fetchLocationByQuery = async (
  q: string,
  place_id: string
): Promise<ILocation | IError> => {
  try {
    const query = `https://nominatim.openstreetmap.org/search?q=${q}&format=json&polygon_geojson=1`;
    const res = await fetch(query);
    const data = (await res.json()) as ILocation[];
    if (!data || !data.length)
      return generateError("no matching location found!");
    const exactMatch = data.find(
      (location) => Number(location.place_id) === Number(place_id)
    );
    if (!exactMatch) return generateError("no matching location found!");
    return exactMatch;
  } catch (e) {
    console.log(e);
    return generateError("invalid query!");
  }
};

export const getPopulationDetails = async (
  osm_id: number,
  osm_type: string
) => {
  const osmtype = osm_type[0].toUpperCase();
  const url = `https://nominatim.openstreetmap.org/details.php?osmid=${osm_id}&osmtype=${osmtype}&format=json`;
  const response = await fetch(url);
  const data = await response.json();
  const extratags = data?.extratags;
  if (!extratags) {
    return {
      population: null,
      census: null,
    };
  }
  const populationDate = extratags["population:date"] || null;
  const censusPopulation = extratags["census:population"] || null;
  const payload = {
    population: data?.extratags?.population || null,
    census: populationDate || censusPopulation || null,
  };
  return payload;
};

export async function fetchSearchList(search: string) {
  const url = `https://nominatim.openstreetmap.org/search?q=${search}&featuretype=administrative&format=json&polygon_geojson=1`;
  const response = await fetch(url);
  const data: ILocation[] = await response.json();
  return data;
}
