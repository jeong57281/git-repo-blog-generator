import styled, { css } from 'styled-components';
import { color, mixin } from '@styles';

interface CardLayoutProps {
  maxWidth: string;
}

export const CardLayout = styled.li<CardLayoutProps>`
  padding: 0.5rem;
  list-style: none;

  width: 100%;
  max-width: ${({ maxWidth }) => maxWidth};
  ${mixin.mobile(css`
    max-width: 100%;
  `)}

  transition: max-width 0.1s;
`;

export const CardContentBox = styled.div`
  width: 100%;
  height: 100%;

  background-color: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 0.1875rem;

  position: relative;

  display: flex;
  justify-content: flex-end;

  overflow: hidden;
`;

export const CardTitleParagraph = styled.p`
  color: ${color.PRIMARY};
  font-weight: bolder;
  font-size: 0.875rem;
  position: absolute;
  top: 0.4375rem;
  left: 0.4375rem;
`;
