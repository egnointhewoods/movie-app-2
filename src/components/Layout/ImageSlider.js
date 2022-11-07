import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import { useEffect } from "react";
import useFetch from "../Hooks/useFetch";

export default function ImageSlider() {
  function getDetails(movieID) {
    routeChange(`/moviedetails?details=${movieID}`);
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
        <ScrollingCarousel show={3.5} slide={2} transition={0.5} swiping={true}>
          {headerMovie.map((movie) => {
            {
              return (
                <div
                  onClick={() => getDetails(movie.id)}
                  key={movie.id}
                  className="movieWrapper"
                >
                  <Item
                    description={movie.description}
                    imgSrc={movie.imgSrc}
                    tags={movie.tags}
                    subject={movie.subject}
                  />
                </div>
              );
            }
          })}
        </ScrollingCarousel>
      </>
    );
  }
}
