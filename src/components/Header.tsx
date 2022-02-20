import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="header">
      <img 
        src={process.env.PUBLIC_URL + "/images/jamaplogo.png"}
        alt="logo"
        width="170"
        onClick={()=>{navigate('/')}}
      />
    </header>
  )
}

export default Header;
