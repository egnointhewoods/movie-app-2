import React, { useEffect, useState } from 'react';
import '../component-styles/movieDetails.css'
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import LoadingScreen from './LoadingScreen';
import Collapse from 'react-bootstrap/Collapse';
import {Button} from 'react-bootstrap';

function MovieDetails() {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let movieID = params.get('details');

    let getDetailMovieAPI = `https://api.themoviedb.org/3/movie/${movieID}?api_key=0733a86bd4fd094f553b62dbd6e2e0c7&language=en-US`;
    let getMovieCastAPI = `https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=0733a86bd4fd094f553b62dbd6e2e0c7&language=en-US`
    
    const [movie, setMovie] = useState('');
    const [cast, setCast] = useState('');
    const [open, setOpen] = useState(false);


    useEffect(()=> {
        fetch(getDetailMovieAPI)
            .then(res => {
                return res.json();
            })
            .then(data => {
                setMovie(data);
            })

        
    }, [getDetailMovieAPI])

    useEffect(()=> {
        fetch(getMovieCastAPI)
        .then(res => {
            return res.json();
        })
        .then(data => {
            setCast(data);
        })    

    }, [getMovieCastAPI])

    function sevenMovies(){
        let castList = [];
        (function pushToCastList(){
            for(let i = 0; i < 5; i++){
                let person = cast.cast[i]
                castList.push(
                    <div className='col-2 castCard'>
                <Tooltip title={
                    <div>
                    <h6> {person?.character}</h6>
                    </div>
                } arrow>
                <IconButton>
                    <img src={ !person.profile_path? 'https://www.upload.ee/image/14132287/profile-icon-png-893__1_.png':  `https://image.tmdb.org/t/p/w200/${person.profile_path}`} alt="" style={{maxWidth: "150px"}}/>
                </IconButton>
                </Tooltip>
                <p>{person.name || person.original_name}</p>
                
            </div>
                )
            }
        })();       
        
       
        castList.push(
                            <>
                                <Button
                                    className='viewMoreButton'
                                    onClick={() => setOpen(!open)}
                                    aria-controls="example-collapse-text"
                                    aria-expanded={open}
                                >
                                   {!open ? <> View More</> : <>View Less</>}
                                </Button>
                                <Collapse in={open}>
                                    <div id="example-collapse-text" className='row'>
                                        {collapsedCastList()}
                                    </div>
                                </Collapse>
                            </>
        )
        function collapsedCastList(){
            let returnedValue = [];
            for(let i = 5; i < cast.cast.length; i++){
                let person = cast.cast[i]                
                    returnedValue.push(
                        <div className='col-2 castCard'>
                    <Tooltip title={
                        <div>
                        <h6> {person.character}</h6>
                        </div>
                    } arrow>
                    <IconButton>
                        <img src={ !person.profile_path? 'https://www.upload.ee/image/14132287/profile-icon-png-893__1_.png':  `https://image.tmdb.org/t/p/w200/${person.profile_path}`} alt="" style={{maxWidth: "150px"}}/>
                    </IconButton>
                    </Tooltip>
                    <p>{person.name || person.original_name}</p>
                    
                </div>
                )
            }
            
            return(returnedValue);
        }
        return (castList)
    }
         
    if(movie.success === false){
        return(
            <h2 className='errorMessage'>{movie.status_message}</h2>
        )
    }else if(movie){

        //Gets only the year of the release date
        let str = movie.release_date;

        let strFirstThree = str.substring(0,4);
        
        return (
            <div>
                <div className='movieDetailContainer row'>
                    <img className='movieDetailIMG col-3' src = { !movie.poster_path && !movie.profile_path ? 'https://www.upload.ee/image/14132287/profile-icon-png-893__1_.png' :  `https://image.tmdb.org/t/p/w200/${movie.poster_path || movie.profile_path}`} alt={movie.original_title} />
                    <div className='movieDescription col-9'>
                        
                        <h2>{movie.title} ({strFirstThree})</h2>
                        <br />
                        <h5>Genres:</h5>
                        <br />

                        {movie.genres.map((genre)=> {
                            return(
                                <span className='genreSpan'>{genre.name}</span>
                            )
                        })}
                        <br />
                        <br />
                        <span className='tagline' >{movie.tagline}</span>
                        <br /> <br />
                        <h5>Overview:</h5>
                        <span>{movie.overview}</span>
                        <br /><br />

                        {movie.production_companies.length === 1 ? <div> <h5>Production company:</h5> <span>{movie.production_companies[0].name}</span></div>: <div> <h5>Production companies: </h5> {movie.production_companies.map((company) => {return( ` ${company.name},`)})}</div>} 


                        
                    </div>

                    
                    <h2 style={{marginTop: "30px"}}>Cast: </h2>
                    <div className='row'>
                        
                        {cast?

                        <div className='row'>
                            {sevenMovies()}
                        </div>

                        
                        : 
                        <div>
                            <LoadingScreen />
                        </div>}
                            
                    </div>    
                         

                </div>
            </div>
        )}
}

export default MovieDetails
