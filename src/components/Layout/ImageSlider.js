import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useFetch from "../../Hooks/useFetch";

export default function ImageSlider() {
  let search = window.location.search;
  let params = new URLSearchParams(search);
  let navigate = useNavigate();
  function getDetails(movieID) {
    navigate(`/moviedetails?details=${movieID}`);
  }
  const {
    error,
    isLoading,
    data: headerMovies,
  } = useFetch(
    "https://api.themoviedb.org/3/movie/popular?api_key=0733a86bd4fd094f553b62dbd6e2e0c7&language=en-US&page=1"
  );
  if (headerMovies) {
    console.log(headerMovies);
    return (
      <>
               
      </>
    );
  }
}
