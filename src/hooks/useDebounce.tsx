import { useEffect, useState } from "react";

/**
 * USAGE:
 * const debounce = useDebounce();
 * debounce(() => console.log(e.target.value));
 */
const useDebounce = (params?: { delay?: number }) => {
  const [timer, setTimer]: any = useState(null);

  const debounceFn = (args: Function) => {
    clearTimeout(timer);
    setTimer(
      setTimeout(() => {
        args();
      }, params?.delay || 700)
    );
  };

  useEffect(() => {
    return () => {
      clearTimeout(timer);
    };
  }, [timer]);

  return debounceFn;
};

export default useDebounce;
