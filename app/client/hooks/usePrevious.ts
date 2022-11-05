import { useEffect, useRef } from 'react';

export const usePrevious = <T>(value: T, initialValue: T = value): T => {
  const ref = useRef<T>(initialValue);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};
