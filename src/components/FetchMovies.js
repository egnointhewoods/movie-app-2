import { useEffect, useState } from 'react';
import './componentStyles.css'
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import LoadingScreen from './LoadingScreen'
import Carousel from 'react-bootstrap/Carousel'



function TrendingMovies({onClickFunction, moviePage, API, secondAPI, isTrendingMovie, isLatestMovies}) {
    
    const [movieData, setMovieData] = useState('');
    const [secondMovieData, setSecondMovieData] = useState('');

      




    let fiveMoviesLatest = (count) => {
        let movies = [];    

        for(let i = count; i < count+5; i++){
        let movie = secondMovieData.results[i];
                movies.push(
                    <div className='col-2 carouselMovieCard' onClick={() => onClickFunction(movie.id)}>
                        <Tooltip title ={
                            movie.media_type === "person" || movie.gender ?
                            
                            <div className='movieTooltip'> 
                            <p className='movieDescription'>Person</p>
                            <p className='movieDescription'>Known for: {movie.known_for.map((knownFor) => {
                                return(
                                    `${knownFor.title || knownFor.name}, `
                                )
                            })}</p>  
                            <p className='movieDescription'>Profession: {movie.known_for_department}</p>                                   
                                 
                            <p className='movieDescription'>{movie.overview}</p>

                            </div> 
                            :
                            <div className='movieTooltip'> 
                            <p className='movieDescription'>Release date: {movie.release_date || movie.first_air_date}</p>
                            <p className='movieDescription'>Rating: {movie.vote_average}</p>  
                            <p className='movieDescription'>Number of votes: {movie.vote_count}</p>                                   
                                 
                            <p className='movieDescription'>{movie.overview}</p>

                            </div> 
                            
                        } placement='right' arrow>
                        <IconButton>
                           
                            <img src = { !movie.poster_path && !movie.profile_path ? 'https://www.upload.ee/image/14132287/profile-icon-png-893__1_.png' :  `https://image.tmdb.org/t/p/w200/${movie.poster_path || movie.profile_path}`} alt={movie.original_title} style={{width: "150px"}}/>
                        </IconButton>
                        </Tooltip>
                        <p className='title'>{movie.original_title || movie.original_name || movie.name}</p>
                    </div>)}
        return movies;
    }    









    

    let fiveMovies = (count) => {
        let movies = [];    

        for(let i = count; i < count+5; i++){
        let movie = movieData.results[i];
                movies.push(
                    <div className='col-2 carouselMovieCard' onClick={() => onClickFunction(movie.id)}>
                        <Tooltip title ={
                            movie.media_type === "person" || movie.gender ?
                            
                            <div className='movieTooltip'> 
                            <p className='movieDescription'>Person</p>
                            <p className='movieDescription'>Known for: {movie.known_for.map((knownFor) => {
                                return(
                                    `${knownFor.title || knownFor.name}, `
                                )
                            })}</p>  
                            <p className='movieDescription'>Profession: {movie.known_for_department}</p>                                   
                                 
                            <p className='movieDescription'>{movie.overview}</p>

                            </div> 
                            :
                            <div className='movieTooltip'> 
                            <p className='movieDescription'>Release date: {movie.release_date || movie.first_air_date}</p>
                            <p className='movieDescription'>Rating: {movie.vote_average}</p>  
                            <p className='movieDescription'>Number of votes: {movie.vote_count}</p>                                   
                                 
                            <p className='movieDescription'>{movie.overview}</p>

                            </div> 
                            
                        } placement='right' arrow>
                        <IconButton>
                           
                            <img src = { !movie.poster_path && !movie.profile_path ? 'https://www.upload.ee/image/14132287/profile-icon-png-893__1_.png' :  `https://image.tmdb.org/t/p/w200/${movie.poster_path || movie.profile_path}`} alt={movie.original_title} style={{width: "150px"}}/>
                        </IconButton>
                        </Tooltip>
                        <p className='title'>{movie.original_title || movie.original_name || movie.name}</p>
                    </div>)}
        return movies;
    }    






    //Fetches the data
    useEffect(()=>{
        fetch(API)
            .then(res => {
                return res.json();
            })
            .then(data => {
                setMovieData(data)
                moviePage(data.total_pages);
            })
            
        if(secondAPI){
            fetch(secondAPI)
            .then(res => {
                return res.json();
            })
            .then(data => {
                setSecondMovieData(data)
                moviePage(data.total_pages);

            })
        }               
    }, [API, secondAPI, moviePage])








  
    
    
    
    
    if(movieData &&  isTrendingMovie === true){
        return(
            <div> 
                    <Carousel>
                        <Carousel.Item>

                            
                        <div className='movieList row' id='carouselMovieList'>
                            {fiveMovies(0)}
                        </div>

                       
                        </Carousel.Item>
                        <Carousel.Item>
                        
                        <div className='movieList row' id='carouselMovieList'>
                            {fiveMovies(5)}
                        </div>
                    
                       
                        </Carousel.Item>
                        <Carousel.Item>

                        <div className='movieList row' id='carouselMovieList'>
                            {fiveMovies(10)}
                        </div>
                        
                        </Carousel.Item>
                    </Carousel>
            </div>
        )
    } 
    
    
    
    
    
    
    
    else if(secondMovieData && isLatestMovies){
        return(
            <div> 
                    <Carousel>
                        <Carousel.Item>

                            
                        <div className='movieList row' id='carouselMovieList'>
                            {fiveMoviesLatest(0)}
                        </div>

                       
                        </Carousel.Item>
                        <Carousel.Item>
                        
                        <div className='movieList row' id='carouselMovieList'>
                            {fiveMoviesLatest(5)}
                        </div>
                    
                       
                        </Carousel.Item>
                        <Carousel.Item>

                        <div className='movieList row' id='carouselMovieList'>
                            {fiveMoviesLatest(10)}
                        </div>
                        
                        </Carousel.Item>
                    </Carousel>
            </div>
        )
    } else if(!movieData){
        return(
            <div>
                <LoadingScreen/>
            </div>
        )
    } 

    else
    
    {

        return(
             
            
        <div className='movieList row'> 

            

        
            

         
            {movieData.results.map((movie)=>{

                return(        
                    
                           

                    <div key={movie.id} className='col-3 movieCard' onClick={() => onClickFunction(movie.id)}>
                        <Tooltip title ={
                            movie.media_type === "person" || movie.gender ?
                            
                            <div className='movieTooltip'> 
                            <p className='movieDescription'>Person</p>
                            <p className='movieDescription'>Known for: {movie.known_for.map((knownFor) => {
                                return(
                                    `${knownFor.title || knownFor.name}, `
                                )
                            })}</p>  
                            <p className='movieDescription'>Profession: {movie.known_for_department}</p>                                   
                                 
                            <p className='movieDescription'>{movie.overview}</p>

                            </div> 
                            :
                            <div className='movieTooltip'> 
                            <p className='movieDescription'>Release date: {movie.release_date || movie.first_air_date}</p>
                            <p className='movieDescription'>Rating: {movie.vote_average}</p>  
                            <p className='movieDescription'>Number of votes: {movie.vote_count}</p>                                   
                                 
                            <p className='movieDescription'>{movie.overview}</p>

                            </div> 
                            
                        } placement='right' arrow>
                        <IconButton>
                           
                            <img src = { !movie.poster_path && !movie.profile_path ? 'https://www.upload.ee/image/14132287/profile-icon-png-893__1_.png' :  `https://image.tmdb.org/t/p/w200/${movie.poster_path || movie.profile_path}`} alt={movie.original_title} style={{width: "200px"}}/>
                        </IconButton>
                        </Tooltip>
                        <p className='title'>{movie.original_title || movie.original_name || movie.name}</p>
                    </div>

                ) 
            })}
            
            
        </div>     
        
            
        )
    }
    

       

}

export default TrendingMovies;