import React, { useReducer } from 'react';
import Header from '@components/Layout/Header';
import Footer from '@components/Layout/Footer';
import { GlobalStyle, LayoutMain, LayoutMainContentsBox } from './Styles';

import * as filterReducer from '../../store/reducers/filterReducer';
import Context from '../../contexts/context';

interface LayoutProps {
  children: React.ReactNode;
  pageContext: {
    repoName: string;
  };
}

function Layout({ children, pageContext }: LayoutProps) {
  const [stateFilterReducer, dispatchFilterReducer] = useReducer(
    filterReducer.reducer,
    filterReducer.initialState
  );

  return (
    <Context.Provider
      value={{
        stateFilterReducer,
        dispatchFilterReducer,
      }}
    >
      <GlobalStyle />
      <Header repoName={pageContext.repoName} />
      <LayoutMain>
        <LayoutMainContentsBox>{children}</LayoutMainContentsBox>
      </LayoutMain>
      <Footer />
    </Context.Provider>
  );
}

export default Layout;
