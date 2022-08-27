




import React, { useEffect, useState } from 'react'
import './componentStyles.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faCamera, faTv, faUser } from '@fortawesome/free-solid-svg-icons'
import { Navbar, Nav } from 'react-bootstrap';


function Navbarr() {
const [showNav, setShowNav] = useState(true)

useEffect(()=> {
  window.addEventListener('scroll', controlNavbar)
  return() => {
    window.removeEventListener('scroll', controlNavbar)
  }
}, [])

const controlNavbar = ()=> {
  if(window.scrollY > 310){
    setShowNav(false);
  } else {
    setShowNav(true);
  }
}
 
if(showNav){
      return (
        <div className="navbarContainer" >
          <Navbar className='navbari' collapseOnSelect expand="lg" variant="dark">
            <div className='container-lg'>
            <Link className='nav-link navbar-brand' to="/">Movie Database</Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            
              <Nav id='navbarText'>
                <Link className='nav-link' eventKey={2} to="/">
                <FontAwesomeIcon icon={faHouse} /> Home 
                </Link>
                <Link className='nav-link' eventKey={2} to="/movies">
                <FontAwesomeIcon icon={faCamera} /> Movies 
                </Link>
                <Link className='nav-link' eventKey={2} to="/tvshows">
                <FontAwesomeIcon icon={faTv} /> TV Shows
                </Link>
                <Link className='nav-link' eventKey={2} to="/people">
                <FontAwesomeIcon icon={faUser} /> People
                </Link>
              </Nav>
            </Navbar.Collapse>
            </div>
          </Navbar>
        </div>
      )}
}

export default Navbarr