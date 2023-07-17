import { useCallback, useState } from "react";

const useToggle = (initialState: boolean = false): [boolean, any, any] => {
  const [isOpen, setIsOpen] = useState(initialState);

  const show = useCallback(() => setIsOpen(true), []);

  const hide = useCallback(() => setIsOpen(false), []);

  return [isOpen, show, hide];
};

export default useToggle;
