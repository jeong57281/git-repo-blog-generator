import * as React from 'react';
import Header from '../Header';

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="global-wrapper">
    <Header />
    {children}
  </div>
);

export default Layout;
