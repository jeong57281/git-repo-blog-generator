import * as React from 'react';
import Header from '@components/Header';

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="global-wrapper">
    <Header />
    {children}
  </div>
);

export default Layout;
