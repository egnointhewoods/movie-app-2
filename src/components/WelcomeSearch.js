import React from 'react'
import './componentStyles.css';


function WelcomeSearch({onSearch}) {
  
  
  return (
    <div className='welcomeDiv'>
        <div className='container-lg'>

            <h1 className='welcomeMessage'>Welcome.</h1>
            <h2 className='welcomeMessage'>Millions of movies, TV shows and people to discover. Explore now.</h2>
            <br /> <br />
            <form action='/search' onSubmit={((e)=>onSearch(e))}>
              <input className='searchInput' type="text" name='query'  placeholder='Search for a movie, tv show, person...'/>
            </form>
        </div>

    </div>
  )
}

export default WelcomeSearch
