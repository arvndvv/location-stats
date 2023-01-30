export interface ILocation {
  type: string;
  display_name: string;
  lat: number;
  lon: number;
  class: string;
  place_id: number;
  boundingbox: string[];
  importance: number;
  osm_id: number;
  osm_type: string;
  geojson: any;
}

export interface IViewport {
  active: boolean;
  longitude: number;
  latitude: number;
  zoom: number;
}
export interface IQueryParams {
  place_id: number;
  q: string;
}

export interface IError {
  error: boolean;
  message: string;
}
