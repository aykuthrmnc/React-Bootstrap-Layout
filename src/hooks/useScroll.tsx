import { useEffect, useState } from "react";

const useScroll = ({ selector }: any) => {
  const windowWidth = window.innerWidth;
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = document.querySelector(selector).scrollLeft;
    setScrollPosition(position);
  };

  useEffect(() => {
    document.querySelector(selector).addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      selector ?? document.querySelector(selector).removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { scrollPosition, windowWidth };
};

export default useScroll;
