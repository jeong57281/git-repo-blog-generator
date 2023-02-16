import React from 'react';
import Header from '@components/Header';
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
    </>
  );
}

export default Layout;
