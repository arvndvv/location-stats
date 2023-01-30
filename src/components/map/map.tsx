import { useState, useEffect, useRef, useCallback } from "react";
import Map, { MapRef, Marker, Source, Layer } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./map.scss";
import { useStoreContext } from "../../store/store";
import { EActions, ILocation, IViewport } from "../../models";
import { createAction, fetchLocationByQuery } from "../../utils/_helpers";
import { useSearchParams } from "react-router-dom";
import ShareButton from "../share-button/share-button";
import mapboxgl from "mapbox-gl";
// eslint-disable-next-line import/no-webpack-loader-syntax
(mapboxgl as any).workerClass =
  // eslint-disable-next-line import/no-webpack-loader-syntax
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

function LocationMap() {
  const defaultParams = {
    q: "Boston,+Suffolk+County,+Massachusetts,+United+States",
    place_id: "297978730",
  };
  const defaultViewPort = {
    active: true,
    longitude: -71.057778,
    latitude: 42.360278,
    zoom: 6,
  };
  const [viewport, setViewport] = useState<IViewport>(defaultViewPort);

  const onSelectLocation = useCallback(
    ({ lon, lat, boundingbox }: ILocation) => {
      setViewport({
        active: !!(lon && lat),
        longitude: lon,
        latitude: lat,
        zoom: 8,
      });
      mapRef.current?.flyTo({ center: [lon, lat], duration: 2000 });
      const boundery = [
        [boundingbox[2], boundingbox[0]],
        [boundingbox[3], boundingbox[1]],
      ] as any;
      mapRef.current?.fitBounds(boundery, { padding: 40, duration: 1000 });
    },
    []
  );
  const { selectedLocation, populationData, dispatch, link } =
    useStoreContext();

  const mapRef = useRef<MapRef>() as React.MutableRefObject<MapRef>;
  useEffect(() => {
    if (selectedLocation) {
      onSelectLocation(selectedLocation);
    } else {
      setViewport((prev) => ({ ...prev, active: false }));
    }
  }, [onSelectLocation, selectedLocation]);

  const [searchParams] = useSearchParams();
  const q = searchParams.get("q") || defaultParams.q;
  const place_id = searchParams.get("place_id") || defaultParams.place_id;
  const updateMap = useCallback(async () => {
    if (q && place_id) {
      const queryLocation = await fetchLocationByQuery(q, place_id);
      const sharedLocationExist = !queryLocation.hasOwnProperty("error");
      if (sharedLocationExist) {
        dispatch(
          createAction(EActions.UPDATE_SELECTED_LOCATION, queryLocation)
        );
      }
    }
  }, [dispatch, place_id, q]);

  useEffect(() => {
    updateMap();
  }, [updateMap]);

  return (
    <div className="map-container">
      <span className="stats">
        <span className="stats__info">
          <p>
            Population:
            <b className="ml-1 mr-4">{populationData?.population || "N/A"}</b>
          </p>
          <p>
            Population updated on:
            <b className="ml-1">{populationData?.census || "N/A"}</b>
          </p>
        </span>
        <span className="stats__share">
          {link && <ShareButton link={link} />}
        </span>
      </span>
      <Map
        ref={mapRef}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN as string}
        initialViewState={viewport}
        scrollZoom={true}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        {selectedLocation?.geojson && (
          <>
            <Source
              id="my-data"
              type="geojson"
              data={selectedLocation.geojson}
            />
            <Layer
              id="my-data-layer"
              type="fill"
              source="my-data"
              paint={{
                "fill-color": "#1b80c8",
                "fill-opacity": 0.45,
              }}
            />
          </>
        )}

        {viewport.active && (
          <Marker longitude={viewport.longitude} latitude={viewport.latitude} />
        )}
      </Map>
    </div>
  );
}
export default LocationMap;
