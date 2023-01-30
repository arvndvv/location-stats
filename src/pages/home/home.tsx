import React from "react";
import LocationMap from "../../components/map/map";
import SearchInput from "../../components/search-input/search-input";
import "./home.scss";
import { Link } from "react-router-dom";
import Credit from "../../components/credit/credit";

function Home() {
  return (
    <div className="home container">
      <Credit />
      <div className="home__content mb-6">
        <span className="home__section mb-6">
          <h1 className="home__title">
            Location <b>Stats</b>
          </h1>
          <p className="home__description">
            Find population data for any region, with a simple and straight
            forward approach.
          </p>
        </span>
        <span className="home__section flex flex-column">
          <SearchInput />
          <Link to="/history" className="w-full text-left">
            search history
          </Link>
        </span>
      </div>
      <LocationMap></LocationMap>
    </div>
  );
}

export default Home;
