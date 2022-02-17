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
    <title>{title}</title>
    <Header/>
    <main className={"layout " + className}>
      {children}
    </main>
    <NavbarBottom />
  </div>
)

export default Layout;