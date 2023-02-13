import styled from 'styled-components';
import { mixin } from '@styles';

interface MenuButtonLayoutProps {
  isOpen: boolean;
}

export const MenuButtonLayout = styled.div<MenuButtonLayoutProps>`
  position: relative;
  border: none;
  background: none;
  display: flex;
  flex-direction: column;
  width: 1.5em;
  height: 1.2em;
  cursor: pointer;
  > div {
    position: absolute;
    left: 0;
    width: 100%;
    height: 20%;
    border-radius: 3px;
    background-color: white;
    transition: transform 0.2s;
    &:nth-child(1) {
      transform: rotate(${({ isOpen }) => (isOpen ? 45 : 0)}deg);
      top: ${({ isOpen }) => (isOpen ? 40 : 0)}%;
      ${mixin.fadeIn(0.2)}
    }
    &:nth-child(2) {
      top: 40%;
      ${({ isOpen }) => (isOpen ? mixin.fadeOut(0.4) : mixin.fadeIn(0.2))}
    }
    &:nth-child(3) {
      transform: rotate(${({ isOpen }) => (isOpen ? -45 : 0)}deg);
      top: ${({ isOpen }) => (isOpen ? 40 : 80)}%;
      ${mixin.fadeIn(0.2)}
    }
  }
`;
