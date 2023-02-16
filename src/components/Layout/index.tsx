import React from 'react';
import Header from '@components/Header';
import Footer from '@components/Footer';
import { GlobalStyle } from './Styles';

interface LayoutProps {
  children: React.ReactNode;
  pageContext: {
    repoName: string;
  };
}

function Layout({ children, pageContext }: LayoutProps) {
  return (
    <>
      <GlobalStyle />
      <Header repoName={pageContext.repoName} />
      {children}
      <Footer />
    </>
  );
}

export default Layout;
