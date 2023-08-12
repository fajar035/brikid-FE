import { useEffect, useRef, useState } from "react";

export const useDebounce = (value, delay = 500) => {
  const [debaounceValue, setDebounceValue] = useState("");
  const timerRef = useRef();

  useEffect(() => {
    timerRef.current = setTimeout(() => setDebounceValue(value), delay);
    return () => {
      clearTimeout(timerRef.current);
    };
  }, [value, delay]);
  return debaounceValue;
};
