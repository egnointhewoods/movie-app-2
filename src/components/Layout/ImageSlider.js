import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "../../component-styles/imageSlider.css";
import useFetch from "../../Hooks/useFetch";

export default function ImageSlider() {
  let search = window.location.search;
  let params = new URLSearchParams(search);
  let navigate = useNavigate();
  const settings = {
    dots: true,
    arrows: false,
    fade: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  function getDetails(movieID) {
    navigate(`/moviedetails?details=${movieID}`);
  }
  const {
    error,
    isLoading,
    data: data,
  } = useFetch(
    "https://api.themoviedb.org/3/movie/popular?api_key=0733a86bd4fd094f553b62dbd6e2e0c7&language=en-US&page=1"
  );
  if (data && !error && !isLoading) {
    const headerMovies = [];
    for(let i = 0; i < 4; i++){
      headerMovies.push(data.results[i]);
    }
    console.log(headerMovies);
    return (
      <div className="imageSlider">
        <Slider {...settings}>
          {headerMovies.map((movie)=>{
            return(
              <>
                <div className="headerImageWrapper">
                  <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path || movie.profile_path}`} />
                  <p>Watch {movie.title}</p>
                </div>
                <div className="headerImageLayer"></div>
              </>
            )
          })}
        </Slider>
      </div>
    );
  } else {
    return(
      <div className="emptyDiv">

      </div>
    )
  }
}
