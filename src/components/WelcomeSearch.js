import React from "react";
import ImageSlider from "./Layout/ImageSlider";
import "../component-styles/globalComponentStyles.css";
function WelcomeSearch({ onSearch }) {
  return (
    <div className="welcomeDiv">
      <ImageSlider />
      <div className="container-lg searchBar">
        <form action="/search" onSubmit={(e) => onSearch(e)}>
          <input
            className="searchInput"
            type="text"
            name="query"
            placeholder="Search for a movie, tv show, person..."
          />
        </form>
      </div>
    </div>
  );
}

export default WelcomeSearch;
