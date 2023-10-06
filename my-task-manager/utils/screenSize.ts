// utils/screenSize.js
export const isSmallScr = () => {
    if (typeof window === 'undefined') return true;
    return window.innerWidth <= 768; // Adjust the breakpoint as needed
  };
  