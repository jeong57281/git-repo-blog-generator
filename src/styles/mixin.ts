import { css } from 'styled-components';

export const flexMiddle = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const fadeOut = (duration: number = 1, delay: number = 0) => css`
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

export const fadeIn = (duration: number = 1, delay: number = 0) => css`
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
