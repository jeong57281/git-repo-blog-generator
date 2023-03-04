import styled, { createGlobalStyle, css } from 'styled-components';
import { color, size, mixin } from '@styles';

export const GlobalStyle = createGlobalStyle`
  :root {
    font-size: 16px;
  }

  * {
    box-sizing: border-box;
    margin: 0;
  }
`;

export const LayoutMain = styled.main`
  min-height: 100vh;
  background: ${color.BASE};
  display: flex;
  justify-content: center;
`;

export const LayoutMainContentsBox = styled.div`
  width: 100%;
  max-width: ${size.CONTENTS_MAX_WIDTH};
  margin: calc(${size.HEADER_HEIGHT} * 2) 0;

  ${mixin.mobile(css`
    width: 95%;
  `)}
`;
