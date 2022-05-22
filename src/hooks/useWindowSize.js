import { useCallback, useEffect, useState } from "react";

export function useWindowSize() {
  const [width, setWidth] = useState(window.innerWidth);

  const updateWidthWundow = useCallback(() => {
    setTimeout(() => setWidth(window.innerWidth), 1500)
  }, []);

  useEffect(() => {
    window.addEventListener("resize", updateWidthWundow);
    return () => window.removeEventListener("resize", updateWidthWundow);
  });

  return {
    width
  }
}