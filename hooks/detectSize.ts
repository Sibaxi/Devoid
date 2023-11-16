import { useState, useEffect } from "react";

function getWidth() {
  if (typeof window === "undefined") {
    return 0;
  }

  return window.innerWidth;
}

export default function useDetectSize() {
  const [width, setWidth] = useState(1024);

  useEffect(() => {
    function handleResize() {
      setWidth(getWidth());
    }
    setWidth(getWidth());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}
