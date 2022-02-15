import React from 'react';
import SVG from "react-inlinesvg";
import { useNavigate } from 'react-router-dom';


const NavbarBottom = () => {
  const navigate = useNavigate();

  return (
  <nav className="navbar-bottom">
    <div className="navbar-bottom__item" onClick={()=>navigate("/")}>
      <SVG 
        width={25}
        height={25} 
        src={process.env.PUBLIC_URL + '/icons/house-solid.svg'} 
      />
    </div>
    <div className="navbar-bottom__item" onClick={()=>navigate("/boards")}>
      <SVG 
        width={25}
        height={25} 
        src={process.env.PUBLIC_URL + '/icons/map-location-dot-solid.svg'} 
      />
    </div>
    
  </nav>
  )
}

/**
 * <div className="navbar-bottom__item" onClick={()=>navigate("/")}>
      <SVG 
        width={25}
        height={25}
        src={process.env.PUBLIC_URL + '/icons/book-solid.svg'} 
      />
    </div>
 */

export default NavbarBottom;
