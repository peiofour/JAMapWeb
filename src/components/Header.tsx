import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="header">
      <img 
        src={process.env.PUBLIC_URL + "/images/logo.png"}
        alt="logo"
        width="220"
        onClick={()=>{navigate('/')}}
        style={{cursor: "pointer"}}
      />
    </header>
  )
}

export default Header;
