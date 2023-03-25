import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';


type LayoutProps = {
    children: React.ReactNode;
  };

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
      <Footer/>
    </div>
  );
};

export default Layout;