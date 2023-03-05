import React, { useReducer, useMemo } from 'react';
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

  const contextValue = useMemo(
    () => ({
      stateFilterReducer,
      dispatchFilterReducer,
    }),
    []
  );

  return (
    <Context.Provider value={contextValue}>
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
