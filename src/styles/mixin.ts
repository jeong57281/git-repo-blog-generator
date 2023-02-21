import { css, FlattenSimpleInterpolation } from 'styled-components';
import { size } from '@styles';

export const flexMiddle = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const mobile = (contents: FlattenSimpleInterpolation) => css`
  @media (max-width: ${size.BREAKPOINT_TABLET}) {
    ${contents}
  }
`;

export const fadeOut = (duration = 1, delay = 0) => css`
  @-webkit-keyframes fadeOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  -webkit-animation: fadeOut ${duration}s ease-out ${delay}s both;
  animation: fadeOut ${duration}s ease-out ${delay}s both;
`;

export const fadeIn = (duration = 1, delay = 0) => css`
  @-webkit-keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  -webkit-animation: fadeIn ${duration}s ease-out ${delay}s both;
  animation: fadeIn ${duration}s ease-out ${delay}s both;
`;
