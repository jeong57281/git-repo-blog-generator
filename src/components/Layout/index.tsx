import React from 'react';
import Header from '@components/Header';
import Footer from '@components/Footer';
import { GlobalStyle, LayoutMain, LayoutMainContentsBox } from './Styles';

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
      <LayoutMain>
        <LayoutMainContentsBox>{children}</LayoutMainContentsBox>
      </LayoutMain>
      <Footer />
    </>
  );
}

export default Layout;
