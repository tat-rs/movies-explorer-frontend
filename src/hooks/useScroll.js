import { useCallback } from "react";

export function useScrollLock() {
  const lockScroll = useCallback(() => {

    const scrollBarCompensation = window.innerWidth - document.body.offsetWidth; //ширина скролла 
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollBarCompensation}px`;
  }, [])

  const unlockScroll = useCallback(() => {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }, [])

  return {
    lockScroll,
    unlockScroll
  }
}
