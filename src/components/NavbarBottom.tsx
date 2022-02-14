import React from 'react';
import SVG from "react-inlinesvg";


const NavbarBottom = () => {

  return (
  <nav className="navbar-bottom">
    <div className="navbar-bottom__item">
      <SVG 
        width={25}
        height={25} 
        src={process.env.PUBLIC_URL + '/icons/house-solid.svg'} 
      />
    </div>
    <div className="navbar-bottom__item">
      <SVG 
        width={25}
        height={25} 
        src={process.env.PUBLIC_URL + '/icons/map-location-dot-solid.svg'} 
      />
    </div>
    <div className="navbar-bottom__item">
      <SVG 
        width={25}
        height={25}
        src={process.env.PUBLIC_URL + '/icons/book-solid.svg'} 
      />
    </div>
  </nav>
  )
}

export default NavbarBottom;
