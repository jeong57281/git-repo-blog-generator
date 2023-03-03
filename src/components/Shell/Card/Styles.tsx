import styled, { css } from 'styled-components';
import { color, mixin } from '@styles';

interface CardLayoutProps {
  maxWidth: string;
}

export const CardLayout = styled.div<CardLayoutProps>`
  width: 100%;
  max-width: ${({ maxWidth }) => maxWidth};
  background-color: white;
  border-radius: 0.1875rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: flex-end;

  ${mixin.mobile(css`
    max-width: 100%;
  `)}
`;

export const CardTitleParagraph = styled.p`
  color: ${color.PRIMARY};
  font-weight: bolder;
  font-size: 0.875rem;
  position: absolute;
  top: 0.4375rem;
  left: 0.4375rem;
`;
