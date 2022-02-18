import React, { ReactNode } from 'react';
import Header from './Header';
import NavbarBottom from './NavbarBottom';

interface Props{
  children: ReactNode;
  className: string | undefined;
  title: string | undefined;
};
const Layout:React.FC<Props> = ({children, className, title}) => (
  <div className="primary-container">
    <Header/>
    <div className={"layout " + className}>
      {children}
    </div>
    <NavbarBottom />
  </div>
)

export default Layout;