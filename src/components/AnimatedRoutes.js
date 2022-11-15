import React from "react";
import FetchMovies from "./FetchMovies";
import WelcomeSearch from "./WelcomeSearch";
import { motion } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import MovieDetails from "./MovieDetails";

function AnimatedRoutes() {
  let search = window.location.search;
  let params = new URLSearchParams(search);

  const [searchQuery, setSearchQuery] = useState(params.get("query"));
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  let APIs = {
    trendingAPI:
      "https://api.themoviedb.org/3/trending/all/day?api_key=0733a86bd4fd094f553b62dbd6e2e0c7",

    tvShowDiscoverAPI: `https://api.themoviedb.org/3/discover/tv?api_key=0733a86bd4fd094f553b62dbd6e2e0c7&language=en-US&sort_by=popularity.desc&page=${currentPage}&timezone=America%2FNew_York&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0`,

    peopleDiscoverAPI: `https://api.themoviedb.org/3/person/popular?api_key=0733a86bd4fd094f553b62dbd6e2e0c7&language=en-US&page=${currentPage}`,

    trendingMoviesAPI: `https://api.themoviedb.org/3/movie/popular?api_key=0733a86bd4fd094f553b62dbd6e2e0c7&language=en-US&page=${currentPage}`,

    searchContentAPI: `https://api.themoviedb.org/3/search/multi?api_key=0733a86bd4fd094f553b62dbd6e2e0c7&language=en-US&query=${searchQuery}&page=${currentPage}&include_adult=false`,

    latestMoviesAPI:
      "https://api.themoviedb.org/3/movie/upcoming?api_key=0733a86bd4fd094f553b62dbd6e2e0c7&language=en-US&page=1",
  };

  const location = useLocation();

  let navigate = useNavigate();

  const routeChange = (argument) => {
    navigate(argument);
  };

  let submitFunction = (e) => {
    e.preventDefault();
    setSearchQuery(e.target[0].value);
    routeChange(`/search?query=${e.target[0].value}`);
  };

  function getDetails(movieID) {
    routeChange(`/moviedetails?details=${movieID}`);
  }
  function getMoviePage(moviePage) {
    setPageCount(moviePage);
  }

  return (
    <div class="routeWrapper">
      <WelcomeSearch onSearch={(e) => submitFunction(e)} />
      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="contentListContainer">
                  <div style={{ marginTop: "50px" }}>
                    <div style={{ textAlign: "start" }}>
                      <h4 style={{ color: "white" }}>What's trending</h4>
                    </div>
                    <FetchMovies
                      API={APIs.trendingAPI}
                      isTrendingMovie={true}
                      onClickFunction={(movieID) => getDetails(movieID)}
                    />{" "}
                    {/* Sends an API to the "FetchMovies" component as a prop  */}
                  </div>
                  <div>
                    <h4 style={{ color: "white" }}>Upcoming movies</h4>
                    <FetchMovies
                      secondAPI={APIs.latestMoviesAPI}
                      isLatestMovies={true}
                      onClickFunction={(movieID) => getDetails(movieID)}
                    />
                  </div>
                </div>
              </motion.div>
            }
          />

          <Route
            path="/movies"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="container-lg" style={{ marginTop: "50px" }}>
                  <Stack className="paginationContainer" spacing={2}>
                    <Pagination
                      onChange={(e) => setCurrentPage(e.target.textContent)}
                      className="pagination"
                      count={100}
                      color="primary"
                    />
                  </Stack>
                </div>

                <div className="container-lg contentListContainer">
                  <div style={{ marginTop: "50px" }}>
                    <FetchMovies
                      API={APIs.trendingMoviesAPI}
                      moviePage={(moviePage) => getMoviePage(moviePage)}
                      onClickFunction={(movieID) => getDetails(movieID)}
                    />{" "}
                    {/* Sends an API to the "FetchMovies" component as a prop  */}
                  </div>
                </div>
              </motion.div>
            }
          />

          <Route
            path="/tvshows"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="container-lg" style={{ marginTop: "50px" }}>
                  <Stack className="paginationContainer" spacing={2}>
                    <Pagination
                      onChange={(e) => setCurrentPage(e.target.textContent)}
                      className="pagination"
                      count={pageCount}
                      color="primary"
                    />
                  </Stack>
                </div>

                <div className="container-lg contentListContainer">
                  <div style={{ marginTop: "50px" }}>
                    <FetchMovies
                      API={APIs.tvShowDiscoverAPI}
                      moviePage={(moviePage) => getMoviePage(moviePage)}
                      onClickFunction={(movieID) => getDetails(movieID)}
                    />{" "}
                    {/* Sends an API to the "FetchMovies" component as a prop  */}
                  </div>
                </div>
              </motion.div>
            }
          />

          <Route
            path="/people"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="container-lg" style={{ marginTop: "50px" }}>
                  <Stack className="paginationContainer" spacing={2}>
                    <Pagination
                      onChange={(e) => setCurrentPage(e.target.textContent)}
                      className="pagination"
                      count={pageCount}
                      color="primary"
                    />
                  </Stack>
                </div>

                <div className="container-lg contentListContainer">
                  <div style={{ marginTop: "50px" }}>
                    <FetchMovies
                      API={APIs.peopleDiscoverAPI}
                      moviePage={(moviePage) => getMoviePage(moviePage)}
                    />{" "}
                    {/* Sends an API to the "FetchMovies" component as a prop  */}
                  </div>
                </div>
              </motion.div>
            }
          />

          <Route
            path="/search"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="container-lg" style={{ marginTop: "50px" }}>
                  <Stack className="paginationContainer" spacing={2}>
                    <Pagination
                      onChange={(e) => setCurrentPage(e.target.textContent)}
                      className="pagination"
                      count={pageCount}
                      color="primary"
                    />
                  </Stack>
                </div>

                <div className="container-lg contentListContainer">
                  <div style={{ marginTop: "50px" }}>
                    <FetchMovies
                      API={APIs.searchContentAPI}
                      moviePage={(moviePage) => getMoviePage(moviePage)}
                      onClickFunction={(movieID) => getDetails(movieID)}
                    />{" "}
                    {/* Sends an API to the "FetchMovies" component as a prop  */}
                  </div>
                </div>
              </motion.div>
            }
          />

          <Route
            path="/moviedetails"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="container-lg" style={{ marginTop: "50px" }}>
                  <MovieDetails API={APIs.detailedMovieAPI} />
                </div>
              </motion.div>
            }
          />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default AnimatedRoutes;
