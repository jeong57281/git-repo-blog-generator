import React from 'react';
import Header from '@components/Header';
import { GlobalStyle } from './Styles';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GlobalStyle />
      <Header />
      {children}
    </>
  );
}

export default Layout;
