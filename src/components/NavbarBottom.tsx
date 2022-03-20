import React from 'react';
import { useNavigate } from 'react-router-dom';

import {ReactComponent as HomeLogo} from '../assets/icons/house-solid.svg'
import {ReactComponent as MapLogo} from '../assets/icons/map-location-dot-solid.svg'
import {ReactComponent as AddLogo} from '../assets/icons/circle-plus-solid.svg'

const NavbarBottom = () => {
  const navigate = useNavigate();

  return (
  <nav className="navbar-bottom">
    <div className={window.location.pathname === "/" ? "navbar-bottom__item selected":"navbar-bottom__item"} onClick={()=>navigate("/")}>
      <HomeLogo
        width={25}
        height={25}
      />
    </div>
    <div className={window.location.pathname === "/addboard" ? "navbar-bottom__item selected":"navbar-bottom__item"} onClick={()=>navigate("/addboard")}>
      <AddLogo
        width={25}
        height={25}
      />
    </div>
    <div className={window.location.pathname === "/boards" ? "navbar-bottom__item selected":"navbar-bottom__item"} onClick={()=>navigate("/boards")}>
      <MapLogo
        width={25}
        height={25} 
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
