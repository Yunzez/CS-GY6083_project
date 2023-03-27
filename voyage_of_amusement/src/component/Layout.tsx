import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';


type LayoutProps = {
    children: React.ReactNode;
  };

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div >
      <Navbar className='w-100'/>
      {children}
      <Footer/>
    </div>
  );
};

export default Layout;