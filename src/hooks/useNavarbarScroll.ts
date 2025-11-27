import { useEffect, useRef, useState } from 'react';

export function useNavbarScroll() {
  const [show, setShow] = useState(true);
  const [atTop, setAtTop] = useState(true);
  const prevScrollY = useRef(0);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Check if at top
      if (currentScrollY <= 0) {
        setAtTop(true);
        setShow(true);
        prevScrollY.current = currentScrollY;
        return;
      } else {
        setAtTop(false);
      }

      // Determine scroll direction locally
      const isScrollingDown = currentScrollY > prevScrollY.current;
      const isScrollingUp = currentScrollY < prevScrollY.current;

      // Update show state based on scroll direction
      if (isScrollingDown && currentScrollY > 50) {
        setShow(false);
      } else if (isScrollingUp) {
        setShow(true);
      }

      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Set timeout to detect when scrolling stops
      scrollTimeoutRef.current = setTimeout(() => {
        // When scrolling stops, show the navbar
        if (currentScrollY > 0) {
          setShow(true);
        }
      }, 150); // Adjust delay as needed (150ms after last scroll event)

      prevScrollY.current = currentScrollY;
    };

    // Check initial scroll position
    prevScrollY.current = window.scrollY;
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return { show, atTop };
}