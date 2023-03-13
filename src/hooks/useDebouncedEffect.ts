import { useEffect } from 'react';

export const useDebouncedEffect = (
  func: () => void,
  deps: Array<unknown>,
  delay: number
) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      func();
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, deps);
};
