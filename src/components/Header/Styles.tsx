import styled from 'styled-components';
import { color, size, mixin } from '../../styles';

export const HeaderLayout = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background-color: ${color.PRIMARY};
  height: ${size.HEADER_HEIGHT};
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const HeaderParagraph = styled.p`
  color: white;
`;

export const HeaderSideBox = styled.div`
  height: 100%;
  aspect-ratio: 1/1;
  ${mixin.flexMiddle}
`;
